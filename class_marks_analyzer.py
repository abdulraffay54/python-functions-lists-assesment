"""
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
