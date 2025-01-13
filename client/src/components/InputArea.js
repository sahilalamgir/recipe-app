import React from "react";
import { Container, InputGroup, FormControl, Button, Row } from "react-bootstrap";

export const InputArea = ({ searchInput, setSearchInput, search }) => {
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
                  search(searchInput);
                }
            }}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button className="btn-danger" onClick={() => {search(searchInput)}}>
            Search
          </Button>
        </InputGroup>
      </Row>
    </Container>
  );
};
