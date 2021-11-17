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


import styles from "assets/jss/material-kit-react/views/profilePage.js";
import BackdropFilter from "react-backdrop-filter";
import "views/styles.css";
import Typography from '@mui/material/Typography';

import useClasses from "components/UseClasses";

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
            {/* <h2>Shop {params.shopIndex}</h2> */}
            {/* <Parallax
              small
              filter
            //   image={require("assets/img/faces/christian.jpg").default}
            > */}
            <Card style={{ backgroundImage: `url(${profile})` }}>
            <CardBody background >
                <div className="container">
                    <BackdropFilter
                    className="bluredContent"
                    // filter={"blur(100px) gray(50%)"}
                    html2canvasOpts={{
                        allowTaint: true
                    }}
                    onDraw={() => {
                        console.log("Rendered !");
                    }}
                    >
                        <Typography class ="text" variant="body1" >
                            I will be the leader of a company that ends up being worth
                            billions of dollars, because I got the answers...I will be the leader of a company that ends up being worth
                            billions of dollars, because I got the answers...I will be the leader of a company that ends up being worth
                            billions of dollars, because I got the answers...I will be the leader of a company that ends up being worth
                            billions of dollars, because I got the answers...I will be the leader of a company that ends up being worth
                            billions of dollars, because I got the answers...
                        </Typography>
                        {/* <form>
                        <h4>@tnargib</h4>
                        <p>Login</p>
                        <hr />
                        <p>Password</p>
                        <hr />
                        <div className="button">Sign in</div>
                        <small>Forgot password ?</small>
                        </form> */}
                    </BackdropFilter>
                </div>
            </CardBody>
                
            {/* </Parallax> */}
            </Card>
            
    
         </div>
    );
}

export default Shop;

