# Python Functions & Lists Assessment

## Project Overview

This repository contains two independent console-based Python programs that
demonstrate the use of **functions, string manipulation, lists, loops, and
input validation**.

The first program generates a result card for a single student. The second
program collects the marks of an entire class and produces a detailed
performance report. Both programs guide the user through the input process and
re-ask whenever invalid data is entered.

```text
python-functions-lists-assessment/
│
├── result_card_generator.py
├── class_marks_analyzer.py
└── README.md
```

---

## Program 1: Student Result Card Generator

**File:** `result_card_generator.py`

This program asks for a student's name, roll number, and marks in five
subjects: Mathematics, English, Physics, Chemistry, and Computer Science.

### Features

- Cleans the student's name with `.strip()` and `.title()`.
- Validates the roll number with `.isdigit()` so it can contain digits only.
- Validates every subject mark and only accepts values from 0 to 100.
- Calculates total marks and overall percentage.
- Calculates the letter grade using the assessment grading table.
- Forces a **Fail** result if any subject mark is below 40, even when the
  overall percentage is high enough to pass.
- Displays a formatted result card using f-strings.

### Grading Criteria

| Percentage | Grade |
| --- | --- |
| 90 and above | A+ |
| 80 – 89 | A |
| 70 – 79 | B |
| 60 – 69 | C |
| 50 – 59 | D |
| Below 50 | Fail |

### Required Functions

| Function | Purpose |
| --- | --- |
| `format_name(name)` | Cleans the name with `.strip()` and `.title()`. |
| `get_student_name()` | Reads and validates a non-empty student name. |
| `get_roll_number()` | Reads a roll number and validates it with `.isdigit()`. |
| `get_valid_marks(subject)` | Reads and validates marks between 0 and 100. |
| `calculate_percentage(total, max_total)` | Calculates the overall percentage. |
| `get_grade(percentage)` | Returns the letter grade for a percentage. |
| `find_failed_subjects(subjects, marks)` | Finds subjects with marks below 40. |
| `determine_final_status(percentage, failed_subjects)` | Decides the final Pass/Fail status. |
| `print_result_card(...)` | Prints the formatted result card. |

---

## Program 2: Class Marks Analyzer

**File:** `class_marks_analyzer.py`

This program asks for the number of students in a class, then collects each
student's name and marks. Names and marks are stored in two parallel lists:
`student_names` and `student_marks`.

### Features

- Validates the class size and every student mark.
- Uses `.append()` to add names and marks to their lists.
- Calculates the class average.
- Finds the highest and lowest marks and every student who achieved them.
- Counts passing students (50 or above) and failing students (below 50).
- Lists all students who scored above the class average.
- Displays all students sorted by marks from highest to lowest.
- Handles tied highest and lowest marks by displaying every matching student.

### Custom Functions

| Function | Purpose |
| --- | --- |
| `get_student_count()` | Reads and validates the number of students. |
| `get_student_name(position)` | Reads and validates a student name. |
| `get_valid_mark(student_name)` | Reads and validates a mark from 0 to 100. |
| `calculate_average(marks)` | Returns the class average. |
| `find_students_with_mark(names, marks, target_mark)` | Finds all students with a given mark. |
| `count_pass_fail(marks)` | Counts passing and failing students. |
| `get_above_average_students(names, marks, average)` | Finds students above the class average. |
| `sort_students_by_mark(names, marks)` | Sorts students from highest to lowest marks. |
| `display_report(names, marks)` | Prints the complete class report. |

---

## Python Concepts Used

- Defining functions with `def`, parameters, and `return` values.
- String methods: `.strip()`, `.title()`, `.isdigit()`.
- Formatted output with f-strings and alignment/format specifiers.
- `if` / `elif` / `else` conditions and comparison operators.
- `while` loops for repeated input validation.
- `for` loops for collecting subjects and displaying lists.
- Lists: creating lists, `.append()`, `len()`, `sum()`, `max()`, `min()`, and `sorted()`.
- Exception handling with `try` / `except ValueError` for numeric input.
- Parallel lists, list comprehensions, `zip()`, and `enumerate()`.

---

## Requirements

- Python 3.8 or newer.
- No external libraries are required.

Check the installed version with:

```bash
python --version
```

---

## How to Run

Open a terminal in the repository folder and run either program:

