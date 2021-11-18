import * as React from 'react';
import { Button, 
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Container,
    Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const CardComponent = ({cards}) => {
    return(
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
                <Grid item key={card.index} xs={12} sm={6} md={4}>  
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
                        <Link style={{ textDecoration: "none" }} 
                            to={`/shop/${card.index}`}
                            key={card.index}
                        >
                            <Button size="small">View</Button>
                        </Link>
                    </CardActions>
                    </Card>
                </Grid>
            ))}
          </Grid>
        </Container>
    );
}

export default CardComponent;