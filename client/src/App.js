import React, { useState } from "react";
import { InputArea } from './components/InputArea';
import { ListRecipes } from "./components/ListRecipes";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  console.log("App is rendering");
  const [searchInput, setSearchInput] = useState("");
  const [allRecipes, setAllRecipes] = useState([]);

  const search = async (query) => {
    console.log("query:", query)
    if (query) {
      console.log("Searching for:", query);
      try {
        const response = await fetch(`http://localhost:5000/api/recipes?query=${query}`, {
          headers: { "Content-Type": "application/json" }
        });
        const jsonData = await response.json();   
        console.log("retrieved:", jsonData.results);

        setAllRecipes(jsonData.results);
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  return (
    <div className="App">
      <InputArea searchInput={searchInput} setSearchInput={setSearchInput} search={search} />
      <ListRecipes recipes={allRecipes} />
    </div>
  );
}

export default App;
