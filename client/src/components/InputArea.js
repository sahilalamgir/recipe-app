import React, { useState } from "react";
import { Container, InputGroup, FormControl, Button, Row } from "react-bootstrap";
import { ListRecipes } from "./ListRecipes";

export const InputArea = () => {
  const [searchInput, setSearchInput] = useState("");
  const [allRecipes, setAllRecipes] = useState([]);

  const search = async () => {
    if (searchInput !== "") {
      console.log("Searching for:", searchInput);
      try {
        const response = await fetch(`http://localhost:5000/api/recipes?query=${searchInput}`, {
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
    <Container>
      <Row className="my-5">
        <h1>Search for Recipes. Instantly.</h1>
        <InputGroup className="mt-4">
          <FormControl
            type="input"
            value={searchInput}
            onKeyUp={(e) => {
                if (e.key === "Enter") {
                search();
                }
            }}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button className="btn-danger" onClick={search}>
            Search
          </Button>
        </InputGroup>
      </Row>
      {(allRecipes.length !== 0) && (
        <Row>
          <ListRecipes recipes={allRecipes} />
        </Row>
      )}
    </Container>
  );
};
