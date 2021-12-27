import React from "react";

// nodejs library that concatenates classes
import classNames from "classnames";

import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
import { Link } from 'react-router-dom';

import profile from "assets/img/faces/christian.jpg";

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import { useAuth } from "context/AuthContext"

import useClasses from "components/UseClasses";
import SectionCarousel from "../components/SectionCarousel";
import BasicCarousel from "../components/BasicCarousel";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import { 
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Container,
    Typography } from '@mui/material';
const Profile = (props) => {

    const { userRef } = useAuth();
    const { userId } = useParams();

    const { currentUserData } = useAuth();

    const classes = useClasses(styles);
    const { ...rest } = props;
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRoundedCircle,
      classes.imgFluid
    );
  	const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
    
    const navigate = useNavigate();
    const location = useLocation();
    const users = {sender: userRef, receiver: userId};

    return (
        <div>
		<Parallax
            small
            filter
            image={require("assets/img/profile-bg.jpg").default}
        />
		{currentUserData ? (
			<div>
        
            <div className={classNames(classes.main, classes.mainRaised)}>
            <div>
            <div className={classes.container}>
                <GridContainer direction="column"
                    alignItems="center"
                    justifyContent="center" 
                    justify="center"
                    style={{marginBottom: "30px"}}
                >	
                    <GridItem xs={12} sm={12} md={6}>
                    <div className={classes.profile}>
                    <div>
                        <img src={profile} alt="..." className={imageClasses} />
                    </div>
                    <div className={classes.name}>
                        <h3 className={classes.title}>{currentUserData.name}</h3>
                    </div>
                    </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <GridContainer direction="row"
                                    alignItems="center"
                                    justifyContent="center" 
                                    justify="center"
                    >
                        {(userRef === userId) ? <div><Link style={{ textDecoration: "none" }} 
                                to={`/edit-profile/1`}
                                // key={card.index}
                        >
                            <Button simple color="primary" size="lg" >
                                Editar Perfil
                            </Button>
                        </Link>
                        <Link style={{ textDecoration: "none" }} 
                                to={`/add-shop`}
                                // key={card.index}
                        >
                            <Button simple color="primary" size="lg" >
                                Crear Tienda
                            </Button>
                        </Link> </div>
                        :
						<Link style={{ textDecoration: "none" }} 
								to={ `/chats` } 
								state= { {users: users} }
                                // key={card.index}
                        >
                            <Button simple color="primary" size="lg" >
							Enviar Mensaje
                            </Button>
                        </Link>
                        } 
                    </GridContainer>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <div className={classes.description}>
                        <p>
							{currentUserData.description ? currentUserData.description : "No hay descripción"}
                        </p>
                    </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <GridContainer direction="row"
                                        alignItems="center"
                                        justifyContent="center" 
                                        justify="center">
                            <Link style={{ textDecoration: "none" }} 
                                to={`/`}
                                state= { {user: users.sender} }
                                // key={card.index}
                            >
                                <Button simple color="primary" size="lg" style={{justifyContent: "center"}}>
                                    Ver Tiendas
                                </Button>

                            </Link>
                                
                        </GridContainer>
                    </GridItem>
                </GridContainer>
            </div>
            </div>
			</div>
        </div>): null}
        </div>
    );
}

export default Profile;
