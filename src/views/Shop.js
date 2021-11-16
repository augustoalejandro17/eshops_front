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
            />
             <div className={classNames(classes.main, classes.mainRaised)}>
              <div>
                <div className={classes.container}>
                  <GridContainer direction="column"
                     alignItems="center"
                     justifyContent="center" 
                     justify="center">
                    <GridItem xs={12} sm={12} md={6}>
                      <div className={classes.profile}>
                        <div>
                          <img src={profile} alt="..." className={imageClasses} />
                        </div>
                        <div className={classes.name}>
                          <h3 className={classes.title}>Christian Louboutin</h3>
                          <h6>DESIGNER</h6>
                          {/* <Button justIcon link className={classes.margin5}>
                            <i className={"fab fa-twitter"} />
                          </Button>
                          <Button justIcon link className={classes.margin5}>
                            <i className={"fab fa-instagram"} />
                          </Button>
                          <Button justIcon link className={classes.margin5}>
                            <i className={"fab fa-facebook"} />
                          </Button> */}
                        </div>
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                     <div className={classes.description}>
                         <p>
                         Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                         Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                         when an unknown printer took a galley of type and scrambled it to make a type 
                         specimen book. It has survived not only five centuries, but also the leap into 
                         electronic typesetting, remaining essentially unchanged. It was popularised in 
                         the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.{" "}
                         </p>
                     </div>
                    </GridItem>
                    
                  </GridContainer>
                  
                  <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                      {/* <NavPills
                        alignCenter
                        color="primary"
                        tabs={[
                          {
                            tabButton: "Studio",
                            tabIcon: Camera,
                            tabContent: (
                              <GridContainer justify="center">
                                <GridItem xs={12} sm={12} md={4}>
                                  <img
                                    alt="..."
                                    src={studio1}
                                    className={navImageClasses}
                                  />
                                  <img
                                    alt="..."
                                    src={studio2}
                                    className={navImageClasses}
                                  />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                  <img
                                    alt="..."
                                    src={studio5}
                                    className={navImageClasses}
                                  />
                                  <img
                                    alt="..."
                                    src={studio4}
                                    className={navImageClasses}
                                 />
                               </GridItem>
                             </GridContainer>
                           ),
                         },
                         {
                           tabButton: "Work",
                           tabIcon: Palette,
                           tabContent: (
                             <GridContainer justify="center">
                               <GridItem xs={12} sm={12} md={4}>
                                 <img
                                   alt="..."
                                   src={work1}
                                   className={navImageClasses}
                                 />
                                 <img
                                   alt="..."
                                   src={work2}
                                   className={navImageClasses}
                                 />
                                 <img
                                   alt="..."
                                   src={work3}
                                   className={navImageClasses}
                                 />
                               </GridItem>
                               <GridItem xs={12} sm={12} md={4}>
                                 <img
                                   alt="..."
                                   src={work4}
                                   className={navImageClasses}
                                 />
                                 <img
                                   alt="..."
                                   src={work5}
                                   className={navImageClasses}
                                 />
                               </GridItem>
                             </GridContainer>
                           ),
                         },
                         {
                           tabButton: "Favorite",
                           tabIcon: Favorite,
                           tabContent: (
                             <GridContainer justify="center">
                               <GridItem xs={12} sm={12} md={4}>
                                 <img
                                   alt="..."
                                   src={work4}
                                   className={navImageClasses}
                                 />
                                 <img
                                   alt="..."
                                   src={studio3}
                                   className={navImageClasses}
                                 />
                               </GridItem>
                               <GridItem xs={12} sm={12} md={4}>
                                 <img
                                   alt="..."
                                   src={work2}
                                   className={navImageClasses}
                                 />
                                 <img
                                   alt="..."
                                   src={work1}
                                   className={navImageClasses}
                                 />
                                 <img
                                   alt="..."
                                   src={studio1}
                                   className={navImageClasses}
                                 />
                               </GridItem>
                             </GridContainer>
                           ),
                         },
                       ]}
                     /> */}
                   </GridItem>
                 </GridContainer>
               </div>
             </div>
           </div>
           <Box sx={{ flexGrow: 6}} />
           <div className={classNames(classes.main, classes.mainRaised)}>
              <div>
                <div className={classes.container}>
                  <GridContainer direction="column"
                     alignItems="center"
                     justifyContent="center" 
                     justify="center">
                    <GridItem xs={12} sm={12} md={6}>
                      <div className={classes.profile}>
                        <div>
                          <img src={profile} alt="..." className={imageClasses} />
                        </div>
                        <div className={classes.name}>
                          <h3 className={classes.title}>Christian Louboutin</h3>
                          <h6>DESIGNER</h6>
                          {/* <Button justIcon link className={classes.margin5}>
                            <i className={"fab fa-twitter"} />
                          </Button>
                          <Button justIcon link className={classes.margin5}>
                            <i className={"fab fa-instagram"} />
                          </Button>
                          <Button justIcon link className={classes.margin5}>
                            <i className={"fab fa-facebook"} />
                          </Button> */}
                        </div>
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                     <div className={classes.description}>
                         <p>
                         Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                         Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                         when an unknown printer took a galley of type and scrambled it to make a type 
                         specimen book. It has survived not only five centuries, but also the leap into 
                         electronic typesetting, remaining essentially unchanged. It was popularised in 
                         the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.{" "}
                         </p>
                     </div>
                    </GridItem>
                    
                  </GridContainer>
                  
                  <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                      {/* <NavPills
                        alignCenter
                        color="primary"
                        tabs={[
                          {
                            tabButton: "Studio",
                            tabIcon: Camera,
                            tabContent: (
                              <GridContainer justify="center">
                                <GridItem xs={12} sm={12} md={4}>
                                  <img
                                    alt="..."
                                    src={studio1}
                                    className={navImageClasses}
                                  />
                                  <img
                                    alt="..."
                                    src={studio2}
                                    className={navImageClasses}
                                  />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                  <img
                                    alt="..."
                                    src={studio5}
                                    className={navImageClasses}
                                  />
                                  <img
                                    alt="..."
                                    src={studio4}
                                    className={navImageClasses}
                                 />
                               </GridItem>
                             </GridContainer>
                           ),
                         },
                         {
                           tabButton: "Work",
                           tabIcon: Palette,
                           tabContent: (
                             <GridContainer justify="center">
                               <GridItem xs={12} sm={12} md={4}>
                                 <img
                                   alt="..."
                                   src={work1}
                                   className={navImageClasses}
                                 />
                                 <img
                                   alt="..."
                                   src={work2}
                                   className={navImageClasses}
                                 />
                                 <img
                                   alt="..."
                                   src={work3}
                                   className={navImageClasses}
                                 />
                               </GridItem>
                               <GridItem xs={12} sm={12} md={4}>
                                 <img
                                   alt="..."
                                   src={work4}
                                   className={navImageClasses}
                                 />
                                 <img
                                   alt="..."
                                   src={work5}
                                   className={navImageClasses}
                                 />
                               </GridItem>
                             </GridContainer>
                           ),
                         },
                         {
                           tabButton: "Favorite",
                           tabIcon: Favorite,
                           tabContent: (
                             <GridContainer justify="center">
                               <GridItem xs={12} sm={12} md={4}>
                                 <img
                                   alt="..."
                                   src={work4}
                                   className={navImageClasses}
                                 />
                                 <img
                                   alt="..."
                                   src={studio3}
                                   className={navImageClasses}
                                 />
                               </GridItem>
                               <GridItem xs={12} sm={12} md={4}>
                                 <img
                                   alt="..."
                                   src={work2}
                                   className={navImageClasses}
                                 />
                                 <img
                                   alt="..."
                                   src={work1}
                                   className={navImageClasses}
                                 />
                                 <img
                                   alt="..."
                                   src={studio1}
                                   className={navImageClasses}
                                 />
                               </GridItem>
                             </GridContainer>
                           ),
                         },
                       ]}
                     /> */}
                   </GridItem>
                 </GridContainer>
               </div>
             </div>
           </div>
         </div>
    );
}

export default Shop;