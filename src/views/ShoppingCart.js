import React, {useEffect, useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useAuth } from "context/AuthContext"
import { Timestamp, addDoc, collection } from "firebase/firestore"; 
import { db } from "../firebase.js"

const steps = ['Shipping address', 'Payment details', 'Review your order'];

const theme = createTheme();

function getStepContent() {
    return <Review />;
}

const ShoppingCart = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const { cart, resetCart } = useAuth();
    const { currentUserData } = useAuth();
    const handleNext = (items) => {
        async function storeOrder(docData) {
            const orderRef = await addDoc(collection(db, "orders"), docData).then(() => {console.log("success")}).catch((e) => {console.log(e)});
        }
        const setupData = {
            status: 'payment-pending',
            userId: items[0].userId,
            products: items.map(item => item.id),
            totalValue: items.reduce((acc, item) => acc + item.price, 0),
            date: Timestamp.fromDate(new Date()),
            client: currentUserData
        }

        setActiveStep(activeStep + 1);
        storeOrder(setupData);
        resetCart();
    };

//   const handleBack = () => {
//     setActiveStep(activeStep - 1);
//   };
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
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                {cart.length > 0 ? 
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    onClick={() => { handleNext(cart)}} 
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Place order
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


function Review() {
    const { cart } = useAuth();
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setTotal(cart.reduce((acc, item) => acc + item.price, 0));
    }, [cart]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cart.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.description} />
            <Typography variant="body2">${product.price}</Typography>
          </ListItem>
        ))}

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
