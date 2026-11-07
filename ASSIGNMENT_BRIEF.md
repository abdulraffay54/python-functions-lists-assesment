# Assessment: Functions, Strings and Lists

**Duration:** 2 Days
**Assessment Type:** Individual Work
**Instructions:** Both tasks are compulsory.

## Task 1: Student Result Card Generator

**Topics:** Functions (`def`, parameters, `return`) and String Manipulation

Build a Python program that generates a result card for one student.

**Requirements:**

1. Ask for the student's name, roll number, and marks in five subjects.
2. Create at least the following functions:
- `get_valid_marks(subject)`
- `calculate_percentage(total, max_total)`
- `get_grade(percentage)`
- `format_name(name)`
3. Validate input:
- Marks must be between 0 and 100.
- Roll number must contain digits only using `.isdigit()`.
4. Clean the student's name using `.strip()` and `.title()`.
5. Apply the following grading criteria:

| Percentage | Grade |
|---|---|
| 90 and above | A+ |
| 80–89 | A |
| 70–79 | B |
| 60–69 | C |
| 50–59 | D |
| Below 50 | Fail |

**Important:** If any subject mark is below 40, the final result must be Fail, regardless of the overall percentage.

6. Generate a properly formatted result card using Python f-strings, displaying:
- Student name and roll number.
- Marks in all five subjects.
- Total obtained marks.
- Overall percentage (2 decimal places).
- Letter grade.
- Final status (Pass/Fail).

## Task 2: Class Marks Analyzer

**Topics:** Lists (`create`, `append()`, `len()`, `sum()`, `max()`, `min()`, `sorted()`) and Loops

Build a Python program that analyzes the academic performance of an entire class.

**Requirements:**

1. Ask how many students are in the class.
2. Maintain two separate lists:
- `student_names = []`
- `student_marks = []`
3. Use `.append()` to store student names and marks.
4. Validate every mark (0–100) and ask again if the input is invalid.
5. Calculate and display:
- Class average.
- Highest marks and the student(s) who achieved them.
- Lowest marks and the student(s) who achieved them.
6. Count the number of passing students (50 or above) and failing students (below 50).
7. Display all students who scored above the class average.
8. Display student marks sorted from highest to lowest.

**Additional Requirement:**

Implement at least two parts of your program using your own custom functions.

## General Requirements

- Develop both programs separately.
- Give every function a clear name and a one-line comment explaining its purpose.
- Validate user input and handle invalid values.
- Use meaningful variable and function names.
- Maintain proper indentation and code formatting.
- Add comments to explain important programming logic.
- Test both programs with multiple input scenarios.
- Do not simply copy classroom examples.

## Required GitHub Repository Structure

Create a GitHub repository with the following name:

`python-functions-lists-assessment`

Your repository must follow this structure:

```text
python-functions-lists-assessment/
│
├── result_card_generator.py
├── class_marks_analyzer.py
└── README.md
```

## README.md Requirements

Your README.md file must include:

1. Project title and overview.
2. Description of both Python programs.
3. Python concepts and functions used.
4. Instructions for running both programs.
5. Sample input and output.

## LMS Submission Requirements

Submit all the following:

1. Your GitHub repository URL.
2. `result_card_generator.py`
3. `class_marks_analyzer.py`
4. `README.md`

**Important Instructions:**

- Both programming tasks are compulsory.
- Both applications must be in separate Python files.
- Ensure all files are uploaded to your GitHub repository.
- Push your latest code using Git.
- Make sure your repository is properly organized and accessible.
- Be prepared to explain your code and demonstrate both programs during evaluation.