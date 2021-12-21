import React, {useEffect, useState, useMemo} from 'react';
import { useParams } from "react-router-dom";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

import GridContainer from "components/Grid/GridContainer.js";

import { Container, Grid, CardMedia, CardActions, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import "views/styles.css";
import Typography from '@mui/material/Typography';
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.js"
import { useAuth } from "context/AuthContext"
import NotLoggedInBar from 'components/NotLoggedInBar';

const ShopNotLoggedIn = () => {

    const { shopIndex } = useParams();
    const { userRef} = useAuth();
    const [cards, setCards] = useState();
    const [currentShop, setCurrentShop] = useState();

    const shopObject = useMemo(() => {
        return { index: shopIndex
        };
    }, [shopIndex]); 


    useEffect(() => {
        const queryVar = query(collection(db, "products"), where("shopId", "==", shopObject.index));
        getDocs(queryVar).then((querySnapshot) => {
            const list = [];
            querySnapshot.forEach((doc) => {
                const object = { id: doc.id, name: doc.data().name, description: doc.data().description, image: doc.data().image, price: doc.data().price, userId: doc.data().userId };
                list.push(object);
            });
            setCards(list);
            
        });
    },[shopObject]);

    useEffect(() => {
        async function fetchStoreData(indexToFetch){
            const queryVar = doc(db, "shops", indexToFetch);
            const docSnap = await getDoc(queryVar);
            if (docSnap.exists()) {
                setCurrentShop(docSnap.data());
            } else {
                console.log("No such document!");
            }
        }
        fetchStoreData(shopObject.index);
    },[shopObject]);

    return( 
        <NotLoggedInBar>
        {cards ? 
        <Container sx={{ py: 8, marginTop: "35px" }} maxWidth="lg">
            <h2 style={{display: "flex", justifyContent: "center", marginTop: "-20px"}}>{currentShop ? currentShop.name : null}</h2>
            
            <Grid container spacing={4} 
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                {cards.map((card) => (
                    <Grid item key={card.id} xs={12} sm={12} md={12}>  
                    
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
                                { true ?
                                    <Link style={{ textDecoration: "none" }} 
                                        to={`/`}
                                        key={card.id}
                                    >
                                        <Button color="info">Ver producto</Button>
                                    </Link> : null
                                }
    
                            </CardActions>
                            </CardBody>
                        </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container> 
        : <div>Loading...</div>}
        </NotLoggedInBar>
    );
}

export default ShopNotLoggedIn;

