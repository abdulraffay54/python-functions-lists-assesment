"""
Task 1: Student Result Card Generator

This program collects one student's name, roll number, and marks in five
subjects. It validates the inputs and prints a simple result card.

A student fails if any individual subject mark is below 40. The letter grade
is calculated separately from the overall percentage.
"""

# Five subjects used by the result card.
SUBJECTS = ["Mathematics", "English", "Physics", "Chemistry", "Computer Science"]

MAX_MARK_PER_SUBJECT = 100
SUBJECT_PASS_MARK = 40


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

    # Any failed subject forces a Fail.
    if failed_subjects:
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
