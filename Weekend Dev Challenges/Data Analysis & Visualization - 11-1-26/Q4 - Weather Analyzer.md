sns replot:
- statistical relationship between two variables
- wraps Scatter Plots (kind="scatter") and Line Plots (kind="line").
- faceting: we can create grid of plots for diff categories using row and col parameters
- hue can be set by any col
- ` hue="smoker"` -> Color points by smoker status 
- `col="day"` -> Create a separate subplot for each day
- `g.fig.suptitle` -> g is a facetgrid
  
sns kdeplot:
- `fill=True` -> Shade the area under the curve
- visualize the distribution of data, similar to a histogram.
- However, instead of using bars, it uses a smooth, continuous curve to show where your data points are most concentrated.

sns displot:
- kind can be hist, kde or ecdf
- faceting supported

``` python
import pandas as pd
import seaborn as sns
import matplotlib
matplotlib.use("Agg")  # headless mode (no GUI)
import matplotlib.pyplot as plt
# 1. Load Dataset
def load_weather_data():
    """
    Load and return the weather dataset.
    """
    # TODO: Load dataset from "weather.csv"
    df = pd.read_csv("weather.csv")
    print("Dataset Preview:")
    # Show dataset first 5 rows
    df.head()
    return df
# 2. Scatter Plot: Temperature vs Humidity
def plot_temperature_vs_humidity(df):
    """
    Compare temperature vs humidity using a relational plot.
    """
    # TODO: Create a relational plot (scatter)
    # Arguments:
    # - data: the dataframe
    # - x: "temperature"
    # - y: "humidity"
    # - Color points by city
    # - This plot should be a scatter plot
    g = sns.relplot(data=df,x="temperature", y="humidity",hue="city",kind="scatter")
    # TODO: Add a Super Title (suptitle) to the Figure
    # Title: "Temperature vs Humidity"
    # Use y=1.02 to adjust vertical position
    g.fig.suptitle("Temperature vs Humidity",y=1.02)
    # TODO: Save the plot as "temp_vs_humid_scatter.png"
    # Use bbox_inches parameter to avoid cutting off title (set to 'tight')
    plt.savefig("temp_vs_humid_scatter.png",bbox_inches='tight')
    print("Chart saved: temp_vs_humid_scatter.png")
# 3. Distribution Chart: KDE Curve
def plot_temperature_kde(df):
    """
    Plot smooth temperature distributions.
    """
    # TODO: Set figure size to 10 inches by 6 inches
    plt.figure(figsize=(10,6))
    # TODO: Create a KDE plot using sns.kdeplot
    # Arguments:
    # - data: df
    # - x: "temperature"
    # - We want separate curves for each city
    # - Shade the area under the curve
    sns.kdeplot(data=df,x="temperature",hue="city",fill=True
    )
    # TODO: Add Title "Temperature Distribution (KDE)"
    plt.title("Temperature Distribution (KDE)")
    # TODO: Add grid with transparency using alpha=0.3
    plt.grid(alpha=0.3)    
    # TODO: Save plot as "temperature_kde.png"
    plt.savefig("temperature_kde.png")
    print("Chart saved: temperature_kde.png")
# 4. Faceted Distribution Plot (Side-by-Side)
def plot_faceted_distribution(df):
    """
    Create separate charts for each city side-by-side.
    """
    # TODO: Create a faceted plot using sns.displot
    # Arguments:
    # - data: df
    # - x: "temperature"
    # - We want separate charts for each city
    # - Plot should be a KDE plot
    # - Shade the area under the curve
    g = sns.displot(data=df,x="temperature",col="city",fill=True,kind="kde")
    # TODO: Add a Super Title "Faceted Temperature Distributions"
    # Use y=1.03 to adjust vertical position
    g.fig.suptitle("Faceted Temperature Distributions",y=1.03)
    # TODO: Save plot as "temperature_facets.png"
    plt.savefig("temperature_facets.png",bbox_inches="tight")
    print("Chart saved: temperature_facets.png")
if __name__ == "__main__":
    print("Weather & Climate Pattern Explorer...\n")
    # 1. Load Data
    df = load_weather_data()
    if df is not None:
        # 2. Scatter Plot
        plot_temperature_vs_humidity(df)
        # 3. KDE Plot
        plot_temperature_kde(df)
        # 4. Faceted Plot
        plot_faceted_distribution(df)
