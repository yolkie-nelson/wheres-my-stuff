import psycopg2
import csv
import os
from dotenv import load_dotenv

load_dotenv()

db_name = os.getenv("DB_NAME")
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")
db_host = os.getenv("DB_HOST")
db_port = os.getenv("DB_PORT")
# Connect to your PostgreSQL database
conn = psycopg2.connect(
    dbname=db_name,
    user=db_user,
    password=db_password,
    host=db_host,
    port=db_port,
)
cursor = conn.cursor()

# Execute your SQL query
cursor.execute("SELECT * FROM equipment")

# Fetch all the rows
rows = cursor.fetchall()

# Define the filename for your CSV file
csv_filename = "equipment.csv"

# Write the rows to a CSV file
with open(csv_filename, "w", newline="") as csv_file:
    csv_writer = csv.writer(csv_file)
    # Write the header row if needed
    csv_writer.writerow([description[0] for description in cursor.description])
    # Write the data rows
    csv_writer.writerows(rows)

# Close the database connection
conn.close()
