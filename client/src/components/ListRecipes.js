import React from "react";
import { Container, Row, Card, Col } from "react-bootstrap";

export const ListRecipes = ({ recipes }) => {
  console.log("ListRecipes rendering");
  console.log("inside lr:", recipes);
  console.log("inside lr2:", typeof recipes);
  return (
    <Container>
      <Row>
        <Col className="col-12">
        {recipes.map( (recipe, i) => {
            return (
            <Card>
            <Row>
                <Col>
                <img src="https://via.placeholder.com/150" alt="Recipe" />
                </Col>
                <Col className="text-start">
                <h2>Sample Recipe</h2>
                <p>Semi auto mathematics</p>
                </Col>
            </Row>
            </Card>
            )
            
        })}
        </Col>
      </Row>
    </Container>
  );
};
