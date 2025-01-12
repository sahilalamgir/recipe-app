CREATE DATABASE recipe_app;

CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE Recipes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image_url TEXT,
    time_to_cook INT,
    calories DECIMAL,
    instructions JSONB,
    spoonacular_id INT UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE Ingredients (
    id SERIAL PRIMARY KEY,
    recipe_id INT REFERENCES Recipes(id) ON DELETE CASCADE,
    ingredient JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE SavedRecipes (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(id) ON DELETE CASCADE,
    recipe_id INT REFERENCES Recipes(id) ON DELETE CASCADE,
    saved_at TIMESTAMP DEFAULT NOW()
);
