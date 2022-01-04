import  React, { useState } from 'react';
// @mui/material components
import InputAdornment from "@mui/material/InputAdornment";
import Icon from "@mui/material/Icon";
// @mui/icons-material
import Email from "@mui/icons-material/Email";
import People from "@mui/icons-material/People";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import useClasses from "components/UseClasses";
import { useAuth } from "context/AuthContext"
import { Typography } from '@mui/material';

import {
    useNavigate,
    useLocation,
  } from "react-router-dom";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import { auth } from "firebase.js"
import image from "assets/img/bg7.jpg";
import Muted from "components/Typography/Muted.js";
import { Link, NavLink } from 'react-router-dom';

const RegisterScreen = (props) => {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const { signup } = useAuth();
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    async function handleRegister(e) {
        e.preventDefault()
        
        try {
            setError("")
            setLoading(true)
            await signup(auth, name, email, password);
            navigate(from, { replace: true });
        } catch {
            setError("Failed to create an account")
        }

        setLoading(false)
    }

    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function () {
      setCardAnimation("");
    }, 700);
    const classes = useClasses(styles);
    const { ...rest } = props;
    return (
      <div>
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center"
                        // direction="column"
                        alignItems="center"
                        justifyContent="center" 
            >
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[cardAnimaton]}>
                  <form className={classes.form}>
                    <CardHeader color="info" className={classes.cardHeader}>
                      <h4>Register</h4>
                      <div className={classes.socialLine}>
                      </div>
                    </CardHeader>
                    {/* <p className={classes.divider}>Or Be Classical</p> */}
                    <CardBody>
                      <CustomInput
                        labelText="First Name..."
                        id="first"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        
                        inputProps={{
                          type: "text",
                          onChange: (userName) => setName(userName.target.value),
                          endAdornment: (
                            <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <CustomInput
                        labelText="Email..."
                        id="email"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "email",
                          onChange: (userEmail) => setEmail(userEmail.target.value),
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <CustomInput
                        labelText="Password"
                        id="pass"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "password",
                          onChange: (userPassword) => setPassword(userPassword.target.value),
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          ),
                          autoComplete: "off",
                        }}
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                        <GridContainer justify="center"
                            direction="column"
                            alignItems="center"
                            justifyContent="center" 
                        >
                        <Button color="primary" size="lg" onClick={handleRegister}>
                            Registrarse
                        </Button>
                        o 
                        <Muted>

                        <GridItem xs={12} sm={12} md={12}>
							<Typography variant="body1"  align="center" gutterBottom>
							Si es que tienes una cuenta,  <Link style={{ textDecoration: "none" }} to="/login">ingresa aquí</Link>   
							</Typography>
                           
                        
                        </GridItem>
                        </Muted>
                        
                        </GridContainer>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
}

export default RegisterScreen;