- df.info() and df.describe()
- df = df.fillna(value={"course_title":"Unknown Course"}) to fill nan in course_title coulumn with Unknown Course
- df = df.dropna(subset=['price','num_lectures']) drop rows where the subset columns have nan values
- df = df.drop_duplicates(subset=['course_title', 'subject'],keep='first') drops duplicates based on subset cols and keeps the first only (keep can be last too)
- df["subject"] = df["subject"].str.strip().str.title() edits the column strings
- df = df.astype({"price":"float32"}) for type casting
- df.to_csv("cleaned_udemy_courses.csv",index=False) to save 
``` python[]
import pandas as pd
# 1. Load Dataset
def load_data():
    """
    Load the Udemy courses dataset.
    """
    # TODO: Read the dataset, file "udemy_courses.csv"
    df = pd.read_csv("udemy_courses.csv")
    return df

# 2. Inspect Data
def inspect_data(df):
    """
    Print dataset info and summary statistics.
    """
    print("\nDataset Info:")
    # TODO: Print the info of the dataframe to check types and missing values 
    df.info()

    print("\nSummary Statistics:")
    # TODO: Print the summary statistics of the dataset (describe)
    df.describe()

# 3. Handle Missing Data
def clean_missing(df):
    """
    Fill or remove missing values.
    """
    # 1. Fill missing 'course_title'
    if "course_title" in df.columns:
        # TODO: Fill NaNs in 'course_title' with "Unknown Course"
        df = df.fillna(value={"course_title":"Unknown Course"})
    # 2. Fill missing 'num_subscribers'
    # TODO: Fill NaNs in 'num_subscribers' with 0
    df= df.fillna(value={'num_subscribers':0})
    # 3. Drop rows with critical missing data
    # TODO: Drop rows where 'price' OR 'num_lectures' is missing (NaN)
    df = df.dropna(subset=['price','num_lectures'])
    return df

# 4. Remove Duplicates
def remove_duplicates(df):
    """
    Remove duplicated courses based on Title and Subject.
    """
    # TODO: Drop duplicate rows based on the subset ['course_title', 'subject']
    # Hint: Keep the 'first' occurrence
    df = df.drop_duplicates(subset=['course_title', 'subject'],keep='first')
    
    return df


# 5. Fix Data Types and Clean Strings
def fix_data_types(df):
    """
    Convert columns to correct types and normalize text.
    """
    # 1. Clean Strings
    # TODO: For 'course_title' and 'subject': strip whitespace and convert to Title Case
    df["course_title"] = df["course_title"].str.strip().str.title()
    df["subject"] = df["subject"].str.strip().str.title()
    # 2. Convert Numbers
    # TODO: Convert 'price' column to float type
    df = df.astype({"price":"float32"})
    # TODO: Convert 'num_subscribers' column to integer type
    df = df.astype({"num_subscribers":"int32"})
    return df

# 6. Add New Columns
def add_new_columns(df):
    """
    Create a derived metric:
    - revenue_estimate = price * num_subscribers
    """

    # TODO: Create a new column 'revenue_estimate' by multiplying 'price' and 'num_subscribers'
    df["revenue_estimate"] = df["price"]*df["num_subscribers"]
    return df

# 7. Save Cleaned Data
def save_cleaned_data(df):
    """
    Save the cleaned DataFrame to a new CSV file.
    """
    filename = "cleaned_udemy_courses.csv"

    # TODO: Save the dataframe to "cleaned_udemy_courses.csv" without the index
    df.to_csv("cleaned_udemy_courses.csv",index=False)

    print(f"\nCleaned data saved to '{filename}'")


if __name__ == "__main__":
    print("Online Course Enrollment Data Cleaner...\n")

    # 1. Load data
    df = load_data()
    if df is not None:
        print("Original Dataset Preview:")
        print(df.head())

        # 2. Inspect
        inspect_data(df)

        # 3. Clean Missing Values
        df = clean_missing(df)
        
        # 4. Remove Duplicates
        df = remove_duplicates(df)
        
        # 5. Fix Types & Strings
        df = fix_data_types(df)
        
        # 6. Add Derived Column
        df = add_new_columns(df)

        print("\nCleaned Dataset Preview:")
        print(df.head())

        # 7. Save
        save_cleaned_data(df)
