CREATE DATABASE recipe;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE recipes(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255)
);

CREATE TABLE saved_recipes(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    recipe_id INT REFERENCES recipes(id) ON DELETE CASCADE
);
