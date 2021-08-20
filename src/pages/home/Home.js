import React from 'react';
import { Card, Button } from 'react-bootstrap';
import farmer from "c:/Users/Santiago/Desktop/React - Farm/react-farm/src/assets/images/farmer.jpg";

 const Home  =()=> {
     const cardInfo = [{image:{farmer}, title:"Animales",text:"Cree y administre los animales de su granja"},
                        {image:{farmer}, title:"Fincas",text:"Cree y administre fincas "},
                        {image:{farmer}, title:"Empleados",text:"Cree usuarios nuevos"},
                        {image:{farmer}, title:"Grupo",text:"Cree y administre grupo de animales"},
                        {image:{farmer}, title:"Inventario",text:"Cree y administre inventario de su granja"}
    ];
    const renderCard = (card,index) =>{
        return(
        <Card bg="info" style={{ width: '18rem' }}key={index}>
        <Card.Img variant="top" src={card.image}/>
        <Card.Body>
            <Card.Title>{card.title}</Card.Title>
            <Card.Text>{card.text}</Card.Text>
            <Button variant="primary">Add</Button>
        </Card.Body>
    </Card>
        );
    };
        return (
            <div>
                {cardInfo.map(renderCard)}                
            </div>
        )
    
}

export default Home;
