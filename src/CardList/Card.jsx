import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { dragFunction, editCard, removeCard } from "./cardSlice";
import { Form, Button } from "react-bootstrap";

function Card({ card }) {
  const dispatch = useDispatch();
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newHeader, setNewHeader] = useState(card.header);
  const [newText, setNewText] = useState(card.text);


  function dragStartHandler(e) {
    e.dataTransfer.setData("text/plain", card.id.toString());
    setIsDragging(true);
  }

  function dragEndHandler(e) {
    e.target.style.background = "white";
    setIsDragging(false);
  }

  function dragOverHandler(e) {
    e.preventDefault();
    if (isDragging) {
      e.target.style.background = "lightgray";
    }
  }

  function dragLeaveHandler(e) {
    e.target.style.background = "white";
  }

  function dragDropHandler(e) {
    e.preventDefault();
    if (isDragging) {
      const targetCardId = e.target.getAttribute("data-card-id");
      dispatch(dragFunction({ sourceCardId: card.id, targetCardId }));
      setIsDragging(false);
    }
  }
  function handleEditClick() {
    setIsEditing(true);
  }

  function handleSaveClick() {
    dispatch(editCard({ id: card.id, newHeader, newText }));
    setIsEditing(false);
  }
  return (
   
    <div
      onDragStart={dragStartHandler}
      onDragLeave={dragLeaveHandler}
      onDragEnd={dragEndHandler}
      onDragOver={dragOverHandler}
      onDrop={dragDropHandler}
      className="card"
        data-card-id={card.id}
        draggable={true}
        style={{ marginBottom: "15px" }}
      >
        {isEditing ? (
          <Form>
            <Form.Group controlId="formHeader">
              <Form.Control
                type="text"
                value={newHeader}
                onChange={(e) => setNewHeader(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formText">
              <Form.Control
                as="textarea"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleSaveClick}>
              Сохранить
            </Button>
          </Form>
        ) : (
          <div>
            <h1>{card.header}</h1>
            <p>{card.text}</p>
            <Button onClick={handleEditClick}>Изменить</Button>{" "}
            <Button onClick={() => dispatch(removeCard(card.id))}>Удалить</Button>
          </div>
        )}
      </div>
   
  );
}

export default Card;