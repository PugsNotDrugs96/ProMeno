import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Figure from 'react-bootstrap/Figure';
import EvaImg from "../../assets/eva.jpg";
import MarieImg from "../../assets/marie.jpg";

function Contact() {
return (
    <CardGroup style={{}}>
        <Card border="secondary" style={{alignItems: "center", justifyContent: "center"}}>
            <Card.Header as="h5">Ansvarig forskare </Card.Header>
            <Figure.Image
                className='rounded-circle img-thumbnail'
                width={145}
                height={164}
                alt="img"
                src={EvaImg} 
            />    
            <Card.Body >
                <Card.Title className='text-center'>Eva Elmerstig</Card.Title>
                <Card.Text>
                <small>&#x2022; Medicine doktor och docent i hälsa och samhälle inriktning sexologi vid Malmö universitet.<br/>
                &#x2022; Kombinerar forskning och undervisning kring sexuell och reproduktiv hälsa med kliniskt arbete som sexolog.<br/>
                &#x2022; Barnmorska och sexolog i grunden.</small>
                </Card.Text>
            </Card.Body>
        </Card>
        <Card border="secondary" style={{ alignItems: 'center', justifyContent: 'center'}}>
            <Card.Header as= "h5">Ansvarig forskare </Card.Header>
            <Figure.Image
                className='rounded-circle img-thumbnail'
                width={140}
                height={164}
                alt="171x180"
                src={MarieImg} 
            />    
            <Card.Body >
                <Card.Title className='text-center'>Marie Karlsson</Card.Title>
                <Card.Text>
                <small>&#x2022; Disputerat i klinisk psykologi och är legitimerad psykolog och psykoterapeut.<br/>
                &#x2022; Har framförallt jobbat med evidensbaserade psykologiska behandlingsmodeller, vilket mestadels innebär kognitivbeteende terapi (KBT)<br/>
                &#x2022; Jobbar som lektor på Malmö universitet.</small>
                </Card.Text>
            </Card.Body>
        </Card>
    </CardGroup>

    );
}

export default Contact;
