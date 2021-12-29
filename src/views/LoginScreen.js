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
import { auth } from "firebase.js"
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";

const LoginScreen = (props) => {
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const { login, userRef, currentUser } = useAuth();
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    async function handleLogin(e) {
        e.preventDefault()
        
        // if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        //     return setError("Passwords do not match")
        // }

        try {
            setError("")
            setLoading(true)
            await login(auth, email, password);
            navigate(from, { replace: true })
        } catch (error) {
            setError("Failed to login an account")
            console.log(error.message)
        }

        setLoading(false)
    }

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
            <GridContainer // direction="column"
                        alignItems="center"
                        justifyContent="center" 
                        justify="center"
            >
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[cardAnimaton]}>
                  <form className={classes.form}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>Login</h4>
                      <div className={classes.socialLine}>
        
                      </div>
                    </CardHeader>
                    <CardBody>
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
                    <CardFooter >
                      	<GridContainer direction="column"
                        alignItems="center"
                        justifyContent="center" 
                        justify="center"	
						>
							
						<Button outlined color="primary" size="lg" onClick={handleLogin}>
							Iniciar Sesión
						</Button>
						o
						<GridItem xs={12} sm={12} md={12}>
						Si es que no tienes una cuenta,  <Link style={{ textDecoration: "none" }} to="/register">registrate</Link>  
						
						</GridItem>
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

export default LoginScreen;