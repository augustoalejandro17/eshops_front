import React, {useState, useEffect} from 'react';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper'

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Messages = () => {
    const [messages, setMessages] = useState([]);
    return (
        <Box sx={{ flexGrow: 1, height: "100vh", alignItems: 'stretch' }}>
            <GridContainer direction="row"
                    alignItems="center"
                    justifyContent="center" 
                    justify="center"
                    spacing={3}
            >	
                <GridItem xs={6} sm={6} md={6}>
                    <Item> s </Item>
                </GridItem>
                <GridItem xs={5} sm={5} md={5}>
                    <Item> s </Item>
                </GridItem>

            </GridContainer>
        </Box>
    );
}

export default Messages;