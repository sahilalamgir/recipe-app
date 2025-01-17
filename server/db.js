require("dotenv").config({ path: "../.env" });

const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: process.env.POSTGRES_PASSWORD,
    host: "localhost",
    port: 5432,
    database: "recipe_app"
});

module.exports = pool;
