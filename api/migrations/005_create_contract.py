steps = [
    [
        """
        CREATE TABLE contract (
            id SERIAL PRIMARY KEY,
            equipment_serial INT,
            job_site_name VARCHAR(225),
            start_date DATE,
            end_date DATE,
            description VARCHAR(255),
            FOREIGN KEY (equipment_serial) REFERENCES equipment(serial_number),
            FOREIGN KEY (job_site_name) REFERENCES job_site(id),
        );
        """,
        """
        DROP TABLE contract;
        """
    ]
]
