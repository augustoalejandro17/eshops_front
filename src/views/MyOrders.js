import React, {useEffect} from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import GridContainer from "components/Grid/GridContainer.js";
import { Container, Grid, CardMedia, CardActions, CardActionArea } from '@mui/material';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import { useAuth } from "context/AuthContext"
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.js"
import { useParams, useNavigate, useLocation } from "react-router-dom";

var cardsPending = [{index: 1, productName: 'Card One', status: 'payment-pending', productImage: 'https://source.unsplash.com/random'}];

var cardsPayed = [{index: 1, productName: 'Card One', status: 'payed', productImage: 'https://source.unsplash.com/random'}];

var cardsFailed = [{index: 1, title: 'Card Two', status: 'cancelled', productImage: 'https://source.unsplash.com/random'},      
                    {index: 2, title: 'Card Nine', status: 'payment-refused', productImage: 'https://source.unsplash.com/random'}];

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const MyOrders = (props) => {
    const [value, setValue] = React.useState(0);
    const { userRef } = useAuth();
    console.log(userRef);
	
	useEffect(() => {
		async function fetchOrders() {		
			const queryVar = query(collection(db, "orders"), where("client.id", "==", userRef));
			await getDocs(queryVar).then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					console.log(doc.data());
				});				
			});
		}

		if(userRef){
			fetchOrders();

		}
	}, [userRef]);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div>
		<Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
			<GridContainer direction="row"
					alignItems="center"
					justifyContent="center" 
					justify="center"
			>	
				<Box>
					<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
						<Tab label="Ordenes pendientes" {...a11yProps(0)} />
						<Tab label="Mis ordenes activas" {...a11yProps(1)} />
						<Tab label="Ordenes fallidas" {...a11yProps(2)} />
					</Tabs>
				</Box>
			</GridContainer>
		</Box>
		<div>
			<TabPanel value={value} index={0}>
				<Container sx={{ py: 8 }} maxWidth="lg">

					<Grid container spacing={4} 
						direction="row"
						justifyContent="center"
						alignItems="center"
					>
					{cardsPending.map((card) => (
						<Grid item key={card.index} xs={12} sm={12} md={12}>  
							<Card
							sx={{ height: '100%', display: 'flex' }}
							>
							
							
							<Box sx={{ display: 'flex', flexDirection: 'row', width: "100%" }}>
								{/* <CardActionArea> */}
								<CardMedia
								component="img"
								sx={{ width: "30%", height: 'auto', maxHeight: '250px' }}
								image={card.productImage}
								alt="Live from space album cover"
								/>
								{/* </CardActionArea> */}
								<CardBody>
									<Typography component="div" variant="h5">
										Product Name
									</Typography>
									<Typography variant="body2" color="text.secondary">
										<b>Description:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pulvinar 
										vel nibh sit amet dignissim. Ut non vulputate purus. Etiam commodo tincidunt 
										placerat. Cras ut lacus scelerisque, posuere mauris eget, mollis felis. Praesent 
									
									</Typography>
								<CardActions style={{display: "flex", justifyContent: "center"}}>

									<Button size="small" color="info" >Ver</Button>
								</CardActions>
								</CardBody>
							</Box>
							
							</Card>
						</Grid>
					))}
				</Grid>
				</Container>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<Container sx={{ py: 8 }} maxWidth="lg">

					<Grid container spacing={4} 
						direction="row"
						justifyContent="center"
						alignItems="center"
					>
					{cardsPayed.map((card) => (
						<Grid item key={card.index} xs={12} sm={12} md={12}>  
							<Card
							sx={{ height: '20%', display: 'flex' }}
							>
							
							
							<Box sx={{ display: 'flex', flexDirection: 'row', width: "100%",  }}>
								{/* <CardActionArea> */}
								<CardMedia
								component="img"
								sx={{ width: "30%", height: 'auto', maxHeight: '250px'}}
								image={card.productImage}
								alt="Image"
								/>
								{/* </CardActionArea> */}
								<CardBody>
									<Typography component="div" variant="h5">
										Product Name
									</Typography>
									<Typography variant="body2" color="text.secondary">
									<b>Description:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pulvinar 
									vel nibh sit amet dignissim. Ut non vulputate purus. Etiam commodo tincidunt 
									placerat. Cras ut lacus scelerisque, posuere mauris eget, mollis felis. Praesent 
									volutpat congue lectus, sit amet gravida libero maximus sed. Mauris dui quam, 
									vehicula id tellus eget, ultricies malesuada erat. Praesent porta elit eu augue 
									accumsan condimentum. Maecenas quis velit placerat, accumsan ligula non, accumsan 
									eros.
									
									</Typography>
								<CardActions style={{display: "flex", justifyContent: "center"}}>

									<Button size="small" color="info" >Ver</Button>
								</CardActions>
								</CardBody>
							</Box>
							
							</Card>
						</Grid>
					))}
					</Grid>
				</Container>
			</TabPanel>
			<TabPanel value={value} index={2}>
				<Container sx={{ py: 8 }} maxWidth="lg">

					<Grid container spacing={4} 
						direction="row"
						justifyContent="center"
						alignItems="center"
					>
					{cardsFailed.map((card) => (
						<Grid item key={card.index} xs={12} sm={12} md={12}>  
							<Card
							sx={{ height: '100%', display: 'flex' }}
							>
							
							
							<Box sx={{ display: 'flex', flexDirection: 'row', width: "100%" }}>
								{/* <CardActionArea> */}
								<CardMedia
								component="img"
								sx={{ width: "30%", height: 'auto', maxHeight: '250px'}}
								image={card.productImage}
								alt="Image"
								/>
								{/* </CardActionArea> */}
								<CardBody>
									<Typography component="div" variant="h5">
										Product Name
									</Typography>
									<Typography variant="body2" color="text.secondary">
									<b>Description:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pulvinar 
									vel nibh sit amet dignissim. Ut non vulputate purus. Etiam commodo tincidunt 
									placerat. Cras ut lacus scelerisque, posuere mauris eget, mollis felis. Praesent 
									volutpat congue lectus, sit amet gravida libero maximus sed. Mauris dui quam, 
									vehicula id tellus eget, ultricies malesuada erat. Praesent porta elit eu augue 
									accumsan condimentum. Maecenas quis velit placerat, accumsan ligula non, accumsan 
									eros.
									
									</Typography>
								<CardActions style={{display: "flex", justifyContent: "center"}}>

									<Button size="small" color="info" >Ver</Button>
								</CardActions>
								</CardBody>
							</Box>
							
							</Card>
						</Grid>
					))}
					</Grid>
				</Container>
			</TabPanel>
		</div>

		</div>
	);
}

export default MyOrders
