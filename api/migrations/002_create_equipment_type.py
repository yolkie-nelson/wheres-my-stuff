steps = [
    [
        ##Create the table
        """
        CREATE TABLE equipment_type (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL
        )
        """,
        ##Drop the table
        """
        DROP TABLE equipment_type;
        """
    ]
]
