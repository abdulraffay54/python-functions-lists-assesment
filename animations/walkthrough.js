/*
 * Python Code Walkthrough - animation engine.
 *
 * Plain DOM + CSS animations. The step data lives in data.js and is exposed as
 * window.WALKTHROUGHS. Each step describes:
 *   phase, title, description, focus, lines, stack, vars, terminal, note
 */
(() => {
  "use strict";

  const programs = window.WALKTHROUGHS;

  if (!programs || !Object.keys(programs).length) {
    document.getElementById("code").textContent = "Could not load animations/data.js";
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const state = {
    key: "result",
    index: 0,
    playing: false,
    speed: 1,
    timer: null,
    functions: {},
    codeHtml: {}
  };

  const $ = (id) => document.getElementById(id);

  const el = {
    tabs: Array.from(document.querySelectorAll(".tab")),
    file: $("file-name"),
    focus: $("focus-badge"),
    functionMap: $("function-map"),
    fnHelp: $("fn-help"),
    code: $("code"),
    codeScroll: $("code-scroll"),
    scenario: $("scenario"),
    summary: $("summary"),
    phase: $("phase-badge"),
    count: $("step-count"),
    title: $("step-title"),
    description: $("step-description"),
    note: $("step-note"),
    stack: $("stack"),
    vars: $("vars"),
    varsEmpty: $("vars-empty"),
    terminal: $("terminal"),
    progress: $("progress-fill"),
    scrub: $("scrub"),
    play: $("play"),
    prev: $("prev"),
    next: $("next"),
    restart: $("restart"),
    speed: $("speed")
  };

  const PHASE_LABELS = {
    entry: "Entry",
    input: "Input",
    process: "Process",
    decision: "Decision",
    output: "Output"
  };

  /* ==========================================================================
     Small helpers
     ========================================================================== */

  const escapeHtml = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const formatValue = (value) => {
    if (typeof value === "string") return value;
    if (value === null || value === undefined) return String(value);
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
  };

  const steps = () => programs[state.key].steps;

  /* ==========================================================================
     Python syntax highlighting
     ========================================================================== */

  const TOKEN_RE =
    /("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|#[^\n]*|\b(?:def|return|if|elif|else|while|for|in|not|and|or|break|continue|try|except|finally|lambda|None|True|False)\b|\b(?:print|input|int|str|sum|len|max|min|sorted|zip|enumerate|range)\b|\b\d+\b)/g;

  const KEYWORDS =
    /^(def|return|if|elif|else|while|for|in|not|and|or|break|continue|try|except|finally|lambda|None|True|False)$/;
  const BUILTINS = /^(print|input|int|str|sum|len|max|min|sorted|zip|enumerate|range)$/;

  function tokenClass(token) {
    if (token[0] === "#") return "tok-comment";
    if (token[0] === '"' || token[0] === "'") return "tok-string";
    if (/^\d+$/.test(token)) return "tok-number";
    if (BUILTINS.test(token)) return "tok-builtin";
    if (KEYWORDS.test(token)) return "tok-keyword";
    return "";
  }

  function highlightToLines(source) {
    const lines = [[]];
    let cursor = 0;
    let match;

    const push = (text, cls) => {
      const parts = text.split("\n");
      parts.forEach((part, index) => {
        if (index > 0) lines.push([]);
        if (part.length) lines[lines.length - 1].push({ text: part, cls });
      });
    };

    TOKEN_RE.lastIndex = 0;

    while ((match = TOKEN_RE.exec(source))) {
      if (match.index > cursor) push(source.slice(cursor, match.index), "");
      push(match[0], tokenClass(match[0]));
      cursor = match.index + match[0].length;
    }

    push(source.slice(cursor), "");

    // The source ends with a newline, which creates one empty final line.
    if (lines.length && lines[lines.length - 1].length === 0) lines.pop();

    return lines;
  }

  function buildCodeHtml(source) {
    return highlightToLines(source)
      .map((segments, index) => {
        const inner =
          segments
            .map((segment) =>
              segment.cls
                ? `<span class="${segment.cls}">${escapeHtml(segment.text)}</span>`
                : escapeHtml(segment.text)
            )
            .join("") || "&nbsp;";

        return (
          `<span class="code-line" data-line="${index + 1}">` +
          `<span class="gutter">${index + 1}</span>` +
          `<span class="code-text">${inner}</span>` +
          `</span>`
        );
      })
      .join("");
  }

  /* ==========================================================================
     Function metadata (chips + focused-function help line)
     ========================================================================== */

  const MODULE_FUNCTION = {
    name: "<module>",
    signature: "<module>",
    doc: "Top-level script: defines the constants, pulls in the functions, and calls main() inside try / except."
  };

  function extractFunctions(source) {
    const found = [];
    const defRe = /^def\s+([A-Za-z_]\w*)\s*\(([^)]*)\)\s*:/gm;
    let match;

    while ((match = defRe.exec(source))) {
      const afterDef = source.slice(match.index + match[0].length);
      const docMatch = afterDef.match(/^\s*(?:"""([\s\S]*?)"""|'''([\s\S]*?)''')/);
      const doc = docMatch ? (docMatch[1] ?? docMatch[2] ?? "") : "";

      found.push({
        name: match[1],
        signature: `${match[1]}(${match[2].trim()})`,
        doc: doc.replace(/\s+/g, " ").trim()
      });
    }

    return found;
  }

  function functionsFor(key) {
    if (!state.functions[key]) state.functions[key] = extractFunctions(programs[key].source);
    return state.functions[key];
  }

  function renderFunctionMap(key) {
    const all = [MODULE_FUNCTION, ...functionsFor(key)];

    el.functionMap.innerHTML = all
      .map(
        (fn) =>
          `<span class="fn-chip${fn.name === "<module>" ? " is-module" : ""}" ` +
          `data-fn="${escapeHtml(fn.name)}" title="${escapeHtml(fn.doc)}">` +
          `${escapeHtml(fn.signature)}</span>`
      )
      .join("");
  }

  function findFunction(key, focus) {
    const name = String(focus || "<module>").replace(/\(\)$/, "");
    if (name === "<module>") return MODULE_FUNCTION;
    return functionsFor(key).find((fn) => fn.name === name) || {
      name,
      signature: String(focus),
      doc: ""
    };
  }

  /* ==========================================================================
     Rendering
     ========================================================================== */

  function highlightLines(lineNumbers) {
    const active = new Set(lineNumbers || []);
    let firstActive = null;

    el.code.querySelectorAll(".code-line").forEach((row) => {
      const isActive = active.has(Number(row.dataset.line));
      row.classList.toggle("active", isActive);
      if (isActive && !firstActive) firstActive = row;
    });

    if (firstActive) scrollToLine(firstActive);
  }

  function scrollToLine(row) {
    if (prefersReducedMotion) return;

    const top = row.offsetTop;
    const bottom = top + row.offsetHeight;
    const viewTop = el.codeScroll.scrollTop;
    const viewBottom = viewTop + el.codeScroll.clientHeight;
    const padding = 48;

    if (top < viewTop + padding || bottom > viewBottom - padding) {
      const target = Math.max(0, top - el.codeScroll.clientHeight / 2);
      el.codeScroll.scrollTo({ top: target, behavior: "smooth" });
    }
  }

  function renderStack(step, previousStep) {
    const frames = step.stack || [];
    const previous = new Set(previousStep ? previousStep.stack || [] : []);

    el.stack.innerHTML = "";

    // Reverse so the most recently called function appears at the top.
    [...frames].reverse().forEach((frame, index) => {
      const item = document.createElement("li");
      item.className = "stack-frame";
      if (index === 0) item.classList.add("is-top");
      if (!previous.has(frame)) item.classList.add("is-pushed");
      item.innerHTML =
        `<span class="frame-arrow" aria-hidden="true">${index === 0 ? "\u25B8" : "\u21B3"}</span>` +
        `<span class="frame-name">${escapeHtml(frame)}</span>`;
      el.stack.appendChild(item);
    });
  }

  function renderVars(step, previousStep) {
    const current = step.vars || {};
    const previous = previousStep ? previousStep.vars || {} : null;
    const entries = Object.entries(current);

    el.vars.innerHTML = "";
    el.varsEmpty.hidden = entries.length > 0;

    entries.forEach(([key, value]) => {
      const row = document.createElement("div");
      row.className = "var-row";

      if (!previous || !Object.prototype.hasOwnProperty.call(previous, key)) {
        row.classList.add("is-new");
      } else if (JSON.stringify(previous[key]) !== JSON.stringify(value)) {
        row.classList.add("is-changed");
      }

      row.innerHTML =
        `<dt>${escapeHtml(key)}</dt>` +
        `<dd>${escapeHtml(formatValue(value))}</dd>`;
      el.vars.appendChild(row);
    });
  }

  function renderTerminal(program, index) {
    const groups = [];

    program.steps.forEach((step, stepIndex) => {
      if (stepIndex > index || !step.terminal || step.terminal.length === 0) return;

      const lines = step.terminal
        .map((entry, entryIndex) => {
          const delay = prefersReducedMotion ? 0 : Math.min(entryIndex * 0.05, 0.3);
          return (
            `<div class="term-line term-${entry.kind}" style="animation-delay:${delay}s">` +
            `${escapeHtml(entry.text)}</div>`
          );
        })
        .join("");

      groups.push(
        `<div class="term-group${stepIndex === index ? " is-new" : ""}">${lines}</div>`
      );
    });

    el.terminal.innerHTML = groups.length
      ? groups.join("")
      : '<p class="terminal-empty">Run the walkthrough to see simulated input and output.</p>';

    el.terminal.scrollTop = el.terminal.scrollHeight;
  }

  function render() {
    const program = programs[state.key];
    const allSteps = program.steps;
    const index = Math.min(state.index, allSteps.length - 1);
    const step = allSteps[index];
    const previousStep = index > 0 ? allSteps[index - 1] : null;

    state.index = index;

    el.phase.dataset.phase = step.phase || "process";
    el.phase.textContent = PHASE_LABELS[step.phase] || step.phase || "Step";
    el.count.textContent = `Step ${index + 1} / ${allSteps.length}`;

    el.title.textContent = step.title || "";
    el.description.textContent = step.description || "";

    if (step.note) {
      el.note.textContent = step.note;
      el.note.hidden = false;
    } else {
      el.note.hidden = true;
      el.note.textContent = "";
    }

    el.focus.textContent = step.focus || "<module>";
    const focused = findFunction(state.key, step.focus);
    el.fnHelp.innerHTML =
      `<strong>${escapeHtml(focused.signature)}</strong>` +
      `<span>${escapeHtml(focused.doc || "No docstring available.")}</span>`;

    const focusName = String(step.focus || "<module>").replace(/\(\)$/, "");
    el.functionMap.querySelectorAll(".fn-chip").forEach((chip) => {
      chip.classList.toggle("is-focus", chip.dataset.fn === focusName);
    });

    highlightLines(step.lines);
    renderStack(step, previousStep);
    renderVars(step, previousStep);
    renderTerminal(program, index);

    const lastIndex = allSteps.length - 1;
    el.progress.style.width = lastIndex === 0 ? "100%" : `${(index / lastIndex) * 100}%`;
    el.scrub.value = String(index);
    el.prev.disabled = index === 0;
    el.next.disabled = index === lastIndex;

    updatePlayButton();
  }

  /* ==========================================================================
     Playback
     ========================================================================== */

  function updatePlayButton() {
    const lastIndex = steps().length - 1;

    el.play.classList.toggle("is-playing", state.playing);
    el.play.setAttribute("aria-pressed", String(state.playing));

    if (state.playing) {
      el.play.innerHTML = "&#10074;&#10074; Pause";
    } else if (state.index >= lastIndex) {
      el.play.innerHTML = "&#8635; Replay";
    } else {
      el.play.innerHTML = "&#9654; Play";
    }
  }

  function pause() {
    state.playing = false;
    clearTimeout(state.timer);
    state.timer = null;
    updatePlayButton();
  }

  function schedule() {
    clearTimeout(state.timer);

    if (!state.playing) return;

    const step = steps()[state.index];
    const delay = Math.max(650, (step.duration || 2200) / state.speed);

    state.timer = setTimeout(() => {
      if (!state.playing) return;

      if (state.index < steps().length - 1) {
        state.index += 1;
        render();
      }

      if (state.index >= steps().length - 1) {
        pause();
        return;
      }

      schedule();
    }, delay);
  }

  function playPause() {
    if (state.playing) {
      pause();
      return;
    }

    if (state.index >= steps().length - 1) state.index = 0;

    state.playing = true;
    render();
    schedule();
  }

  function goTo(index) {
    pause();
    state.index = Math.max(0, Math.min(steps().length - 1, index));
    render();
  }

  function manualNext() {
    if (state.index >= steps().length - 1) return;
    goTo(state.index + 1);
  }

  function manualPrev() {
    if (state.index === 0) return;
    goTo(state.index - 1);
  }

  function restart() {
    goTo(0);
    el.codeScroll.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }

  /* ==========================================================================
     Program switching
     ========================================================================== */

  function loadProgram(key) {
    pause();

    state.key = key;
    state.index = 0;

    const program = programs[key];

    if (!state.codeHtml[key]) state.codeHtml[key] = buildCodeHtml(program.source);

    el.tabs.forEach((tab) => {
      const isActive = tab.dataset.program === key;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-pressed", String(isActive));
    });

    el.file.textContent = program.file;
    el.scenario.textContent = program.scenario;
    el.summary.textContent = program.summary;
    el.code.innerHTML = state.codeHtml[key];
    el.codeScroll.scrollTop = 0;

    renderFunctionMap(key);

    el.scrub.max = String(program.steps.length - 1);
    el.scrub.value = "0";

    document.title = `${program.file} \u00B7 Code Walkthrough`;

    render();
  }

  /* ==========================================================================
     Events
     ========================================================================== */

  el.tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      if (tab.dataset.program !== state.key) loadProgram(tab.dataset.program);
    });
  });

  el.play.addEventListener("click", playPause);
  el.next.addEventListener("click", manualNext);
  el.prev.addEventListener("click", manualPrev);
  el.restart.addEventListener("click", restart);

  el.scrub.addEventListener("input", () => {
    goTo(Number(el.scrub.value));
  });

  el.speed.addEventListener("change", () => {
    state.speed = Number(el.speed.value) || 1;
    if (state.playing) schedule();
  });

  document.addEventListener("keydown", (event) => {
    const tag = (event.target.tagName || "").toLowerCase();
    const isFormControl = tag === "input" || tag === "select" || tag === "textarea";

    if (isFormControl) return;

    // Let a focused button handle its own Space / Enter activation.
    if (event.key === " " && tag === "button") return;

    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        manualNext();
        break;
      case "ArrowLeft":
        event.preventDefault();
        manualPrev();
        break;
      case " ":
        event.preventDefault();
        playPause();
        break;
      case "r":
      case "R":
        event.preventDefault();
        restart();
        break;
      default:
        break;
    }
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && state.playing) pause();
  });

  /* ==========================================================================
     Start
     ========================================================================== */

  loadProgram("result");
})();
