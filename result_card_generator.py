"""
Task 1: Student Result Card Generator

This program collects one student's name, roll number, and marks in five
subjects, validates every input, and prints a formatted result card.

A student fails if the overall percentage is below 50 OR if any individual
subject mark is below 40, even when the overall percentage is high enough
to pass.
"""

# Five subjects used by the result card.
SUBJECTS = ["Mathematics", "English", "Physics", "Chemistry", "Computer Science"]

MAX_MARK_PER_SUBJECT = 100
SUBJECT_PASS_MARK = 40
OVERALL_PASS_PERCENTAGE = 50


def format_name(name):
    """Clean a name with .strip() and .title() and return the result."""
    return name.strip().title()


def get_student_name():
    """Ask for the student's name and repeat until a non-empty name is entered."""
    while True:
        name = input("Enter student name: ")
        cleaned_name = format_name(name)

        if cleaned_name:
            return cleaned_name

        print("  Invalid input: name cannot be empty. Please try again.")


def get_roll_number():
    """Ask for a roll number and repeat until it contains digits only."""
    while True:
        roll_number = input("Enter roll number (digits only): ").strip()

        # .isdigit() rejects letters, spaces, symbols, and decimal points.
        if roll_number.isdigit():
            return roll_number

        print("  Invalid input: roll number must contain digits only.")


def get_valid_marks(subject):
    """Ask for a subject's marks and repeat until the value is between 0 and 100."""
    while True:
        raw_marks = input(f"Enter marks for {subject} (0-100): ").strip()

        try:
            marks = float(raw_marks)
        except ValueError:
            print("  Invalid input: please enter a numeric value.")
            continue

        # The chained comparison also rejects NaN and infinite values.
        if 0 <= marks <= 100:
            return marks

        print("  Invalid input: marks must be between 0 and 100.")


def calculate_percentage(total, max_total):
    """Return the percentage of total out of max_total, guarding against division by zero."""
    if max_total <= 0:
        return 0.0

    return (total / max_total) * 100


def get_grade(percentage):
    """Return the letter grade that matches the given percentage."""
    if percentage >= 90:
        return "A+"
    if percentage >= 80:
        return "A"
    if percentage >= 70:
        return "B"
    if percentage >= 60:
        return "C"
    if percentage >= 50:
        return "D"
    return "Fail"


def find_failed_subjects(subjects, marks):
    """Return the names of all subjects whose marks are below the subject pass mark."""
    return [
        subject
        for subject, mark in zip(subjects, marks)
        if mark < SUBJECT_PASS_MARK
    ]


def determine_final_status(percentage, failed_subjects):
    """Return the final Pass/Fail status based on the percentage and failed subjects."""
    # Any subject below 40 forces a Fail, regardless of the overall percentage.
    if failed_subjects or percentage < OVERALL_PASS_PERCENTAGE:
        return "Fail"
    return "Pass"


def format_mark(mark):
    """Return a mark without an unnecessary trailing .0 for whole numbers."""
    return f"{mark:g}"


def print_result_card(name, roll_number, subjects, marks, percentage, grade, status, failed_subjects):
    """Print the complete result card using f-strings and aligned columns."""
    total_marks = sum(marks)
    max_total = len(subjects) * MAX_MARK_PER_SUBJECT
    separator = "=" * 52

    print()
    print(separator)
    print(f"{'STUDENT RESULT CARD':^52}")
    print(separator)
    print(f"Student Name : {name}")
    print(f"Roll Number  : {roll_number}")
    print("-" * 52)
    print(f"{'Subject':<28}{'Marks':>10}{'Status':>14}")
    print("-" * 52)

    # Show each subject's marks and whether that subject was passed.
    for subject, mark in zip(subjects, marks):
        subject_status = "Pass" if mark >= SUBJECT_PASS_MARK else "Fail"
        print(f"{subject:<28}{format_mark(mark):>10}{subject_status:>14}")

    print("-" * 52)
    print(f"{'Total Obtained Marks':<28}{format_mark(total_marks):>10} / {max_total}")
    print(f"{'Overall Percentage':<28}{percentage:>10.2f}%")
    print(f"{'Letter Grade':<28}{grade:>10}")
    print(f"{'Final Status':<28}{status.upper():>10}")

    # Explain why a result can fail even when the percentage looks acceptable.
    if failed_subjects:
        print("-" * 52)
        print("Result failed: the following subject(s) are below 40 marks:")
        for subject in failed_subjects:
            print(f"  - {subject}")

    print(separator)


def main():
    """Run the result card generator from input collection to final output."""
    print("=" * 52)
    print("STUDENT RESULT CARD GENERATOR")
    print("=" * 52)

    name = get_student_name()
    roll_number = get_roll_number()

    marks = []
    for subject in SUBJECTS:
        marks.append(get_valid_marks(subject))

    max_total = len(SUBJECTS) * MAX_MARK_PER_SUBJECT
    total_marks = sum(marks)
    percentage = calculate_percentage(total_marks, max_total)
    grade = get_grade(percentage)
    failed_subjects = find_failed_subjects(SUBJECTS, marks)
    final_status = determine_final_status(percentage, failed_subjects)

    print_result_card(
        name,
        roll_number,
        SUBJECTS,
        marks,
        percentage,
        grade,
        final_status,
        failed_subjects,
    )


if __name__ == "__main__":
    try:
        main()
    except (EOFError, KeyboardInterrupt):
        print("\nProgram cancelled.")
