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

// Get all recipes (later get from db first, or maybe not for this one)
app.get("/api/recipes", async (req, res) => {
    try {
        const searchTerm = req.body.food;
        console.log(searchTerm);

        const recipeParameters = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY
            }
        };

        const response = await fetch("https://api.spoonacular.com/recipes/complexSearch?" + new URLSearchParams({
            query: searchTerm,
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

// Get recipe (later get from db first)
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
        console.error(err.message);
    };
});

// Post saved recipe (later get from db first??? idk)
app.post("/api/recipes/save", async (req, res) => {
    try {
        const recipeInfo = req.body;
        console.log(recipeInfo, typeof recipeInfo);

        const addRec = await pool.query("INSERT INTO Recipes (title, image_url, time_to_cook, calories, instructions, spoonacular_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", 
            [recipeInfo.title, recipeInfo.image_url, recipeInfo.time_to_cook, recipeInfo.calories, JSON.stringify(recipeInfo.instructions), recipeInfo.spoonacular_id]);
        
        const recipeId = addRec.rows[0].id;
        
        for (let ingredient of recipeInfo.ingredients) {
            const addIng = await pool.query("INSERT INTO Ingredients (recipe_id, ingredient) VALUES ($1, $2) RETURNING *", 
                [recipeId, ingredient]);
        }
        
        const addSavRec = await pool.query("INSERT INTO SavedRecipes (user_id, recipe_id) VALUES ($1, $2) RETURNING *", 
            [recipeInfo.user_id, recipeId]);

        res.json(addSavRec);
    } catch (err) {
        console.error(err.message);
    };
});

// // Get all saved recipes
// app.get("/api/recipes/saved", async (req, res) => {
//     try {
//         const response = await pool.query("SELECT * FROM SavedRecipes;");
        
//         res.json(response);
//     } catch (err) {
//         console.error(err.message);
//     };
// });


// // Delete saved recipe
// app.delete("/api/recipes/saved/:id", async (req, res) => {
//     try {
//         const savedId = req.params.id;
//         const delRec = await pool.query("DELETE FROM SavedRecipes WHERE id = $1 RETURNING *", [savedId]);
//         res.json(delRec);
//     } catch (err) {
//         console.error(err.message);
//     }
// });

app.listen(5000, () => {
    console.log("Server has started on port 5000");
});
