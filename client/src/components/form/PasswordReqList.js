import React from "react";

function PasswordReqList() {
  return (
    <ul>
      <li>Minst 8 karaktärer</li>
      <li>Minst en storbokstav</li>
      <li>Minst en liten bokstav</li>
      <li>Minst en siffra</li>
      <li>Minst en av specialtecken e.x ! ? @ #</li>
    </ul>
  );
}
export default PasswordReqList;
