import React, {useEffect, useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useAuth } from "context/AuthContext"
import { Timestamp, addDoc, collection } from "firebase/firestore"; 
import { db } from "../firebase.js"

const steps = ['Review your order', 'Payment details'];

const theme = createTheme();

function getStepContent(activeStep, shoppingCartProp) {
    return <Review shoppingCart={shoppingCartProp}/>;
}

const ShoppingCart = () => {
    const [activeStep, setActiveStep] = React.useState(1);
    const { currentUserData } = useAuth();
    const [shoppingCart, setShoppingCart] = useState([]);

	useEffect(() => {
        const currentCart = window.localStorage.getItem("cart");
        if (currentCart) {
            setShoppingCart(JSON.parse(currentCart));
        }
    }, []);

	useEffect(() => {
        if(shoppingCart.length !== 0){
            window.localStorage.setItem('cart', JSON.stringify(shoppingCart));
        }
    }, [shoppingCart]);

	const cleanCart = () => {
		window.localStorage.removeItem('cart');
		setShoppingCart([]);
	}

    const handleNext = (items) => {
        async function storeOrder(docData) {
            const orderRef = await addDoc(collection(db, "orders"), docData).then(() => {console.log("success")}).catch((e) => {console.log(e)});
        }

        const setupData = {
            status: 'payment-pending',
            userId: items[0].userId,
            products: items.map(item => item),
            totalValue: items.reduce((acc, item) => acc + item.price, 0),
            date: Timestamp.fromDate(new Date()),
            client: currentUserData,
            clientId: currentUserData.id
        }

        setActiveStep(activeStep + 1);
        storeOrder(setupData);
		window.localStorage.removeItem('cart');
    };

    return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Gracias por tu orden.
                </Typography>
                <Typography variant="subtitle1">
                  Tú orden ha sido enviada. Puedes realizar el pago dirigiendote a mis ordenes dando click en el botón de abajo.
                </Typography>
				<Box mt={5}>
					<Link style={{ textDecoration: "none" }} 
						to={`/my-orders`}
					>  
						<Button variant="contained" color="primary">
							Ver mis ordenes
						</Button>
					</Link>
					
				</Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep, shoppingCart)}
                {shoppingCart.length > 0 ? 
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Button
                    variant="contained"
                    onClick={() => { cleanCart();}} 
                    sx={{ mt: 3, ml: 1 }}
                  	>
                    Vaciar carrito
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => { handleNext(shoppingCart)}} 
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Confirmar orden
                  </Button>
                </Box> 
                : null}
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default ShoppingCart;


function Review(props) {
	const { shoppingCart } = props;
    const [total, setTotal] = useState(0);
	// const [shoppingCart, setShoppingCart] = useState(shoppingCartProp);
	

    useEffect(() => {
        setTotal(shoppingCart.reduce((acc, item) => acc + item.price, 0));
    }, [shoppingCart]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
		  {shoppingCart.length > 0? shoppingCart.map((item, index) => (
			
			<ListItem key={index}>
				<ListItemText primary={item.name} secondary={item.description} />
            	<Typography variant="body2">${item.price}</Typography>
			</ListItem>
		  )) : 
		  <Typography variant="body2" sx={{alignContent:"center"}}>No hay productos en el carrito</Typography>}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${total}
          </Typography>
        </ListItem>
      </List>
      
    </React.Fragment>
  );
}
