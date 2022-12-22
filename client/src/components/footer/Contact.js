import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Figure from "react-bootstrap/Figure";
import EvaImg from "../../assets/logo.jpeg";
import MarieImg from "../../assets/logo.jpeg";

function Contact() {
  return (
    <CardGroup style={{ width: "auto" }}>
      <Card
        border="secondary"
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <Card.Header as="h5">Ansvarig forskare </Card.Header>
        <Figure.Image
          className="rounded-circle img-thumbnail"
          width={171}
          height={180}
          alt="img"
          src={EvaImg}
        />
        <Card.Body className="text-center">
          <Card.Title>Eva</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card
        border="secondary"
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <Card.Header as="h5">Ansvarig forskare </Card.Header>
        <Figure.Image
          className="rounded-circle img-thumbnail"
          width={171}
          height={180}
          alt="171x180"
          src={MarieImg}
        />
        <Card.Body className="text-center">
          <Card.Title>Marie</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up.
          </Card.Text>
        </Card.Body>
      </Card>
    </CardGroup>
  );
}

export default Contact;
