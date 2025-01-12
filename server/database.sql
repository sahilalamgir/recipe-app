CREATE DATABASE recipe;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image_url TEXT,
    time_to_cook INT,
    instructions TEXT,
    spoonacular_id INT UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE Ingredients (
    id SERIAL PRIMARY KEY,
    recipe_id INT REFERENCES Recipes(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    amount DECIMAL,
    unit VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE saved_recipes(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    recipe_id INT REFERENCES recipes(id) ON DELETE CASCADE
);
