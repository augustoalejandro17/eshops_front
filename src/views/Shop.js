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


const Shop = () => {

    const { shopIndex } = useParams();
    const { userRef, userPermissions } = useAuth();
    const { addItemToCart } = useAuth();
    const [cards, setCards] = useState();
    const [currentShop, setCurrentShop] = useState();
    const [isShopOwner, setIsShopOwner] = useState(false);
    const [shopOwner, setShopOwner] = useState("");
    const [permissions, setPermissions] = useState(null);
    
    const shopObject = useMemo(() => {
        return { index: shopIndex,
                 userRef: userRef,
        };
    }, [shopIndex, userRef]); 

    useEffect(() => {
        if(userPermissions) {
            setPermissions(userPermissions.productsAllowed);
        }
    },[userPermissions]);

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
        async function fetchStoreData(indexToFetch, currentUserRef){
            const queryVar = doc(db, "shops", indexToFetch);
            const docSnap = await getDoc(queryVar);
            if (docSnap.exists()) {
                setCurrentShop(docSnap.data());
                setIsShopOwner(currentUserRef === docSnap.data().userId);
                setShopOwner(docSnap.data().userId);
            } else {
                console.log("No such document!");
            }
        }
        fetchStoreData(shopObject.index, shopObject.userRef);
    },[shopObject]);

    const showButton = (type, productIndex) => {
        if(permissions){
            switch(type) {
                case "showProduct":
                    return (permissions.includes(productIndex) || isShopOwner) ? true : false;
                case "addToCart":
                    return (permissions.includes(productIndex) || isShopOwner) ? false : true;
                default:
                    return false;
            }
        }
    };
    return( 
        <div>
        {cards ? 
        <Container sx={{ py: 8 }} maxWidth="lg">
            <h2 style={{display: "flex", justifyContent: "center", marginTop: "-20px"}}>{currentShop ? currentShop.name : null}</h2>
            {isShopOwner ? 
                <GridContainer direction="row"
                    alignItems="center"
                    justifyContent="center" 
                    justify="center"
                >
                    <Link style={{ textDecoration: "none" }} 
                        to={`/add-product/${shopObject.index}`}
                    >
                        <Button color="warning" style={{justifyContent: "center"}}>
                            Añadir productos
                        </Button>

                    </Link>
							
                </GridContainer>
                : null
            }
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
                            sx={{ width: "30%", height: '178px'}}
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
                                { showButton("showProduct", card.id) ?
                                    <Link style={{ textDecoration: "none" }} 
                                        to={`/product/${card.id}`}
                                        key={card.id}
                                    >
                                        <Button color="info">Ver producto</Button>
                                    </Link> : null
                                }
                                { showButton("addToCart", card.id) ?
                                    <Button onClick={() => { addItemToCart(card);}} color="primary">Añadir al carrito</Button>
                                    :null
                                }
                            </CardActions>
                            </CardBody>
                        </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Link style={{ textDecoration: "none" }} 
                to={`/profile/${shopOwner}`}
            >
                <Button color="warning" style={{justifyContent: "center"}}>
                    Contactar al vendedor
                </Button>

            </Link>
        </Container> 
        : <div>Loading...</div>}
        </div>
    );
}

export default Shop;

