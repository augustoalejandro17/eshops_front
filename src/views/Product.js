import React, {useState, useEffect, useMemo} from 'react';
import { useParams } from "react-router-dom";
// nodejs library that concatenates classes

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import { Container, Grid, CardMedia, CardActions, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.js";

import "views/styles.css";
import Typography from '@mui/material/Typography';
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import ReactPlayer from 'react-player'
// @material-ui/icons
import Close from "@mui/icons-material/Close";
import GridContainer from "components/Grid/GridContainer.js";

import useClasses from "components/UseClasses";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.js"
import { useAuth } from "context/AuthContext"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const Product = () => {
    let { productIndex } = useParams();
    const classes = useClasses(styles);
    const [largeModal, setLargeModal] = useState(false);
    const [cards, setCards] = useState();
    const [videoUrl, setVideoUrl] = useState("");
    const { userRef } = useAuth();
    const [currentProduct, setCurrentProduct] = useState();
    const [shopOwner, setShopOwner] = useState(false);
    const productObject = useMemo(() => {
        return { index: productIndex,
                userRef: userRef,
        };
    }, [productIndex, userRef]); 

    useEffect(() => {
        const queryVar = query(collection(db, "content"), where("productOwner", "==", productObject.index));
        getDocs(queryVar).then((querySnapshot) => {
            const list = [];
            querySnapshot.forEach((doc) => {
                const object = { index: doc.id, ...doc.data()};
                list.push(object);
            });
            setCards(list);
          });
    },[productObject]);

    useEffect(() => {
        async function fetchStoreData(indexToFetch, currentUserRef){
            const queryVar = doc(db, "products", indexToFetch);
            const docSnap = await getDoc(queryVar);
            if (docSnap.exists()) {
                setCurrentProduct(docSnap.data());
                setShopOwner(currentUserRef === docSnap.data().userId);
              } else {
                console.log("No such document!");
              }
        }
        fetchStoreData(productObject.index, productObject.userRef);
    },[productObject]);

    useEffect(() => { console.log(videoUrl)}, [videoUrl]);
    return (
    <div>
        {cards ? 
        <Container sx={{ py: 8 }} maxWidth="lg">
            <h2 style={{display: "flex", justifyContent: "center", marginTop: "-20px"}}>{currentProduct ? currentProduct.name : null}</h2>
            {shopOwner ? 
                <GridContainer direction="row"
                    alignItems="center"
                    justifyContent="center" 
                    justify="center"
                >
                    <Link style={{ textDecoration: "none" }} 
                        to={`/add-content/${productObject.index}`}
                    >
                        <Button color="warning" size="md" style={{justifyContent: "center"}}>
                            Añadir contenido
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
                <Grid item key={card.index} xs={12} sm={12} md={12}>  
                    <Card
                    sx={{ height: '100%', display: 'flex' }}
                    >
                    <Box sx={{ display: 'flex', flexDirection: 'row', width: "100%" }}>
                        {/* <CardActionArea> */}
                        <CardMedia
                        component="img"
                        sx={{ width: "30%"}}
                        image={card.image}
                        alt="Live from space album cover"
                        />
                        {/* </CardActionArea> */}
                        <CardBody>
                            <Typography component="div" variant="h5">
                                {card.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            <p><b>Description:</b> {card.description} </p> 
                            
                            </Typography>
                        <CardActions style={{display: "flex", justifyContent: "center"}}>

                            <Button value={card.videoUrl} size="small" color="info" onClick={ e => {setLargeModal(true); setVideoUrl(e.target.value); console.log(e.target.url)}}>Ver</Button>
                        </CardActions>
                        </CardBody>
                    </Box>
                    
                    </Card>
                </Grid>
            ))}
          </Grid>
        </Container> : <div>Loading...</div>}
        <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal + " " + classes.modalLarge
        }}
        open={largeModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setLargeModal(false)}
        aria-labelledby="large-modal-slide-title"
        aria-describedby="large-modal-slide-description"
      >
        <DialogTitle
          id="large-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <Button
            simple
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            onClick={() => setLargeModal(false)}
          >
            {" "}
            <Close className={classes.modalClose} />
          </Button>
          <h4 className={classes.modalTitle}>Large modal</h4>
        </DialogTitle>
        <DialogContent
          id="large-modal-slide-description"
          className={classes.modalBody}
        >
            <ReactPlayer width="550px" height="360px"  controls url={videoUrl} />
        </DialogContent>
        </Dialog>
    </div>
  );
};  

export default Product; 