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
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    async function handleRegister(e) {
        e.preventDefault()

		if(!password || !confirmPassword || !email || !name) {
			setError(true)
			setErrorMessage("Porfavor completa todos los campos")
			return
		}
        else if (password !== confirmPassword) {
            setErrorMessage("Las contraseñas no coinciden")
			setError(true);
        }
		else if (password.length < 6) {
			setErrorMessage("La contraseña debe tener al menos 6 caracteres")
			setError(true);
		}
		else if (name.length < 3) {
			setErrorMessage("El nombre debe tener al menos 3 caracteres")
			setError(true);
		}
        else{
			try {
				if(!(password === "")){
					setError(false);
					setErrorMessage("");
					setLoading(true);
					await signup(auth, name, email, password);
					navigate(from, { replace: true });
				}
				else{
					setError(true);
					setErrorMessage("La contraseña no puede estar vacía");
				}
			} catch(error) {
				setError(true);
				switch (error.message) {
					case("auth/missing-email"):
						setErrorMessage("El correo electrónico es obligatorio");
						break;
					case('auth/email-already-in-use'):
						setErrorMessage("El correo electrónico ya está en uso");
						break;
					case('auth/invalid-email'):
						setErrorMessage("El correo electrónico no es válido");
						break;
					case('auth/weak-password'):
						setErrorMessage("La contraseña es muy débil");
						break;
					default:
						setErrorMessage("Error al crear la cuenta");
						break;
				}
			}
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
                      <h4>Registrar nueva cuenta</h4>
                      <div className={classes.socialLine}>
                      </div>
                    </CardHeader>
                    {/* <p className={classes.divider}>Or Be Classical</p> */}
                    <CardBody>
                      <CustomInput
                        labelText="Nombre"
                        id="first"
						errorText={errorMessage}  
                        formControlProps={{
                          fullWidth: true,
						  error: error,
						  required: true,
						  sx : {
                            marginTop: "15px",
                            }
                        }}
                        
                        inputProps={{
                          type: "text",
                          onChange: (userName) => {setName(userName.target.value); setError(false); setErrorMessage(null)},
                          endAdornment: (
                            <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <CustomInput
                        labelText="Email"
                        id="email"
						errorText={errorMessage}  
                        formControlProps={{
                          fullWidth: true,
						  error: error,
						  required: true,
						  sx : {
                            marginTop: "15px",
                            }
                        }}
                        inputProps={{
                          type: "email",
                          onChange: (userEmail) => {setEmail(userEmail.target.value); setError(false); setErrorMessage(null)},
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <CustomInput
                        labelText="Contraseña"
                        id="contraseña"
						errorText={errorMessage}  
                        formControlProps={{
                          fullWidth: true,
						  error: error,
						  required: true,
						  sx : {
                            marginTop: "15px",
                            }
                        }}
                        inputProps={{
                          type: "password",
                          onChange: (userPassword) => {setPassword(userPassword.target.value); setError(false); setErrorMessage(null)},
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

						<CustomInput
                        labelText="Confirmar Contraseña"
                        id="confirmar"
						errorText={errorMessage}  
                        formControlProps={{
                          fullWidth: true,
						  error: error,
						  required: true,
						  sx : {
                            marginTop: "15px",
                            }
                        }}
                        inputProps={{
                          type: "password",
                          onChange: (userPassword) => {setConfirmPassword(userPassword.target.value); setError(false); setErrorMessage(null)},
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