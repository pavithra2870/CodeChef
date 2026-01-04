import matplotlib
matplotlib.use("Agg")  # headless mode (no GUI)
import matplotlib.pyplot as plt
# 1. Load Data
def load_sales_data():
    """
    Returns lists of months and sales figures.
    """
    # TODO: 1. Create a list of strings for months (Jan, Feb, ...)
    months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"]
    # TODO: 2. Create a list of integers for sales amounts (e.g., 12000, 15000...)
    sales = [12000,30000,20000,17000,19000,23000,25000,29000,34000,19000,40000,21000]
    return months, sales
# 2. Line Plot (Trend)
def plot_sales_trend(months, sales):
    """
    Create a line chart and save it to a file.
    """
    # TODO: 3. Set the figure size to (10, 6)
    plt.figure(figsize=(10,6))
    # TODO: 4. Plot the data using plt.plot()
    plt.plot(months,sales,color="blue",marker="o",linestyle="-",linewidth=2,label="Monthly Sales")
    # Hint: Pass 'months', 'sales', color='blue', and marker='o', linestyle='-', linewidth=2
    # Important: specify label="Monthly Sales" for the legend
    # TODO: 5. Add a Title, X-axis label, and Y-axis label
    plt.title("Monthly Sales Trend")
    plt.xlabel("Month")
    plt.ylabel("Sales Amount ($)")
    # TODO: 6. Enable the grid and show the legend
    plt.grid(True)
    plt.legend()
    # TODO: 7. Save the plot as "sales_trend.png"
    filename = "sales_trend.png"
    plt.savefig(filename)
    print("Saving Line Chart as 'sales_trend.png'...")
    print(f"Chart saved: {filename}")
# 3. Bar Chart (Comparison)
def plot_sales_bar_chart(months, sales):
    """
    Create a bar chart and save it to a file.
    """
    # TODO: 8. Set the figure size to (10, 6)
    plt.figure(figsize=(10,6))
    # TODO: 9. Plot the data (bar chart)
    # Pass 'months', 'sales', and color='orange'
    # Important: specify label="Monthly Sales" for the legend
    plt.bar(months,sales,color="orange",label="Monthly Sales")
    # TODO: 10. Add a Title, X-axis label, and Y-axis label
    plt.title("Monthly Sales Comparison")
    plt.xlabel("Month")
    plt.ylabel("Sales Amount ($)")
    # TODO: 11. Enable the grid and show the legend
    plt.grid(True)
    plt.legend()
    # TODO: 12. Save the plot as "sales_bar_chart.png"
    filename = "sales_bar_chart.png"
    plt.savefig(filename)
    print("Saving Bar Chart as 'sales_bar_chart.png'...")
    print(f"Chart saved: {filename}")
if __name__ == "__main__":
    print("Monthly Sales Visualization Project\n")
    # Loading data
    months, sales = load_sales_data()
    # Plotting
    plot_sales_trend(months, sales)
    plot_sales_bar_chart(months, sales)
