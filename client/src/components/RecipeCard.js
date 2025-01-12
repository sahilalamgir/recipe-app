import React from "react";
import { Row, Card, Col } from "react-bootstrap";

export const RecipeCard = ({ recipe }) => {
  console.log("RC rendering");
  console.log("inside rc:", recipe);
  console.log("inside rc2:", typeof recipe);
  return (
    <Card>
      <Row>
        <Col className="col-lg-4">
          <img src={recipe.image} alt="Image of recipe" />
        </Col>
        <Col className="col-lg-8 text-start">
          <h2>{recipe.title}</h2>
          <p>Ready in: {recipe.readyInMinutes} minutes</p>
          <p>Calories: {recipe.nutrition.nutrients[0].amount}</p>
        </Col>
      </Row>
    </Card>
  );
};
