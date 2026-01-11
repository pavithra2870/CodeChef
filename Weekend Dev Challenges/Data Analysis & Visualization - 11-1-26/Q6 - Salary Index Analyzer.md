- kdeplot cant make plots for each col, it can only make use of hue to show different cols differently in same plot
- axes level plots are those that dont support faceting. they just return axes of a plot `matplotlib.Axes`
- figure level plots support faceting. they return multiple plots `sns.FacetGrid`
- alpha controls transparency. less means transparent
- `fig = plt.figure(figsize=(10,6))` if u follow this with ur plt codes, u r good to go. else ur plt wont save in fig

# Figure Level Plots:
| Module | Function | Default Plot Type |
| --- | --- | --- |
| **Relational** | `sns.relplot()` | Scatter plot |
| **Distribution** | `sns.displot()` | Histogram |
| **Categorical** | `sns.catplot()` | Strip plot |
- compare categories side by side in diff sub plots
- they support faceting and have row= and col= options to decide based on which col we create new subplots

# Axes-level Plots:
| Type | Axes-level Functions |
| --- | --- |
| **Relational** | `scatterplot()`, `lineplot()` |
| **Distribution** | `histplot()`, `kdeplot()`, `ecdfplot()`, `rugplot()` |
| **Categorical** | `barplot()`, `boxplot()`, `violinplot()`, `stripplot()` |
- When you want to layer multiple plots on top of each other

| Feature | Figure-level (`displot`, `relplot`) | Axes-level (`histplot`, `scatterplot`) |
| --- | --- | --- |
| **Subplots** | Supports `col` and `row` | Does **not** support `col` or `row` |
| **Legend** | Placed **outside** the plot | Placed **inside** the plot |
| **Title** | Use `g.fig.suptitle()` | Use `plt.title()` or `ax.set_title()` |
| **Size** | Controlled by `height` and `aspect` | Controlled by `plt.figure(figsize=...)` |

* If you need **multiple side-by-side boxes**, use **Figure-level** (`relplot`, `displot`, `catplot`).
* If you are making a **single chart** and want fine-tuned control over the axis, use **Axes-level** (`scatterplot`, `kdeplot`, etc.).

