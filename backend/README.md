**Implementation choices**
    Using fastAPI & uvicorn to run a local HTTP server we noticed a decrease in performance when the robots call multiple POST/PUT requests in quick succession.
    The overhead was so big that 10 robots updates done at the same times would propagate their results into the database in 5/10 seconds.

    We didn’t have enough time to improve the processing time so we used a workaround.
    The BE main.py doesn’t call any HTTP method to update the positions, instead they communicate with the database and make a direct SQL query

    The GET method doesn’t have any overhead, so the FE can use it to retrieve data whenever it needs to. 


**Libraries to install**
    •	Uvicorn: $pip install "uvicorn[standard]"
    •	Shapely: $pip install shapely
    •	FastAPI: $pip install "fastapi[all]"
    •	Psycopg2: $pip install psycopg2
    •	Matplotlib: $pip install matplotlib

**How to run the BE application**
    1.	Install all the required libraries
    2.	Go inside the folder “backend”
    3.	$uvicorn api:app-reload
    4.	Restore the database “database/database_robotion.sql”
    5.	$python main.py


Database name:
    Robotion
Table name:
    robots
Column/Type:
    model/text  [PK]
    status/text
    battery/integer
    logitude/numeric
    latitude/numeric
    x_pixel/integer
    y_pixel/integer