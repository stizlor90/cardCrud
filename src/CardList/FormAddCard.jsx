import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid"; // Для создания уникальных идентификаторов
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { addFunction } from "./cardSlice";

function FormAddCard() {
  const dispatch = useDispatch();
  const [header, setHeader] = useState("");
  const [text, setText] = useState("");

  const handleAddCard = () => {
    if (header && text) {
      const newCard = {
        id: uuidv4(),
        header,
        text,
      };

  
      dispatch(addFunction(newCard));
      
     
      setHeader("");
      setText("");
    }
  };

  return (
    <Form>
      <Form.Group controlId="formHeader">
        <Form.Label>Заголовок</Form.Label>
        <Form.Control
          type="text"
          placeholder="Введите заголовок"
          value={header}
          onChange={(e) => setHeader(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formText">
        <Form.Label>Текст</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Введите текст"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" onClick={handleAddCard}>
        Добавить карточку
      </Button>
    </Form>
  );
}

export default FormAddCard;