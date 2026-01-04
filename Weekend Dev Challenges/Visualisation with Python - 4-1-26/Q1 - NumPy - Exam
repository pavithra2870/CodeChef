import numpy as np

# 1. Load exam marks data
def load_data():
    """
    Create and return a NumPy array containing exam marks.
    Marks to use: 78, 85, 33, 66, 15, 88, 90, 59, 29, 70
    """
    # TODO: Create a NumPy array with the marks listed above
    marks = np.array([78, 85, 33, 66, 15, 88, 90, 59, 29, 70])
    
    print("Exam Marks: ", marks)
    
    # Returning the marks array
    return marks


# 2. Compute and print basic statistics
def compute_statistics(marks):
    """
    Compute and print basic statistical measures using NumPy.
    """
    # TODO: Calculate the average (mean) marks
    average = np.mean(marks)
    
    # TODO: Calculate the median marks
    median = np.median(marks)
    
    # TODO: Calculate the standard deviation
    std_deviation = np.std(marks)

    print("\n--- Class Statistics ---")
    print("Average Marks: ", average)
    print("Median Marks: ", median)
    print("Standard Deviation: ", std_deviation)

    # Returning all three values as a tuple
    return average, median, std_deviation


# 3. Analyze and print performance insights
def analyze_performance(marks, average_marks):
    """
    Analyze performance: Find students above average and those who failed.
    """
    # TODO: Filter 'marks' to find those greater than 'average_marks'
    above_average = [x for x in marks if x>average_marks]
    
    # TODO: Filter 'marks' to find those less than 35 (Fail threshold)
    failed_students = [x for x in marks if x<35]

    print("\n--- Performance Insights ---")
    print("Students scoring above average: ", above_average)
    print("Number of students above average: ", len(above_average))

    print("\nStudents who failed (marks < 35): ", failed_students)
    print("Number of failed students: ", len(failed_students))
    
    return above_average, failed_students


# 4. Find and print highest and lowest scorer
def find_extremes(marks):
    """
    Find the highest and lowest scores.
    """
    # TODO: Find the maximum score
    highest_score = np.max(marks)
    
    # TODO: Find the minimum score
    lowest_score = np.min(marks)

    print("\n--- Extremes ---")
    print("Highest Score: ", highest_score)
    print("Lowest Score: ", lowest_score)

    return highest_score, lowest_score


if __name__ == "__main__":
    print("Exam Marks Statistics Analysis...\n")

    marks = load_data()
    
    if marks is not None:
        average, median, std = compute_statistics(marks)
        analyze_performance(marks, average)
        find_extremes(marks)
