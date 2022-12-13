import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import Figure from 'react-bootstrap/Figure';
import EvaImg from "../../assets/logo.jpeg";
import MarieImg from "../../assets/logo.jpeg";


function Contact() {
return (
    
    <CardGroup>
    <Card style={{ alignItems: 'center', justifyContent: 'center'}}>
        <Card.Header as= "h5">Ansvarig forskare </Card.Header>
        <Figure.Image
            className='rounded-circle img-thumbnail'
            width={171}
            height={180}
            alt="img"
            src={EvaImg} 
        />    
        <Card.Body className='text-center'>
            <Card.Title >Eva</Card.Title>
            <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
            </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup>
        <Card.Body>
            <Card.Link href="#">Link</Card.Link>
        </Card.Body>
    </Card>
    
    <Card style={{ alignItems: 'center', justifyContent: 'center'}}>
    <Card.Header  as= "h5">Ansvarig forskare </Card.Header>
    <Figure.Image
        
        className='rounded-circle img-thumbnail'
        width={171}
        height={180}
        alt="171x180"
        src={MarieImg} 
    />    
    <Card.Body className='text-center'>
        <Card.Title>Marie</Card.Title>
        <Card.Text>
        Some quick example text to build on the card title and make up the
        bulk of the card's content.
        </Card.Text>
    </Card.Body>
    <ListGroup className="list-group-flush">
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
    </ListGroup>
    <Card.Body>
    </Card.Body>
    </Card>
    </CardGroup>

    );
}

export default Contact;
