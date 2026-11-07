import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, isAbsolute, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const port = Number(process.env.PORT ?? 8081);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8"
};

// Serve the repository so the walkthrough can load its CSS, data, and engine.
const server = createServer(async (request, response) => {
  const requestURL = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);
  let pathname = decodeURIComponent(requestURL.pathname);

  if (pathname === "/") {
    pathname = "/animations/index.html";
  } else if (pathname.endsWith("/")) {
    pathname = `${pathname}index.html`;
  }

  const filePath = resolve(root, `.${pathname}`);
  const relativePath = relative(root, filePath);

  if (relativePath.startsWith("..") || isAbsolute(relativePath)) {
    response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Forbidden");
    return;
  }

  try {
    const body = await readFile(filePath);
    const contentType = contentTypes[extname(filePath).toLowerCase()] ?? "application/octet-stream";

    response.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": "no-store"
    });
    response.end(body);
  } catch (error) {
    const status = error.code === "ENOENT" ? 404 : 500;
    response.writeHead(status, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(status === 404 ? "Not found" : "Server error");
  }
});

server.listen(port, () => {
  console.log(`Code walkthrough: http://localhost:${port}/animations/`);
});
