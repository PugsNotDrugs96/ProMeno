import React from "react";
import { Form } from "react-bootstrap";

function PasswordReqList() {
  return (
    <Form.Group
      className="col-md-5 mx-auto col-lg-5 mb-3"
      controlId="formControll"
    >
      <Form.Text>
        <ul>
          <li>Minst 8 karaktärer</li>
          <li>Minst en storbokstav</li>
          <li>Minst en liten bokstav</li>
          <li>Minst en siffra</li>
          <li>Minst en av specialtecken e.x ! ? @ #</li>
        </ul>
      </Form.Text>
    </Form.Group>
  );
}
export default PasswordReqList;
