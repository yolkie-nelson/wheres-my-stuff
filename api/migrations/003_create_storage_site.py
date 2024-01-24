steps = [
    [
        # Create the table
        """
        CREATE TABLE storage_site (
            id SERIAL PRIMARY KEY,
            warehouse_number INT,
            location_address VARCHAR(255),
            point_of_contact VARCHAR(255)
        )
        """,
        # Drop the table
        """
        DROP TABLE storage_site;
        """
    ]
]
