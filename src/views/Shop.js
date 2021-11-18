import * as React from 'react';
import { useParams } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
// @material-ui/icons

import Parallax from "components/Parallax/Parallax.js";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import background from "assets/img/bg2.jpg";
import profile from "assets/img/faces/christian.jpg";
import { Container, Grid, CardMedia, CardContent, CardActions, Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import BackdropFilter from "react-backdrop-filter";
import "views/styles.css";
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

import useClasses from "components/UseClasses";

var cards = [{index: 1, title: 'Card One', description: 'This is a description', image: 'https://source.unsplash.com/random'}, 
                    {index: 2, title: 'Card Two', description: 'This is a description', image: 'https://source.unsplash.com/random'},      
                    {index: 3, title: 'Card Three', description: 'This is a description', image: 'https://source.unsplash.com/random'},
                    {index: 4, title: 'Card Four', description: 'This is a description', image: 'https://source.unsplash.com/random'},
                    {index: 5, title: 'Card Five', description: 'This is a description', image: 'https://source.unsplash.com/random'},
                    {index: 6, title: 'Card Six', description: 'This is a description', image: 'https://source.unsplash.com/random'},
                    {index: 7, title: 'Card Seven', description: 'This is a description', image: 'https://source.unsplash.com/random'},    
                    {index: 8, title: 'Card Eight', description: 'This is a description', image: 'https://source.unsplash.com/random'},
                    {index: 9, title: 'Card Nine', description: 'This is a description', image: 'https://source.unsplash.com/random'}];

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
            <h2 style={{display: "flex", justifyContent: "center"}}>Shop {params.shopIndex}</h2>
        <Container sx={{ py: 8 }} maxWidth="lg">
            <Grid container spacing={4} 
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
            {cards.map((card) => (
                <Grid item key={card.index} xs={12} sm={6} md={4}>  
                
                    <Card
                    sx={{ height: '100%', display: 'flex' }}
                    >
                    
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <CardMedia
                        component="img"
                        sx={{ width: "30%"}}
                        image={profile}
                        alt="Live from space album cover"
                        />
                        <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                            Live From Space
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            Mac Miller
                        </Typography>
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

