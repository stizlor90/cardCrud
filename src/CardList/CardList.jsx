import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import { Row, Col } from "react-bootstrap";

function CardList() {
  const {cardList} = useSelector((store) => store.cardList);

  return (
    <Row>
      {cardList.map((card) => (
        <Col key={card.id} xs={12} sm={6} md={4} lg={3}>
          <Card card={card} />
        </Col>
      ))}
    </Row>
  );
}

export default CardList;