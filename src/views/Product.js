import * as React from 'react';
import { useParams } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import background from "assets/img/bg2.jpg";
import profile from "assets/img/faces/christian.jpg";
import { Container, Grid, CardMedia, CardActions, Box, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.js";

import "views/styles.css";
import Typography from '@mui/material/Typography';
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
// @material-ui/icons
import Close from "@mui/icons-material/Close";

import useClasses from "components/UseClasses";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

var cards = [{index: 1, title: 'Card One', description: 'This is a description', image: 'https://source.unsplash.com/random'}, 
                    {index: 2, title: 'Card Two', description: 'This is a description', image: 'https://source.unsplash.com/random'}];

const Product = (props) => {
    let params = useParams();
    const classes = useClasses(styles);
    const [smallModal, setSmallModal] = React.useState(false);
    const [largeModal, setLargeModal] = React.useState(false);
    return (
    <div>
        <Container sx={{ py: 8 }} maxWidth="lg">
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
                        {/* <CardActionArea> */}
                        <CardMedia
                        component="img"
                        sx={{ width: "30%"}}
                        image={background}
                        alt="Live from space album cover"
                        />
                        {/* </CardActionArea> */}
                        <CardBody>
                            <Typography component="div" variant="h5">
                                Product Name
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            <p><b>Description:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pulvinar 
                            vel nibh sit amet dignissim. Ut non vulputate purus. Etiam commodo tincidunt 
                            placerat. Cras ut lacus scelerisque, posuere mauris eget, mollis felis. Praesent 
                            volutpat congue lectus, sit amet gravida libero maximus sed. Mauris dui quam, 
                            vehicula id tellus eget, ultricies malesuada erat. Praesent porta elit eu augue 
                            accumsan condimentum. Maecenas quis velit placerat, accumsan ligula non, accumsan 
                            eros.</p> 
                            
                            </Typography>
                        <CardActions style={{display: "flex", justifyContent: "center"}}>

                            <Button size="small" color="info" onClick={() => setLargeModal(true)}>Ver</Button>
                        </CardActions>
                        </CardBody>
                    </Box>
                    
                    </Card>
                </Grid>
            ))}
          </Grid>
        </Container>
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
          <p><b>Description:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pulvinar 
                            vel nibh sit amet dignissim. Ut non vulputate purus. Etiam commodo tincidunt 
                            placerat. Cras ut lacus scelerisque, posuere mauris eget, mollis felis. Praesent 
                            volutpat congue lectus, sit amet gravida libero maximus sed. Mauris dui quam, 
                            vehicula id tellus eget, ultricies malesuada erat. Praesent porta elit eu augue 
                            accumsan condimentum. Maecenas quis velit placerat, accumsan ligula non, accumsan 
                            eros. </p>
        </DialogContent>
      </Dialog>
         </div>
  );
};  

export default Product; 