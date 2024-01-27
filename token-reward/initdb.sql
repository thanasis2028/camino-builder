CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    description VARCHAR,
    price FLOAT NOT NULL,
    reward FLOAT NOT NULL
);

INSERT INTO events (name, description, price, reward) VALUES ('event 1', 'dummy description 1', 10, 100E+15);
INSERT INTO events (name, description, price, reward) VALUES ('event 2', 'dummy description 2', 12, 200E+15);