const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

require("dotenv").config({ path: "../.env" });

const API_KEY = process.env.SPOONACULAR_API_KEY;

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Get all recipes
app.get("/api/recipes", async (req, res) => {
    try {
        const reqFood = req.body.food;
        console.log(reqFood);

        const recipeParameters = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY
            }
        };

        const response = await fetch("https://api.spoonacular.com/recipes/complexSearch?" + new URLSearchParams({
            query: reqFood,
            fillIngredients: true,
            addRecipeInstructions: true,
            addRecipeNutrition: true
        }).toString(), recipeParameters)
            .then(result => result.json())

        // const newRes = await pool.query("INSERT INTO users (name) VALUES($1) RETURNING *", [query]);
        
        res.json(response);
    } catch (err) {
        console.error(err.message);
    };
});

// Get recipe
app.get("/api/recipes/:id", async (req, res) => {
    try {
        const reqId = req.params.id;
        console.log(reqId, typeof reqId);

        const recipeParameters = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY
            }
        };
        
        const response = await fetch(`https://api.spoonacular.com/recipes/${reqId}/information?${
            new URLSearchParams({includeNutrition: true}).toString()
        }`, recipeParameters)
            .then(result => result.json())

        // const newRes = await pool.query("INSERT INTO users (name) VALUES($1) RETURNING *", [query]);
        
        res.json(response);
    } catch (err) {
        console.error(err);
    };
});

app.listen(5000, () => {
    console.log("Server has started on port 5000");
});
