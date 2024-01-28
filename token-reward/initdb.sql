CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    description VARCHAR,
    date VARCHAR NOT NULL,
    price FLOAT NOT NULL,
    reward VARCHAR NOT NULL
);

INSERT INTO events (name, description, date, price, reward) VALUES ('Clean the Beach', 'dummy description 1', '2024-03-01 18:00' 10, '10000000000000000000');
INSERT INTO events (name, description, date, price, reward) VALUES ('Replant Trees', 'dummy description 2', '2024-03-02 18:00', 12, '20000000000000000000');