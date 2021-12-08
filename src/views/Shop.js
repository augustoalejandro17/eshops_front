import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

import { Container, Grid, CardMedia, CardActions, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import "views/styles.css";
import Typography from '@mui/material/Typography';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase.js"

import useClasses from "components/UseClasses";

const Shop = (props) => {
    const params = useParams();
    const classes = useClasses(styles);
    const [cards, setCards] = useState();
    
    useEffect(() => {
        const index = params.shopIndex;
        const queryVar = query(collection(db, "products"), where("storeOwner", "==", index));
        getDocs(queryVar).then((querySnapshot) => {
            const list = [];
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                const object = { index: doc.id, name: doc.data().name, description: doc.data().description, image: doc.data().image };
                list.push(object);
            });
            setCards(list);
            
        });
    },[params])

    return( 
        <div>
        {cards ? <Container sx={{ py: 8 }} maxWidth="lg">
        <h2 style={{display: "flex", justifyContent: "center", marginTop: "-20px"}}>Shop {params.shopIndex}</h2>

            <Grid container spacing={4} 
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
            {cards.map((card) => (
                <Grid item key={card.index} xs={12} sm={12} md={12}>  
                
                    <Card
                    sx={{ height: '100%', display: 'flex' }}
                    >
                    
                    <Box sx={{ display: 'flex', flexDirection: 'row', width: "100%" }}>
                        <CardMedia
                        component="img"
                        sx={{ width: "30%"}}
                        image={card.image}
                        alt="Live from space album cover"
                        />
                        <CardBody>
                        <Typography component="div" variant="h5">
                            {card.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        <p><b>Description:</b> {card.description} </p> 
                        
                        </Typography>
                        <CardActions style={{display: "flex", justifyContent: "center"}}>
                            <Link style={{ textDecoration: "none" }} 
                                to={`/product/${card.index}`}
                                key={card.index}
                            >
                                <Button size="small" color="info">Ver producto</Button>
                            </Link>
                            <Button size="small" color="primary">Añadir al carrito</Button>
                        </CardActions>
                        </CardBody>
                    </Box>
                    </Card>
                </Grid>
            ))}
          </Grid>
        </Container> : <div>Loading...</div>}
         </div>
         
    );
}

export default Shop;

