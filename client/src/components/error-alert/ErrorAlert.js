import React from "react";
import { Container, Alert } from "react-bootstrap";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

function ErrorAlert(props) {
  const { type } = props;
  const emptyType =
    type === "article" ? "Den här artikeln" : "De här kategorierna";

  return (
    <Container className="postContainer py-4">
      <div className="text-center mt-5">
        <Alert
          variant="light"
          style={{
            background: "transparent",
            border: "none",
            fontSize: "15pt",
          }}
        >
          <SentimentVeryDissatisfiedIcon fontSize="large" />
          <h2>{emptyType} kunde inte hittas</h2>
          <p>{emptyType} som du letar efter kan tyvärr inte hittas.</p>
          <p>Testa att ladda om sidan eller kontakta vår support</p>
        </Alert>
      </div>
    </Container>
  );
}

export default ErrorAlert;
