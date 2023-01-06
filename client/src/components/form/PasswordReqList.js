import React from "react";
import { Form } from "react-bootstrap";

function PasswordReqList() {
  return (
    <Form.Group
      className="col-sm-7 col-10 mx-auto mt-3 mb-3"
      controlId="formControll"
    >
      <Form.Text>
        <p>
          <i>
            Lösenordet måste innehålla minst 8 karaktärer, minst en stor
            bokstav, minst en liten bokstav, minst en siffra och minst ett
            specialtecken
          </i>
        </p>
      </Form.Text>
    </Form.Group>
  );
}
export default PasswordReqList;
