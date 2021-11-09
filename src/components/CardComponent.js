import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const CardComponent = ({cards}) => {
    return(
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
                <Grid item key={card.index} xs={12} sm={6} md={4}>
                    <Link style={{ textDecoration: "none" }} 
                        to={`/shop/${card.index}`}
                        key={card.index}
                    >
                        <Card
                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                        <CardMedia
                            component="img"
                            // sx={{
                            //   // 16:9
                            //   pt: '56.25%',
                            // }}
                            image={card.image}
                            alt="random"
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="h2">
                            {card.title}
                            </Typography>
                            <Typography>
                            {card.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">View</Button>
                        </CardActions>
                        </Card>
                    </Link>
                </Grid>
            ))}
          </Grid>
        </Container>
    );
}

export default CardComponent;