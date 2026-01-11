- `df.to_numpy()` changes df into numpy
- median imputation: `df["Quantity"] = df["Quantity"].fillna(df["Quantity"].median())`
- `max_values = np.max(matrix,axis=0)` to find max of df col wise. for row wise, axis=1
- `${max_values[0]:.2f}` to round off to 2 decimal points
-  `df["Total_Amount"].sum() ` find sum of series
- `.groupby("Category")["Value"].sum()` to find best or top in a category. only after this `idxmax()` shud be used  
- no of rows: df.shape[0]
``` python
import pandas as pd
import numpy as np
# 1. Load Dataset
def load_sales_data():
    """
    Load and return the raw sales dataset.
    """
    # TODO: Load "retail_store_sales.csv"
    path = "retail_store_sales.csv"
    try:
        df = pd.read_csv(path)
        print("Dataset Preview:")
        # Print the first 5 rows of the dataframe
        print(df.head())
        return df
    except FileNotFoundError:
        print(f"Error: {path} not found.")
        return None
# 2. Clean Data (Handle Missing Values)
def clean_data(df):
    """
    Clean missing values and remove invalid rows.
    """
    print("Cleaning Data:")
    # Calculate initial rows 
    initial_rows = df.shape[0]
    # TODO: Drop rows where "Customer_ID" is missing (NaN)
    # Important: Use .copy() at the end to avoid SettingWithCopyWarning 
    df = df.dropna(subset=["Customer_ID"])
    # TODO: Fill missing "Quantity" with its median value
    df["Quantity"] = df["Quantity"].fillna(df["Quantity"].median())
    # TODO: Fill missing "Price_Per_Unit" with its median value
    df["Price_Per_Unit"] = df["Price_Per_Unit"].fillna(df["Price_Per_Unit"].median())
    # Calculate total rows dropped
    dropped_count = initial_rows-df.shape[0]
    print(f"Rows dropped (Missing ID): {dropped_count}")
    print("Missing values in Price/Quantity filled with Median.\n")
    return df
# 3. Feature Engineering
def add_total_price(df):
    """
    Add new column: Total Purchase Amount = Price x Quantity
    """
    # TODO: Create a new column "Total_Amount" by multiplying Price and Quantity
    df["Total_Amount"] = df["Quantity"]*df["Price_Per_Unit"]
    print("Added 'Total_Amount' column.\n")
    return df
# 4. NumPy Matrix Operations
def perform_numpy_analysis(df):
    """
    Convert numeric data to NumPy matrix and perform axis-based aggregations.
    """
    print("NumPy Matrix Analysis:")
    # Numerical features
    num_cols = df[["Price_Per_Unit", "Quantity", "Total_Amount"]]
    # TODO: Convert the dataframe 'num_cols' to a NumPy array
    matrix = num_cols.to_numpy()
    # Print shape of the matrix
    print(f"Matrix Shape: {matrix.shape}")
    # TODO: Calculate MAX and MEAN column-wise
    max_values = np.max(matrix,axis=0)
    mean_values = np.mean(matrix,axis=0)
    # Print the max price of items upto 2 decimal places
    print(f"Max Price: ${max_values[0]:.2f}")
    # Print the max quantity in one order 
    print(f"Max Quantity in one order:{int(max_values[1])}")
    # Print the max total order value upto 2 decimal places
    print(f"Max Total Order Value: ${max_values[2]:.2f}")
    # Print the average order value upto 2 decimal places
    print(f"Avg Order Value: ${mean_values[2]:.2f}\n")
    return matrix
# 5. Customer Insights 
def analyze_statistics(df):
    """
    Generate purchase insights using GroupBy.
    """
    print("Customer Insights:")
    # Find total revenue of the store
    total_revenue = df["Total_Amount"].sum()
    # Find average amount spent per order
    avg_spent = df["Total_Amount"].mean()
    # TODO: Find the Customer_ID with the highest sum of "Total_Amount"
    best_customer = df.groupby("Customer_ID")["Total_Amount"].sum().idxmax()
    # TODO: Find the Item name with the highest sum of "Quantity"
    top_item = df.groupby("Item")["Quantity"].sum().idxmax()
    # Print total revenue upto 2 decimal places
    print(f"Total Store Revenue: ${total_revenue:.2f}")

    # Print average spent upto 2 decimal places
    print(f"Average Order Value: ${avg_spent:.2f}")

    # Print best customer
    print(f"Top Spending Customer: {best_customer}")

    # Print most popular item
    print(f"Most Popular Item: {top_item}\n")

    return {
        "total_revenue": total_revenue,
        "avg_spent": avg_spent,
        "best_customer": best_customer,
        "top_item": top_item
    }
if __name__ == "__main__":
    print("Customer Purchase Insights...\n")
    # 1. Load
    df = load_sales_data()
    if df is not None:
        # 2. Clean
        df = clean_data(df)
        # 3. Feature Engineering
        df = add_total_price(df)
        # 4. NumPy Analysis (Axis-based stats)
        perform_numpy_analysis(df)
        # 5. Business Insights
        analyze_statistics(df) 
