steps = [
    [
        ##Create the table
        """
        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY,
            username VARCHAR(100) NOT NULL,
            hashed_password VARCHAR(1000) NOT NULL,
        );
        """,
        ##Drop the table
        """
        DROP TABLE accounts;
        """
    ]
]
