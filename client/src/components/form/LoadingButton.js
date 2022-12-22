import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

function LoadingButton() {
  const [isLoading, setLoading] = useState(false);

  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);

  return (
    <Button
      variant="primary"
      className="btn btn-success btn-lg mb-4 gap-3"
      style={{ width: "18rem" }}
      onClick={!isLoading ? handleClick : null}
    >
      {isLoading ? "Skickar vidare..." : " Registrera"}
    </Button>
  );
}
export default LoadingButton;
