steps = [
    [
        """
        CREATE TABLE job_site (
            id SERIAL PRIMARY KEY,
            job_name VARCHAR(255),
            job_address VARCHAR(255),
            job_poc VARCHAR(1000)
        );
        """,
        """
        DROP TABLE job_site;
        """
    ]
]
