steps = [
    [
        """
        CREATE TABLE equipment (
            equipment_id SERIAL PRIMARY KEY,
            model_name VARCHAR(255),
            description VARCHAR(255),
            serial_number INT,
            storage_site_id INT,
            date_serviced DATE,
            photo VARCHAR(255),
            equipment_type_id INT,
            FOREIGN KEY (equipment_type_id) REFERENCES equipment_type(id),
            FOREIGN KEY (storage_site_id) REFERENCES storage_site(id)
        );
        """,
        """
        DROP TABLE equipment;
        """
    ]
]