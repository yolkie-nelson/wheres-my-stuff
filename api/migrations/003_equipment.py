steps = [
    # Step 1: Create the table
    [
        """
        -- 003__equipment.py
        CREATE TABLE equipment (
            equipment_id SERIAL PRIMARY KEY,
            model_name VARCHAR(255),
            description VARCHAR(255),
            serial_number INT,
            warehouse INT,
            date_serviced DATE,
            photo VARCHAR(255),
            equipment_type_id INT,
            FOREIGN KEY (equipment_type_id) REFERENCES equipment_type(id)
        );
        """,
        """
        -- 003_equipment.py
        DROP TABLE equipment;
        """
    ]
]
