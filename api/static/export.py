import psycopg2
import os
from dotenv import load_dotenv
import pandas as pd

load_dotenv()

db_name = os.getenv("DB_NAME")
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")
db_host = os.getenv("DB_HOST")
db_port = os.getenv("DB_PORT")


# Connect to your PostgreSQL database
def export_csv():
    conn = psycopg2.connect(
        dbname=db_name,
        user=db_user,
        password=db_password,
        host=db_host,
        port=db_port,
    )

    # Execute your SQL query
    query = "SELECT * FROM equipment"

    data_frame = pd.read_sql_query(query, conn)

    # Define the filename for your CSV file
    csv_filename = "equipment_panda.csv"

    data_frame.to_csv(csv_filename, index=False)
    # Close the database connection
    conn.close()
