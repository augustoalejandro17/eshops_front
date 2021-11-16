import * as React from 'react';
import { useParams } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
// @material-ui/icons
import Camera from "@mui/icons-material/Camera";
import Palette from "@mui/icons-material/Palette";
import Favorite from "@mui/icons-material/Favorite";
// core components
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";
import Grid from "@mui/material/Grid";
import { Box } from '@mui/system';
import profile from "assets/img/faces/christian.jpg";

import studio1 from "assets/img/examples/studio-1.jpg";
import studio2 from "assets/img/examples/studio-2.jpg";
import studio3 from "assets/img/examples/studio-3.jpg";
import studio4 from "assets/img/examples/studio-4.jpg";
import studio5 from "assets/img/examples/studio-5.jpg";
import work1 from "assets/img/examples/olu-eletu.jpg";
import work2 from "assets/img/examples/clem-onojeghuo.jpg";
import work3 from "assets/img/examples/cynthia-del-rio.jpg";
import work4 from "assets/img/examples/mariya-georgieva.jpg";
import work5 from "assets/img/examples/clem-onojegaw.jpg";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import BackdropFilter from "react-backdrop-filter";
import "views/styles.css";

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
            <h2>Shop {params.shopIndex}</h2>
            <Parallax
              small
              filter
              image={require("assets/img/profile-bg.jpg").default}
            >
                <div className="container">

                <BackdropFilter
                className="bluredForm"
                filter={"blur(5px) sepia(50%)"}
                html2canvasOpts={{
                    allowTaint: true
                }}
                onDraw={() => {
                    console.log("Rendered !");
                }}
                >
                    <form>
                <h4>@tnargib</h4>
                <p>Login</p>
                <hr />
                <p>Password</p>
                <hr />
                <div className="button">Sign in</div>
                <small>Forgot password ?</small>
                </form>
                </BackdropFilter>
                </div>
            </Parallax>
            
    
         </div>
    );
}

export default Shop;

