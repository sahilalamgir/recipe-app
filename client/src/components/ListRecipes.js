import React from "react";
import { Container, Row, Card, Col } from "react-bootstrap";
import { RecipeCard } from "./RecipeCard";

export const ListRecipes = ({ recipes }) => {
  console.log("ListRecipes rendering");
  console.log("inside lr:", recipes);
  console.log("inside lr2:", typeof recipes);
  return (
    <Container>
      {recipes.map( (recipe, i) => {
        return (
          <Row key={i}>
            <RecipeCard recipe={recipe} />
          </Row>
        )  
      })}
    </Container>
  );
};
