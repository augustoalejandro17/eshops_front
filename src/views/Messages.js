import React, {useState, useEffect} from 'react';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper'
import useClasses from "components/UseClasses";

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import { useLocation } from "react-router-dom";

const styles = ({
    table: {
      minWidth: 650,
    },
    chatSection: {
      width: '100%',
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
      height: '62vh',
      overflowY: 'auto'
    }
});

// const Item = styled(Paper)(({ theme }) => ({
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const classes = useClasses(styles);
    const location = useLocation();
    const users = location.state.users;
    console.log(users.receiver);
    return (
        <div>
        <Box sx={{ flexGrow: 1, marginTop: "20px" }}>
          <Grid container>
              <Grid item xs={12} >
                  <Typography variant="h5" className="header-message">Mensajes</Typography>
              </Grid>
          </Grid>
          <Divider sx={{ marginTop: "20px" }}/>
          <Grid container component={Paper} className={classes.chatSection}>
          <Divider />
              <Grid item xs={3} className={classes.borderRight500}>
                  <List>
                      <ListItem button key="RemySharp">
                          <ListItemIcon>
                              <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                          </ListItemIcon>
                          <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
                          <ListItemText secondary="online" align="right"></ListItemText>
                      </ListItem>
                      <ListItem button key="Alice">
                          <ListItemIcon>
                              <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                          </ListItemIcon>
                          <ListItemText primary="Alice">Alice</ListItemText>
                      </ListItem>
                      <ListItem button key="CindyBaker">
                          <ListItemIcon>
                              <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
                          </ListItemIcon>
                          <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
                      </ListItem>
                  </List>
              </Grid>
              <Grid item xs={9}>
                  <List className={classes.messageArea}>
                      <ListItem key="1">
                          <Grid container>
                              <Grid item xs={12}>
                                  <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
                              </Grid>
                              <Grid item xs={12}>
                                  <ListItemText align="right" secondary="09:30"></ListItemText>
                              </Grid>
                          </Grid>
                      </ListItem>
                      <ListItem key="2">
                          <Grid container>
                              <Grid item xs={12}>
                                  <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
                              </Grid>
                              <Grid item xs={12}>
                                  <ListItemText align="left" secondary="09:31"></ListItemText>
                              </Grid>
                          </Grid>
                      </ListItem>
                      <ListItem key="3">
                          <Grid container>
                              <Grid item xs={12}>
                                  <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
                              </Grid>
                              <Grid item xs={12}>
                                  <ListItemText align="right" secondary="10:30"></ListItemText>
                              </Grid>
                          </Grid>
                      </ListItem>
                  </List>
                  <Divider />
                  <Grid container style={{padding: '20px'}}>
                      <Grid item xs={11}>
                          <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                      </Grid>
                      <Grid item xs={1} align="right">
                          <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                      </Grid>
                  </Grid>
              </Grid>
          </Grid>
          </Box>
        </div>
    );
}

export default Messages;