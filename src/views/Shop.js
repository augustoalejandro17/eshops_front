import * as React from 'react';
import { useParams } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import background from "assets/img/bg2.jpg";
import profile from "assets/img/faces/christian.jpg";
import { Container, Grid, CardMedia, CardContent, CardActions, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import "views/styles.css";
import Typography from '@mui/material/Typography';

import useClasses from "components/UseClasses";

var cards = [{index: 1, title: 'Card One', description: 'This is a description', image: 'https://source.unsplash.com/random'}, 
                    {index: 2, title: 'Card Two', description: 'This is a description', image: 'https://source.unsplash.com/random'}];

const Shop = (props) => {
    let params = useParams();
    const classes = useClasses(styles);
	const { ...rest } = props;
	const imageClasses = classNames(
		classes.imgRaised,
		classes.imgRoundedCircle,
		classes.imgFluid
	);
  	const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

    return( 
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
                        <CardMedia
                        component="img"
                        sx={{ width: "30%"}}
                        image={background}
                        alt="Live from space album cover"
                        />
                        <CardContent>
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
                            <Button size="small" color="info">Ver producto</Button>
                            <Button size="small" color="primary">Comprar producto</Button>
                        </CardActions>
                        </CardContent>
                    </Box>
                    </Card>
                </Grid>
            ))}
          </Grid>
        </Container>
         </div>
         
    );
}

export default Shop;