### Student Result Card Generator

```bash
python result_card_generator.py
```

### Class Marks Analyzer

```bash
python class_marks_analyzer.py
```

On systems where `python` is not available, try `python3` instead.

---

## Sample Input and Output

### Sample 1: Result Card Generator

**Input:**

```text
Enter student name:   aYESHA khan
Enter roll number (digits only): 12345
Enter marks for Mathematics (0-100): 95
Enter marks for English (0-100): 88
Enter marks for Physics (0-100): 92
Enter marks for Chemistry (0-100): 90
Enter marks for Computer Science (0-100): 85
```

**Output:**

```text
====================================================
STUDENT RESULT CARD GENERATOR
====================================================
Enter student name: Enter roll number (digits only): Enter marks for Mathematics (0-100): Enter marks for English (0-100): Enter marks for Physics (0-100): Enter marks for Chemistry (0-100): Enter marks for Computer Science (0-100):
====================================================
                STUDENT RESULT CARD
====================================================
Student Name : Ayesha Khan
Roll Number  : 12345
----------------------------------------------------
Subject                          Marks        Status
----------------------------------------------------
Mathematics                         95          Pass
English                             88          Pass
Physics                             92          Pass
Chemistry                           90          Pass
Computer Science                    85          Pass
----------------------------------------------------
Total Obtained Marks               450 / 500
Overall Percentage               90.00%
Letter Grade                        A+
Final Status                      PASS
====================================================
```

### Sample 2: Subject Below 40 Forces a Fail

This student has an overall percentage of 80.00% (grade A), but Chemistry is
below 40, so the final result must be Fail.

**Input:**

```text
Enter student name: Hassan Ali
Enter roll number (digits only): 21
Enter marks for Mathematics (0-100): 95
Enter marks for English (0-100): 92
Enter marks for Physics (0-100): 88
Enter marks for Chemistry (0-100): 35
Enter marks for Computer Science (0-100): 90
```

**Output:**

```text
----------------------------------------------------
Total Obtained Marks               400 / 500
Overall Percentage               80.00%
Letter Grade                         A
Final Status                      FAIL
----------------------------------------------------
Result failed: the following subject(s) are below 40 marks:
  - Chemistry
====================================================
```

### Sample 3: Class Marks Analyzer

**Input:**

```text
How many students are in the class? 4
Enter name of student 1: ali
Enter marks for Ali (0-100): 90
Enter name of student 2: Sara
Enter marks for Sara (0-100): 75
Enter name of student 3: Bob
Enter marks for Bob (0-100): 90
Enter name of student 4: Cara
Enter marks for Cara (0-100): 40
```

**Output:**

```text
==========================================================
               CLASS MARKS ANALYZER REPORT
==========================================================
Total students     : 4
Class average      : 73.75
Highest marks      : 90
Highest scorer(s)  : Ali, Bob
Lowest marks       : 40
Lowest scorer(s)   : Cara
Passing students   : 3
Failing students   : 1
----------------------------------------------------------
Students who scored above the class average:
  - Ali: 90
  - Sara: 75
  - Bob: 90
----------------------------------------------------------
Students sorted by marks (highest to lowest):
  1. Ali                           90
  2. Bob                           90
  3. Sara                          75
  4. Cara                          40
==========================================================
```

---

## Validation and Test Scenarios

Both programs were tested with normal, boundary, and invalid inputs:

| Scenario | Expected Behaviour | Result |
| --- | --- | --- |
| Name with extra spaces and mixed case | Cleaned to `Ayesha Khan` | Passed |
| Empty student name | Re-asks for input | Passed |
| Roll number containing letters (`12a`) | Re-asks for input | Passed |
| Non-numeric marks (`abc`) | Re-asks for input | Passed |
| Marks below 0 or above 100 | Re-asks for input | Passed |
| Decimal marks (for example `49.5`) | Accepted and calculated correctly | Passed |
| One subject below 40 but high percentage | Final status is Fail | Passed |
| Percentage exactly 50 | Grade D and Pass | Passed |
| Percentage exactly 90 | Grade A+ | Passed |
| Tied highest and lowest marks | All matching students displayed | Passed |
| Invalid class size (`0`, `abc`) | Re-asks for input | Passed |
| Students equal to the class average | Not listed as above average | Passed |
