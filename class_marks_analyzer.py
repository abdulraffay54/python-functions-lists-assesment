"""
Task 2: Class Marks Analyzer

This program collects the names and marks of every student in a class,
stores them in two parallel lists, and produces a performance report with
the class average, highest and lowest scorers, pass/fail counts, students
above the average, and marks sorted from highest to lowest.
"""

PASS_MARK = 50


def get_student_count():
    """Ask for the class size and repeat until a positive whole number is entered."""
    while True:
        raw_count = input("How many students are in the class? ").strip()

        # .isdigit() rejects decimals, negative values, and non-numeric input.
        if raw_count.isdigit() and int(raw_count) > 0:
            return int(raw_count)

        print("  Invalid input: enter a whole number greater than 0.")


def get_student_name(position):
    """Ask for a student's name, clean it, and repeat until it is not empty."""
    while True:
        name = input(f"Enter name of student {position}: ").strip().title()

        if name:
            return name

        print("  Invalid input: name cannot be empty. Please try again.")


def get_valid_mark(student_name):
    """Ask for a student's mark and repeat until it is between 0 and 100."""
    while True:
        raw_mark = input(f"Enter marks for {student_name} (0-100): ").strip()

        try:
            mark = float(raw_mark)
        except ValueError:
            print("  Invalid input: please enter a numeric value.")
            continue

        # The chained comparison also rejects NaN and infinite values.
        if 0 <= mark <= 100:
            return mark

        print("  Invalid input: marks must be between 0 and 100.")


def calculate_average(marks):
    """Return the average of a list of marks, or 0 when the list is empty."""
    if not marks:
        return 0.0

    return sum(marks) / len(marks)


def find_students_with_mark(names, marks, target_mark):
    """Return every student name whose mark matches the target mark."""
    return [
        name
        for name, mark in zip(names, marks)
        if mark == target_mark
    ]


def count_pass_fail(marks):
    """Return the number of passing and failing students as a pair."""
    passing = sum(1 for mark in marks if mark >= PASS_MARK)
    failing = len(marks) - passing
    return passing, failing


def get_above_average_students(names, marks, average):
    """Return (name, mark) pairs for every student who scored above the average."""
    return [
        (name, mark)
        for name, mark in zip(names, marks)
        if mark > average
    ]


def sort_students_by_mark(names, marks):
    """Return (name, mark) pairs sorted from highest to lowest marks."""
    return sorted(zip(names, marks), key=lambda student: student[1], reverse=True)


def format_mark(mark):
    """Return a mark without an unnecessary trailing .0 for whole numbers."""
    return f"{mark:g}"


def format_name_list(names):
    """Join a list of names into a readable comma-separated string."""
    return ", ".join(names) if names else "None"


def display_report(names, marks):
    """Calculate and print the full class performance report."""
    average = calculate_average(marks)
    highest_mark = max(marks)
    lowest_mark = min(marks)
    highest_students = find_students_with_mark(names, marks, highest_mark)
    lowest_students = find_students_with_mark(names, marks, lowest_mark)
    passing_count, failing_count = count_pass_fail(marks)
    above_average = get_above_average_students(names, marks, average)
    sorted_students = sort_students_by_mark(names, marks)
    separator = "=" * 58

    print()
    print(separator)
    print(f"{'CLASS MARKS ANALYZER REPORT':^58}")
    print(separator)

    print(f"Total students     : {len(marks)}")
    print(f"Class average      : {average:.2f}")
    print(f"Highest marks      : {format_mark(highest_mark)}")
    print(f"Highest scorer(s)  : {format_name_list(highest_students)}")
    print(f"Lowest marks       : {format_mark(lowest_mark)}")
    print(f"Lowest scorer(s)   : {format_name_list(lowest_students)}")
    print(f"Passing students   : {passing_count}")
    print(f"Failing students   : {failing_count}")

    print("-" * 58)
    print("Students who scored above the class average:")
    if above_average:
        for name, mark in above_average:
            print(f"  - {name}: {format_mark(mark)}")
    else:
        print("  None")

    print("-" * 58)
    print("Students sorted by marks (highest to lowest):")
    for position, (name, mark) in enumerate(sorted_students, start=1):
        print(f"  {position}. {name:<24}{format_mark(mark):>8}")

    print(separator)


def main():
    """Collect all class data and show the analysis report."""
    print("=" * 58)
    print("CLASS MARKS ANALYZER")
    print("=" * 58)

    student_count = get_student_count()

    # Two parallel lists: the name at an index belongs to the mark at that index.
    student_names = []
    student_marks = []

    for position in range(1, student_count + 1):
        name = get_student_name(position)
        mark = get_valid_mark(name)

        student_names.append(name)
        student_marks.append(mark)

    display_report(student_names, student_marks)


if __name__ == "__main__":
    try:
        main()
    except (EOFError, KeyboardInterrupt):
        print("\nProgram cancelled.")
