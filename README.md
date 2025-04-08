# DS4200  Bluebike Data Analysis

## The Preparation of the Dataset

Before running the notebook, please ensure the datasets are placed **in the same directory** as the notebook file (`python.ipynb`).  
Move the following 4 files **out of the `/datasets` folder** and into the **main project directory**:

- `bluebike_data.csv`  
- `202502-bluebikes-tripdata.csv`  
- `Boston_Neighborhoods.geojson`  
- `-External-_Bluebikes_Station_List.xlsx`  

This is required to allow the notebook to load the files using relative paths.

---

## How to Run the Notebook (Required Packages)

If you're running this notebook for the first time, make sure you install the required packages.

Use the following commands in your terminal:

```bash
pip install pandas matplotlib seaborn altair geopandas folium openpyxl shapely