``` python
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import matplotlib
matplotlib.use("Agg")  # Headless mode for saving files
# 1. Bar Chart - Compare Avg Salary by Country (Side-by-Side Bars)
def plot_salary_comparison(df):
    """
    Create a side-by-side bar chart comparing onsite vs remote salaries.
    Using MELT to reshape data for plotting.
    """
    print("Plotting Salary Comparison...")
    # TODO: Melt the dataframe to make it "Long Format"
    # We need to reshape the data so Seaborn can plot side-by-side bars.
    # Requirements:
    # 1. Keep "country" as the identifier (id_vars)
    # 2. Unpivot "salary_remote" and "salary_onsite" (value_vars)
    # 3. Name the new category column: "salary_type"
    # 4. Name the new value column: "amount"
    df_long = df.melt(id_vars="country",value_vars=["salary_remote","salary_onsite"],var_name="salary_type",value_name="amount")
    # LEARNING POINT: Print the first 5 rows to check the structure
    print("Melted DataFrame Preview:")
    print(df_long.head())
    # TODO: Set figure size to 12 inches by 6 inches
    plt.figure(figsize=(12,6))
    # TODO: Create a Seaborn Barplot
    # - data: df_long
    # - x: country
    # - y: amount
    # - Creates the side-by-side bars using salary_type (Explore the 'hue' parameter)
    # - palette: ["#e74c3c", "#2c3e50"]
    # - Disable error bars
    sns.barplot(data=df_long,x="country",y="amount",hue="salary_type",palette=["#e74c3c", "#2c3e50"]
    )
    # TODO: Add Title "Average Salary Comparison: Remote vs Onsite"
    plt.title("Average Salary Comparison: Remote vs Onsite")
    # TODO: Add X-label "Country" and Y-label "Avg Salary (USD)"
    plt.xlabel("Country")
    plt.ylabel("Avg Salary (USD)")
    # TODO: Add grid only on Y-axis with transparency (alpha=0.3)
    plt.grid(axis="y",alpha=0.3)
    # TODO: Save the plot as "salary_comparison.png"
    # Use bbox_inches='tight' to avoid cutting off labels
    plt.savefig("salary_comparison.png",bbox_inches='tight')
    print("Chart saved: salary_comparison.png")
    # Returning the melted dataframe
    return df_long
# 2. Scatter Plot - Multi-variable
def plot_salary_vs_experience(df):
    """
    Scatter plot with semantic mapping:
    - X: Experience
    - Y: Remote Salary
    - Bubble Size should represent Remote Ratio (Bigger bubble = higher remote usage)
    """
    print("Plotting Salary vs Experience...")
    # TODO: Set figure size to 10 inches by 6 inches
    fig = plt.figure(figsize=(10,6))
    # TODO: Create a Scatter Plot using plt.scatter()
    # - x: experience_years
    # - y: salary_remote
    # - Bubble Size should represent remote_ratio (scale it by multiplying by 5 for visibility)
    # - alpha: 0.7
    # - edgecolors: "black"
    plt.scatter(x=df["experience_years"],y=df["salary_remote"],s=df["remote_ratio"]*5,alpha=0.7,edgecolors="black"
    )
    # TODO: Add Title "Experience vs Remote Salary (Size = Remote Ratio)"
    plt.title("Experience vs Remote Salary (Size = Remote Ratio)")
    # TODO: Add X-label "Years of Experience"
    plt.xlabel("Years of Experience")
    # TODO: Add Y-label "Remote Salary (USD)"
    plt.ylabel("Remote Salary (USD)")
    # TODO: Add grid with transparency using alpha=0.3
    plt.grid(alpha=0.3)
    # TODO: Save the plot as "salary_experience_scatter.png"
    # Use bbox_inches parameter to avoid cutting off title (set to 'tight')
    plt.savefig("salary_experience_scatter.png",bbox_inches="tight")
    print("Chart saved: salary_experience_scatter.png")
    return fig
# 3. KDE Plot - Distribution Analysis
def plot_salary_kde(df):
    """
    Plot KDE density estimate showing salary distribution across roles.
    """
    print("Plotting Salary Density (KDE)...")
    # TODO: Set figure size to 10 inches by 6 inches
    fig = plt.figure(figsize=(10,6))
    # TODO: Create a KDE Plot using sns.kdeplot()
    # - data: df
    # - x: salary_onsite
    # - We want separate curves for each role
    # - Shade the area under the curve
    # - alpha: 0.4
    sns.kdeplot(data=df, x="salary_onsite",hue="job_role", fill=True, alpha=0.4)
    # TODO: Add Title "Salary Distribution by Job Role (KDE)"
    plt.title("Salary Distribution by Job Role (KDE)")
    # TODO: Add X-label "Onsite Salary (USD)"
    plt.xlabel("Onsite Salary (USD)")
    # TODO: Add grid with transparency using alpha=0.3
    plt.grid(alpha=0.3)
    # TODO: Save the plot as "salary_kde.png"
    # Use bbox_inches parameter to avoid cutting off title (set to 'tight')
    plt.savefig("salary_kde.png",bbox_inches='tight')
    print("Chart saved: salary_kde.png")
    return fig
# 4. Faceted Plot - Role Trends
def plot_faceted_relplot(df):
    """
    Multiple scatter plot using figure-level relplot.
    Faceted by Job Role.
    """
    print("Plotting Faceted Role Trends...")
    # TODO: Create a Relational Plot (relplot)
    # - data: df
    # - x: experience_years
    # - y: salary_onsite
    # - Color points by country
    # - Create a separate chart for each Job Role
    # - This plot should be of scatter kind
    g = sns.relplot(data=df,x="experience_years",y="salary_onsite",hue="country",col="job_role",kind="scatter")
    # TODO: Add a Super Title (suptitle) to the Figure
    # Title: "Global Salary Trends by Role & Experience"
    # Use y=1.03 to adjust vertical position
    g.fig.suptitle("Global Salary Trends by Role & Experience",y=1.03)
    # TODO: Save the plot as "faceted_salary_roles.png"
    # Use bbox_inches parameter to avoid cutting off title (set to 'tight')
    plt.savefig("faceted_salary_roles.png",bbox_inches='tight')
    print("Chart saved: faceted_salary_roles.png")
    return g
if __name__ == "__main__":
    print("Global Salary Index Analyzer Project...\n")
    path = "global_salaries.csv"
    try:
        df = pd.read_csv(path)
    except FileNotFoundError:
        print(f"Error: {path} not found.")
        df = None
    if df is not None:
        plot_salary_comparison(df)
        plot_salary_vs_experience(df)
        plot_salary_kde(df)
        plot_faceted_relplot(df)
