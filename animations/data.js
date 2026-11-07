/*
 * Step data for the two interactive code walkthroughs.
 * No external libraries are used: the animation engine is in walkthrough.js.
 */
window.WALKTHROUGHS = {
  result: {
    title: "Student Result Card Generator",
    file: "result_card_generator.py",
    scenario: "Ayesha Khan · Roll 12345 · Marks 95, 88, 92, 90, 85",
    summary:
      "Follow one student from the first input prompt to the final printed result card.",
    source: String.raw`"""
Task 1: Student Result Card Generator

This program collects one student's name, roll number, and marks in five
subjects. It validates the inputs and prints a simple result card.

A student fails if the overall percentage is below 50 OR if any individual
subject mark is below 40.
"""

# Five subjects used by the result card.
SUBJECTS = ["Mathematics", "English", "Physics", "Chemistry", "Computer Science"]

MAX_MARK_PER_SUBJECT = 100
SUBJECT_PASS_MARK = 40
OVERALL_PASS_PERCENTAGE = 50


def format_name(name):
    """Clean a name with .strip() and .title() and return the result."""
    return name.strip().title()


def get_valid_marks(subject):
    """Ask for marks until a whole number between 0 and 100 is entered."""
    while True:
        marks = input(f"Enter marks for {subject} (0-100): ").strip()

        if not marks.isdigit():
            print("Invalid input! Please enter numbers only.")
            continue

        marks = int(marks)

        if 0 <= marks <= 100:
            return marks

        print("Invalid marks! Enter marks between 0 and 100.")


def calculate_percentage(total, max_total):
    """Return total as a percentage of max_total."""
    return (total / max_total) * 100


def get_grade(percentage):
    """Return the letter grade for a percentage."""
    if percentage >= 90:
        return "A+"
    elif percentage >= 80:
        return "A"
    elif percentage >= 70:
        return "B"
    elif percentage >= 60:
        return "C"
    elif percentage >= 50:
        return "D"
    else:
        return "Fail"


def main():
    """Collect the student's details and print the result card."""
    print("===== Student Result Card Generator =====")

    # Clean the name and ask again if it is empty.
    name = format_name(input("Enter student name: "))
    while not name:
        print("Invalid name! Name cannot be empty.")
        name = format_name(input("Enter student name: "))

    # Roll number must contain digits only.
    while True:
        roll_number = input("Enter roll number: ").strip()

        if roll_number.isdigit():
            break

        print("Invalid roll number! Enter digits only.")

    marks = []
    failed_subjects = []

    for subject in SUBJECTS:
        mark = get_valid_marks(subject)
        marks.append(mark)

        if mark < SUBJECT_PASS_MARK:
            failed_subjects.append(subject)

    total_marks = sum(marks)
    max_total = len(SUBJECTS) * MAX_MARK_PER_SUBJECT
    percentage = calculate_percentage(total_marks, max_total)
    grade = get_grade(percentage)

    # Any failed subject or overall score below 50 forces a Fail.
    if failed_subjects or percentage < OVERALL_PASS_PERCENTAGE:
        grade = "Fail"
        result = "Fail"
    else:
        result = "Pass"

    print("\n" + "=" * 50)
    print(f"{'STUDENT RESULT CARD':^50}")
    print("=" * 50)
    print(f"Student Name : {name}")
    print(f"Roll Number  : {roll_number}")
    print("-" * 50)
    print(f"{'Subject':<25}{'Marks':>10}")
    print("-" * 50)

    for subject, mark in zip(SUBJECTS, marks):
        print(f"{subject:<25}{mark:>10}")

    print("-" * 50)
    print(f"Total Marks  : {total_marks}/{max_total}")
    print(f"Percentage   : {percentage:.2f}%")
    print(f"Grade        : {grade}")
    print(f"Result       : {result}")

    if failed_subjects:
        print(f"Failed Subject(s): {', '.join(failed_subjects)}")

    print("=" * 50)


if __name__ == "__main__":
    try:
        main()
    except (EOFError, KeyboardInterrupt):
        print("\nProgram cancelled.")
`,
    steps: [
      {
        phase: "entry",
        title: "The program starts",
        description:
          "Python loads the file and reaches the __main__ guard. It calls main() inside a try block so Ctrl+C or an unexpected end of input can be handled.",
        focus: "<module>",
        lines: [127, 128, 129],
        stack: ["<module>"],
        vars: {
          SUBJECTS: "5 subjects",
          MAX_MARK_PER_SUBJECT: 100,
          SUBJECT_PASS_MARK: 40,
          OVERALL_PASS_PERCENTAGE: 50
        },
        terminal: [{ kind: "command", text: "$ python result_card_generator.py" }],
        duration: 2300
      },
      {
        phase: "input",
        title: "main() prints the title",
        description:
          "Execution enters main(). The first statement prints a heading, then the program is ready to collect the student's details.",
        focus: "main()",
        lines: [62, 64],
        stack: ["<module>", "main()"],
        vars: {
          name: "(not read yet)",
          roll_number: "(not read yet)",
          marks: "[]",
          failed_subjects: "[]"
        },
        terminal: [{ kind: "output", text: "===== Student Result Card Generator =====" }],
        duration: 2000
      },
      {
        phase: "input",
        title: "Read the student's name",
        description:
          "input() returns raw text. The program immediately passes that text to format_name() instead of storing the messy version.",
        focus: "main()",
        lines: [67],
        stack: ["<module>", "main()"],
        vars: {
          "raw input": '"  aYESHA khan  "',
          name: "(being formatted)"
        },
        terminal: [{ kind: "input", text: "Enter student name:   aYESHA khan  " }],
        duration: 2200
      },
      {
        phase: "process",
        title: "format_name() cleans the name",
        description:
          "format_name() receives the raw string. .strip() removes the outside spaces, .title() capitalizes each word, and the cleaned value is returned to main().",
        focus: "format_name()",
        lines: [19, 20, 21, 67],
        stack: ["<module>", "main()", "format_name()"],
        vars: {
          "name (argument)": '"  aYESHA khan  "',
          name: '"Ayesha Khan"'
        },
        terminal: [
          { kind: "return", text: 'format_name() returned "Ayesha Khan"' }
        ],
        duration: 2600
      },
      {
        phase: "decision",
        title: "Check for an empty name",
        description:
          "The while loop tests not name. The cleaned name contains text, so the condition is False and the loop is skipped.",
        focus: "main()",
        lines: [68],
        stack: ["<module>", "main()"],
        vars: {
          name: '"Ayesha Khan"',
          condition: "not name → False"
        },
        terminal: [],
        duration: 1900
      },
      {
        phase: "input",
        title: "Validate the roll number",
        description:
          "The loop asks for input until .isdigit() returns True. The value 12345 passes, so break exits the loop without printing an error.",
        focus: "main()",
        lines: [73, 74, 76, 77],
        stack: ["<module>", "main()"],
        vars: {
          roll_number: '"12345"',
          "roll_number.isdigit()": "True"
        },
        terminal: [
          { kind: "input", text: "Enter roll number: 12345" },
          { kind: "return", text: ".isdigit() → True, break out of the loop" }
        ],
        duration: 2200
      },
      {
        phase: "process",
        title: "Create the tracking lists",
        description:
          "marks will keep every subject score in order. failed_subjects starts empty and will only receive names of subjects below 40.",
        focus: "main()",
        lines: [81, 82],
        stack: ["<module>", "main()"],
        vars: {
          marks: "[]",
          failed_subjects: "[]"
        },
        terminal: [],
        duration: 1900
      },
      {
        phase: "input",
        title: "Subject 1 · Mathematics",
        description:
          "main() calls get_valid_marks('Mathematics'). The function checks that 95 is digits, converts it to int, accepts the 0–100 range, and returns it.",
        focus: "get_valid_marks()",
        lines: [84, 85, 26, 27, 29, 33, 35, 36, 86, 88],
        stack: ["<module>", "main()", "get_valid_marks()"],
        vars: {
          subject: '"Mathematics"',
          mark: 95,
          marks: "[95]",
          failed_subjects: "[]"
        },
        terminal: [
          { kind: "input", text: "Enter marks for Mathematics (0-100): 95" },
          { kind: "return", text: "get_valid_marks('Mathematics') returned 95" }
        ],
        note:
          "Validation branch: 'abc' would print an invalid-input message and repeat; 101 would print the range message and repeat.",
        duration: 2600
      },
      {
        phase: "input",
        title: "Subject 2 · English",
        description:
          "The same function runs again for English. 88 is appended to marks, and because 88 is not below 40, failed_subjects is still empty.",
        focus: "get_valid_marks()",
        lines: [84, 85, 26, 27, 29, 33, 35, 36, 86, 88],
        stack: ["<module>", "main()", "get_valid_marks()"],
        vars: {
          subject: '"English"',
          mark: 88,
          marks: "[95, 88]",
          failed_subjects: "[]"
        },
        terminal: [
          { kind: "input", text: "Enter marks for English (0-100): 88" },
          { kind: "return", text: "get_valid_marks('English') returned 88" }
        ],
        duration: 2200
      },
      {
        phase: "input",
        title: "Subject 3 · Physics",
        description:
          "Physics scores 92. The loop body appends the mark and performs the below-40 check before moving to the next subject.",
        focus: "get_valid_marks()",
        lines: [84, 85, 26, 27, 29, 33, 35, 36, 86, 88],
        stack: ["<module>", "main()", "get_valid_marks()"],
        vars: {
          subject: '"Physics"',
          mark: 92,
          marks: "[95, 88, 92]",
          failed_subjects: "[]"
        },
        terminal: [
          { kind: "input", text: "Enter marks for Physics (0-100): 92" },
          { kind: "return", text: "get_valid_marks('Physics') returned 92" }
        ],
        duration: 2100
      },
      {
        phase: "input",
        title: "Subject 4 · Chemistry",
        description:
          "Chemistry scores 90. All validation rules pass again, so the function returns the integer and main() stores it.",
        focus: "get_valid_marks()",
        lines: [84, 85, 26, 27, 29, 33, 35, 36, 86, 88],
        stack: ["<module>", "main()", "get_valid_marks()"],
        vars: {
          subject: '"Chemistry"',
          mark: 90,
          marks: "[95, 88, 92, 90]",
          failed_subjects: "[]"
        },
        terminal: [
          { kind: "input", text: "Enter marks for Chemistry (0-100): 90" },
          { kind: "return", text: "get_valid_marks('Chemistry') returned 90" }
        ],
        duration: 2100
      },
      {
        phase: "input",
        title: "Subject 5 · Computer Science",
        description:
          "The final mark is 85. The loop finishes all five subjects, and no subject has triggered the below-40 condition.",
        focus: "get_valid_marks()",
        lines: [84, 85, 26, 27, 29, 33, 35, 36, 86, 88],
        stack: ["<module>", "main()", "get_valid_marks()"],
        vars: {
          subject: '"Computer Science"',
          mark: 85,
          marks: "[95, 88, 92, 90, 85]",
          failed_subjects: "[]"
        },
        terminal: [
          { kind: "input", text: "Enter marks for Computer Science (0-100): 85" },
          { kind: "return", text: "get_valid_marks('Computer Science') returned 85" }
        ],
        duration: 2200
      },
      {
        phase: "process",
        title: "All five marks are collected",
        description:
          "The for loop has finished. marks contains five integers in subject order, and failed_subjects is still empty because every score is at least 40.",
        focus: "main()",
        lines: [84],
        stack: ["<module>", "main()"],
        vars: {
          marks: "[95, 88, 92, 90, 85]",
          failed_subjects: "[]",
          "loop status": "finished"
        },
        terminal: [],
        duration: 2100
      },
      {
        phase: "process",
        title: "Calculate the totals",
        description:
          "sum(marks) adds the five scores to get 450. len(SUBJECTS) * MAX_MARK_PER_SUBJECT gives the maximum possible total of 500.",
        focus: "main()",
        lines: [91, 92],
        stack: ["<module>", "main()"],
        vars: {
          marks: "[95, 88, 92, 90, 85]",
          total_marks: 450,
          max_total: 500
        },
        terminal: [],
        duration: 2100
      },
      {
        phase: "process",
        title: "calculate_percentage() runs",
        description:
          "main() passes total_marks and max_total into the function. The function returns (450 / 500) * 100, which is 90.0.",
        focus: "calculate_percentage()",
        lines: [93, 41, 42, 43],
        stack: ["<module>", "main()", "calculate_percentage()"],
        vars: {
          total: 450,
          max_total: 500,
          percentage: 90.0
        },
        terminal: [
          { kind: "return", text: "calculate_percentage(450, 500) returned 90.0" }
        ],
        duration: 2300
      },
      {
        phase: "process",
        title: "get_grade() chooses a letter",
        description:
          "The if / elif chain checks the percentage from top to bottom. 90.0 matches the first condition, so the function returns 'A+'.",
        focus: "get_grade()",
        lines: [94, 46, 48, 49],
        stack: ["<module>", "main()", "get_grade()"],
        vars: {
          percentage: 90.0,
          "90.0 >= 90": "True",
          grade: '"A+"'
        },
        terminal: [{ kind: "return", text: "get_grade(90.0) returned 'A+'" }],
        duration: 2300
      },
      {
        phase: "decision",
        title: "Apply the final Fail rule",
        description:
          "The decision checks two things: whether any subject failed, and whether the percentage is below 50. Both are False, so result becomes 'Pass'.",
        focus: "main()",
        lines: [96, 97, 98, 99, 100, 101],
        stack: ["<module>", "main()"],
        vars: {
          failed_subjects: "[]",
          percentage: 90.0,
          "failed_subjects or percentage < 50": "False or False → False",
          grade: '"A+"',
          result: '"Pass"'
        },
        terminal: [],
        note:
          "If Chemistry had been below 40, this branch would force both grade and result to 'Fail'.",
        duration: 2600
      },
      {
        phase: "output",
        title: "Print the result-card heading",
        description:
          "The program prints the card borders, student details, and table heading. f-strings control spacing and alignment.",
        focus: "main()",
        lines: [103, 104, 105, 106, 107, 108, 109, 110],
        stack: ["<module>", "main()"],
        vars: {
          name: '"Ayesha Khan"',
          roll_number: '"12345"',
          total_marks: 450,
          percentage: 90.0
        },
        terminal: [
          {
            kind: "output",
            text:
              "\n==================================================\n               STUDENT RESULT CARD\n==================================================\nStudent Name : Ayesha Khan\nRoll Number  : 12345\n--------------------------------------------------\nSubject                       Marks\n--------------------------------------------------"
          }
        ],
        duration: 2800
      },
      {
        phase: "output",
        title: "Print every subject row",
        description:
          "zip(SUBJECTS, marks) pairs each subject with its score. The loop prints one aligned row for each pair.",
        focus: "main()",
        lines: [112, 113],
        stack: ["<module>", "main()"],
        vars: {
          "zip pairs": "5 subject-mark pairs",
          "current row": "Computer Science · 85"
        },
        terminal: [
          {
            kind: "output",
            text:
              "Mathematics                      95\nEnglish                          88\nPhysics                          92\nChemistry                        90\nComputer Science                 85"
          }
        ],
        duration: 2600
      },
      {
        phase: "output",
        title: "Print the summary",
        description:
          "The final rows show total marks, percentage to two decimal places, the letter grade, and the final Pass/Fail result.",
        focus: "main()",
        lines: [115, 116, 117, 118, 119],
        stack: ["<module>", "main()"],
        vars: {
          total_marks: 450,
          max_total: 500,
          percentage: 90.0,
          grade: '"A+"',
          result: '"Pass"'
        },
        terminal: [
          {
            kind: "output",
            text:
              "--------------------------------------------------\nTotal Marks  : 450/500\nPercentage   : 90.00%\nGrade        : A+\nResult       : Pass"
          }
        ],
        duration: 2700
      },
      {
        phase: "output",
        title: "Skip the failure note and finish",
        description:
          "failed_subjects is empty, so the failure-note block is skipped. The closing border prints, main() returns, and the program ends.",
        focus: "main()",
        lines: [121, 122, 124],
        stack: ["<module>", "main()"],
        vars: {
          failed_subjects: "[]",
          result: '"Pass"',
          "program status": "finished"
        },
        terminal: [
          { kind: "output", text: "==================================================" },
          { kind: "success", text: "main() returned. Program finished successfully." }
        ],
        duration: 2700
      }
    ]
  },

  classMarks: {
    title: "Class Marks Analyzer",
    file: "class_marks_analyzer.py",
    scenario: "4 students · Ali 90 · Sara 75 · Bob 90 · Cara 40",
    summary:
      "Follow the class data from input collection through every calculation in the report.",
    source: String.raw`"""
Task 2: Class Marks Analyzer

This program collects the names and marks of every student in a class,
stores them in two parallel lists, and prints a performance report.
"""

PASS_MARK = 50


def get_valid_mark(student_name):
    """Ask for one student's mark until a whole number from 0 to 100 is entered."""
    while True:
        mark = input(f"Enter marks for {student_name} (0-100): ").strip()

        if not mark.isdigit():
            print("Invalid input! Please enter numbers only.")
            continue

        mark = int(mark)

        if 0 <= mark <= 100:
            return mark

        print("Invalid marks! Enter marks between 0 and 100.")


def display_report(names, marks):
    """Calculate and print the class performance report."""
    average = sum(marks) / len(marks)
    highest = max(marks)
    lowest = min(marks)

    highest_students = []
    lowest_students = []
    above_average = []
    passing = 0
    failing = 0

    for index in range(len(marks)):
        name = names[index]
        mark = marks[index]

        if mark == highest:
            highest_students.append(name)

        if mark == lowest:
            lowest_students.append(name)

        if mark >= PASS_MARK:
            passing += 1
        else:
            failing += 1

        if mark > average:
            above_average.append((name, mark))

    sorted_students = sorted(zip(names, marks), key=lambda student: student[1], reverse=True)

    print("\n" + "=" * 55)
    print(f"{'CLASS MARKS ANALYZER REPORT':^55}")
    print("=" * 55)
    print(f"Total students     : {len(marks)}")
    print(f"Class average      : {average:.2f}")
    print(f"Highest marks      : {highest}")
    print(f"Highest scorer(s)  : {', '.join(highest_students)}")
    print(f"Lowest marks       : {lowest}")
    print(f"Lowest scorer(s)   : {', '.join(lowest_students)}")
    print(f"Passing students   : {passing}")
    print(f"Failing students   : {failing}")
    print("-" * 55)
    print("Students who scored above the class average:")

    if above_average:
        for name, mark in above_average:
            print(f"  - {name}: {mark}")
    else:
        print("  None")

    print("-" * 55)
    print("Students sorted by marks (highest to lowest):")

    for position, (name, mark) in enumerate(sorted_students, start=1):
        print(f"  {position}. {name:<24}{mark:>5}")

    print("=" * 55)


def main():
    """Collect class data and show the performance report."""
    print("===== Class Marks Analyzer =====")

    # Ask for a valid number of students.
    while True:
        raw_count = input("How many students are in the class? ").strip()

        if raw_count.isdigit() and int(raw_count) > 0:
            student_count = int(raw_count)
            break

        print("Invalid input! Enter a whole number greater than 0.")

    # Two parallel lists: the name at an index belongs to the mark at that index.
    student_names = []
    student_marks = []

    for position in range(1, student_count + 1):
        while True:
            name = input(f"Enter name of student {position}: ").strip().title()

            if name:
                break

            print("Invalid name! Name cannot be empty.")

        mark = get_valid_mark(name)
        student_names.append(name)
        student_marks.append(mark)

    display_report(student_names, student_marks)


if __name__ == "__main__":
    try:
        main()
    except (EOFError, KeyboardInterrupt):
        print("\nProgram cancelled.")
`,
    steps: [
      {
        phase: "entry",
        title: "The program starts",
        description:
          "Python loads the file and reaches the __main__ guard. It calls main() and wraps the call in try/except for Ctrl+C and end-of-input errors.",
        focus: "<module>",
        lines: [123, 124, 125],
        stack: ["<module>"],
        vars: {
          PASS_MARK: 50
        },
        terminal: [{ kind: "command", text: "$ python class_marks_analyzer.py" }],
        duration: 2300
      },
      {
        phase: "input",
        title: "main() prints the title",
        description:
          "Execution enters main(). The heading is printed before the program asks for any class data.",
        focus: "main()",
        lines: [89, 91],
        stack: ["<module>", "main()"],
        vars: {
          student_names: "(not created yet)",
          student_marks: "(not created yet)"
        },
        terminal: [{ kind: "output", text: "===== Class Marks Analyzer =====" }],
        duration: 2000
      },
      {
        phase: "input",
        title: "Read and validate the class size",
        description:
          "raw_count must pass two checks: .isdigit() and int(raw_count) > 0. The input 4 passes, is converted to an integer, and break leaves the loop.",
        focus: "main()",
        lines: [94, 95, 97, 98, 99],
        stack: ["<module>", "main()"],
        vars: {
          raw_count: '"4"',
          student_count: 4,
          "isdigit() and > 0": "True"
        },
        terminal: [
          { kind: "input", text: "How many students are in the class? 4" },
          { kind: "return", text: "student_count = 4, break out of the loop" }
        ],
        note:
          "Validation branch: 0, -2, or 'abc' would print an error and ask again.",
        duration: 2600
      },
      {
        phase: "process",
        title: "Create the two parallel lists",
        description:
          "student_names and student_marks start empty. The name and mark at the same index will describe the same student.",
        focus: "main()",
        lines: [104, 105],
        stack: ["<module>", "main()"],
        vars: {
          student_names: "[]",
          student_marks: "[]"
        },
        terminal: [],
        duration: 2000
      },
      {
        phase: "input",
        title: "Student 1 · read the name",
        description:
          "The for loop starts at position 1. input() reads 'ali', .strip().title() cleans it to 'Ali', and the non-empty check lets the inner while loop end.",
        focus: "main()",
        lines: [107, 109, 111, 112],
        stack: ["<module>", "main()"],
        vars: {
          position: 1,
          name: '"Ali"',
          student_names: "[]",
          student_marks: "[]"
        },
        terminal: [
          { kind: "input", text: "Enter name of student 1: ali" },
          { kind: "return", text: '.strip().title() → "Ali", name is not empty' }
        ],
        duration: 2400
      },
      {
        phase: "input",
        title: "Student 1 · validate the mark",
        description:
          "main() calls get_valid_mark('Ali'). The mark 90 passes the digit check, is converted to int, and is accepted by the 0–100 range check.",
        focus: "get_valid_mark()",
        lines: [116, 11, 13, 14, 16, 20, 22, 23],
        stack: ["<module>", "main()", "get_valid_mark()"],
        vars: {
          student_name: '"Ali"',
          mark: 90
        },
        terminal: [
          { kind: "input", text: "Enter marks for Ali (0-100): 90" },
          { kind: "return", text: "get_valid_mark('Ali') returned 90" }
        ],
        note:
          "Validation branch: a non-digit value or a number outside 0–100 would repeat the prompt.",
        duration: 2600
      },
      {
        phase: "process",
        title: "Student 1 · append to both lists",
        description:
          "The name and mark are appended separately. Their matching positions are what keep the two parallel lists connected.",
        focus: "main()",
        lines: [117, 118],
        stack: ["<module>", "main()"],
        vars: {
          student_names: '["Ali"]',
          student_marks: "[90]",
          "index 0": "Ali · 90"
        },
        terminal: [],
        duration: 2100
      },
      {
        phase: "input",
        title: "Student 2 · Sara · 75",
        description:
          "The loop repeats for position 2. 'Sara' is cleaned and appended, then 75 is validated and appended at the same index.",
        focus: "get_valid_mark()",
        lines: [107, 109, 111, 112, 116, 117, 118, 11, 14, 16, 20, 23],
        stack: ["<module>", "main()", "get_valid_mark()"],
        vars: {
          position: 2,
          name: '"Sara"',
          mark: 75,
          student_names: '["Ali", "Sara"]',
          student_marks: "[90, 75]"
        },
        terminal: [
          { kind: "input", text: "Enter name of student 2: Sara" },
          { kind: "input", text: "Enter marks for Sara (0-100): 75" },
          { kind: "return", text: "get_valid_mark('Sara') returned 75" }
        ],
        duration: 2800
      },
      {
        phase: "input",
        title: "Student 3 · Bob · 90",
        description:
          "Bob also scores 90. The lists keep growing in order; Bob's mark will later be tied for the highest score.",
        focus: "get_valid_mark()",
        lines: [107, 109, 111, 112, 116, 117, 118, 11, 14, 16, 20, 23],
        stack: ["<module>", "main()", "get_valid_mark()"],
        vars: {
          position: 3,
          name: '"Bob"',
          mark: 90,
          student_names: '["Ali", "Sara", "Bob"]',
          student_marks: "[90, 75, 90]"
        },
        terminal: [
          { kind: "input", text: "Enter name of student 3: Bob" },
          { kind: "input", text: "Enter marks for Bob (0-100): 90" },
          { kind: "return", text: "get_valid_mark('Bob') returned 90" }
        ],
        duration: 2600
      },
      {
        phase: "input",
        title: "Student 4 · Cara · 40",
        description:
          "Cara scores 40. The collection loop is now finished, and the two lists contain four matching entries each.",
        focus: "get_valid_mark()",
        lines: [107, 109, 111, 112, 116, 117, 118, 11, 14, 16, 20, 23],
        stack: ["<module>", "main()", "get_valid_mark()"],
        vars: {
          position: 4,
          name: '"Cara"',
          mark: 40,
          student_names: '["Ali", "Sara", "Bob", "Cara"]',
          student_marks: "[90, 75, 90, 40]"
        },
        terminal: [
          { kind: "input", text: "Enter name of student 4: Cara" },
          { kind: "input", text: "Enter marks for Cara (0-100): 40" },
          { kind: "return", text: "get_valid_mark('Cara') returned 40" }
        ],
        duration: 2600
      },
      {
        phase: "process",
        title: "Call display_report()",
        description:
          "After the loop, main() passes both complete lists to display_report(). From here, all calculations happen inside the report function.",
        focus: "display_report()",
        lines: [120],
        stack: ["<module>", "main()", "display_report()"],
        vars: {
          student_names: '["Ali", "Sara", "Bob", "Cara"]',
          student_marks: "[90, 75, 90, 40]"
        },
        terminal: [
          { kind: "muted", text: "main() called display_report(student_names, student_marks)" }
        ],
        duration: 2300
      },
      {
        phase: "process",
        title: "Calculate the class average",
        description:
          "sum(marks) is 295 and len(marks) is 4, so the average is 295 / 4 = 73.75.",
        focus: "display_report()",
        lines: [30],
        stack: ["<module>", "main()", "display_report()"],
        vars: {
          marks: "[90, 75, 90, 40]",
          "sum(marks)": 295,
          "len(marks)": 4,
          average: 73.75
        },
        terminal: [],
        duration: 2200
      },
      {
        phase: "process",
        title: "Find the highest and lowest marks",
        description:
          "max() returns 90 and min() returns 40. These values are used later to find every student who achieved each extreme.",
        focus: "display_report()",
        lines: [31, 32],
        stack: ["<module>", "main()", "display_report()"],
        vars: {
          highest: 90,
          lowest: 40
        },
        terminal: [],
        duration: 2100
      },
      {
        phase: "process",
        title: "Prepare the report accumulators",
        description:
          "Four empty lists collect names or name-mark pairs, while passing and failing start at zero and will be incremented during the loop.",
        focus: "display_report()",
        lines: [34, 35, 36, 37, 38],
        stack: ["<module>", "main()", "display_report()"],
        vars: {
          highest_students: "[]",
          lowest_students: "[]",
          above_average: "[]",
          passing: 0,
          failing: 0
        },
        terminal: [],
        duration: 2200
      },
      {
        phase: "process",
        title: "Index 0 · Ali · 90",
        description:
          "Ali matches the highest mark, so his name is added to highest_students. He passes, and 90 is above the average of 73.75, so he enters above_average too.",
        focus: "display_report()",
        lines: [40, 41, 42, 44, 45, 50, 51, 55, 56],
        stack: ["<module>", "main()", "display_report()"],
        vars: {
          index: 0,
          name: '"Ali"',
          mark: 90,
          highest_students: '["Ali"]',
          lowest_students: "[]",
          above_average: '[("Ali", 90)]',
          passing: 1,
          failing: 0
        },
        terminal: [],
        duration: 2600
      },
      {
        phase: "process",
        title: "Index 1 · Sara · 75",
        description:
          "Sara is not the highest or lowest. She passes, and 75 is slightly above 73.75, so she is also added to above_average.",
        focus: "display_report()",
        lines: [40, 41, 42, 44, 45, 50, 51, 55, 56],
        stack: ["<module>", "main()", "display_report()"],
        vars: {
          index: 1,
          name: '"Sara"',
          mark: 75,
          highest_students: '["Ali"]',
          lowest_students: "[]",
          above_average: '[("Ali", 90), ("Sara", 75)]',
          passing: 2,
          failing: 0
        },
        terminal: [],
        duration: 2400
      },
      {
        phase: "process",
        title: "Index 2 · Bob · 90",
        description:
          "Bob ties the highest mark, so his name is appended as the second highest scorer. He passes and is also above average.",
        focus: "display_report()",
        lines: [40, 41, 42, 44, 45, 50, 51, 55, 56],
        stack: ["<module>", "main()", "display_report()"],
        vars: {
          index: 2,
          name: '"Bob"',
          mark: 90,
          highest_students: '["Ali", "Bob"]',
          lowest_students: "[]",
          above_average: '[("Ali", 90), ("Sara", 75), ("Bob", 90)]',
          passing: 3,
          failing: 0
        },
        terminal: [],
        duration: 2400
      },
      {
        phase: "process",
        title: "Index 3 · Cara · 40",
        description:
          "Cara is the only student at the lowest mark, so she is added to lowest_students. Since 40 is below PASS_MARK, failing becomes 1; 40 is not above average.",
        focus: "display_report()",
        lines: [40, 41, 42, 44, 45, 47, 48, 50, 51, 52, 53, 55, 56],
        stack: ["<module>", "main()", "display_report()"],
        vars: {
          index: 3,
          name: '"Cara"',
          mark: 40,
          highest_students: '["Ali", "Bob"]',
          lowest_students: '["Cara"]',
          above_average: '[("Ali", 90), ("Sara", 75), ("Bob", 90)]',
          passing: 3,
          failing: 1
        },
        terminal: [],
        duration: 2700
      },
      {
        phase: "process",
        title: "Sort the students by marks",
        description:
          "sorted() receives name-mark pairs, sorts by the mark using the lambda key, and reverses the result. The two 90s stay in their original order because Python's sort is stable.",
        focus: "display_report()",
        lines: [58],
        stack: ["<module>", "main()", "display_report()"],
        vars: {
          sorted_students: '[("Ali", 90), ("Bob", 90), ("Sara", 75), ("Cara", 40)]'
        },
        terminal: [],
        duration: 2500
      },
      {
        phase: "output",
        title: "Print the report summary",
        description:
          "The report prints the class size, average, highest and lowest marks, every tied scorer, and the pass/fail counts.",
        focus: "display_report()",
        lines: [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
        stack: ["<module>", "main()", "display_report()"],
        vars: {
          average: 73.75,
          highest: 90,
          lowest: 40,
          passing: 3,
          failing: 1
        },
        terminal: [
          {
            kind: "output",
            text:
              "\n=======================================================\n              CLASS MARKS ANALYZER REPORT               \n=======================================================\nTotal students     : 4\nClass average      : 73.75\nHighest marks      : 90\nHighest scorer(s)  : Ali, Bob\nLowest marks       : 40\nLowest scorer(s)   : Cara\nPassing students   : 3\nFailing students   : 1\n-------------------------------------------------------\nStudents who scored above the class average:"
          }
        ],
        duration: 3200
      },
      {
        phase: "output",
        title: "Print the above-average students",
        description:
          "above_average is not empty, so the for loop prints Ali, Sara, and Bob with their marks. The 'None' branch is skipped.",
        focus: "display_report()",
        lines: [72, 74, 75, 76],
        stack: ["<module>", "main()", "display_report()"],
        vars: {
          above_average: '[("Ali", 90), ("Sara", 75), ("Bob", 90)]'
        },
        terminal: [
          { kind: "output", text: "  - Ali: 90\n  - Sara: 75\n  - Bob: 90" }
        ],
        duration: 2500
      },
      {
        phase: "output",
        title: "Print the sorted ranking",
        description:
          "enumerate() numbers the sorted pairs from 1. The loop prints Ali, Bob, Sara, and Cara in descending order of marks.",
        focus: "display_report()",
        lines: [80, 81, 83, 84],
        stack: ["<module>", "main()", "display_report()"],
        vars: {
          sorted_students: '[("Ali", 90), ("Bob", 90), ("Sara", 75), ("Cara", 40)]',
          "rank 1": "Ali · 90",
          "rank 4": "Cara · 40"
        },
        terminal: [
          {
            kind: "output",
            text:
              "-------------------------------------------------------\nStudents sorted by marks (highest to lowest):\n  1. Ali                        90\n  2. Bob                        90\n  3. Sara                       75\n  4. Cara                       40"
          }
        ],
        duration: 2900
      },
      {
        phase: "output",
        title: "Close the report and return",
        description:
          "The final border prints, display_report() returns to main(), and main() finishes. The class analysis is complete.",
        focus: "main()",
        lines: [86, 120],
        stack: ["<module>", "main()"],
        vars: {
          "program status": "finished",
          passing: 3,
          failing: 1
        },
        terminal: [
          { kind: "output", text: "=======================================================" },
          {
            kind: "success",
            text: "display_report() returned to main(). Program finished successfully."
          }
        ],
        duration: 2800
      }
    ]
  }
};
