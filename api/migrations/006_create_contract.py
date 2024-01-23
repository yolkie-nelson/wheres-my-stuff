steps = [
    [
        """
        CREATE TABLE contract (
            id SERIAL PRIMARY KEY,
            equipment_id INT,
            job_site_id INT,
            start_date DATE,
            end_date DATE,
            description VARCHAR(255),
            FOREIGN KEY (equipment_id) REFERENCES equipment(equipment_id),
            FOREIGN KEY (job_site_id) REFERENCES job_site(id)
        );
        """,
        """
        DROP TABLE contract;
        """,
    ]
]
