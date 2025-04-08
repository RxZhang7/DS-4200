# DS4200  Bluebike Data Analysis

## The Preparation of the Dataset

If you want to run the notebook, please ensure the datasets are placed **in the same directory** as the notebook file (`python.ipynb`).  
Move the following 4 files **out of the `/datasets` folder** and into the **main project directory**:

- `bluebike_data.csv`  
- `202502-bluebikes-tripdata.csv`  
- `Boston_Neighborhoods.geojson`  
- `-External-_Bluebikes_Station_List.xlsx`  

This is required to allow the notebook to load the files using relative paths.

---

## Environment Setup

To install the necessary Python libraries for running this project, you have two options:

### Option 1: Using pip (Windows/macOS/Linux)

Open a terminal and run:

```bash
pip install pandas matplotlib seaborn altair geopandas folium openpyxl shapely pyproj fiona

### Option 2: Using Anaconda to create a specific env

Open a terminal and run:

```bash
conda create -n bluebikeenv python=3.10
conda activate bluebikeenv
conda install geopandas folium pandas matplotlib seaborn altair openpyxl shapely pyproj fiona -c conda-forge

