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
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import { useLocation } from "react-router-dom";
import { useAuth } from "context/AuthContext"
import { collection, query, where, getDocs, doc, getDoc, addDoc } from "firebase/firestore";
import { db } from "../firebase.js"
import { set } from 'react-hook-form';

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

const Chats = () => {
    const [chats, setChats] = useState([]);
    const [emptyChats, setEmptyChats] = useState(false);
    const { currentUser } = useAuth();
    const [uiChatsList, setUIChatsList] = useState(null);
    const [currentChatRef, setCurrentChatRef] = useState(null);
    const [receiverUser, setReceiverUser] = useState(null);
    const classes = useClasses(styles);
    const location = useLocation();
    const users = location.state.users;

    async function createChat(senderUser, receiverUser) {
        const chatsRef = collection(db, "chats");
        const newChat = {
            participants: [senderUser, receiverUser],
        }
        const docRef = await addDoc(chatsRef, newChat);
        setCurrentChatRef(docRef)
    };

    function setUIChats(chats, senderUser, receiverUser) {
        if(chats.length > 0) {
            const chatActive = (chatsActive, senderUserActive, receiverUserActive) => {
                return chatsActive.map(chat => { 
                    if(chat.participants.includes(senderUserActive) && chat.includes(receiverUserActive)) {
                        return {...chat, active: true};
                    }
                    else {
                        return {...chat, active: false};
                    }
                });
            };
            
            if(chatActive(chats, senderUser, receiverUser).filter(chat => chat.active).length > 0) {
                setUIChatsList(chatActive);
            }
            else {
                createChat(senderUser, receiverUser);
            }

        }
        else {
            createChat(senderUser, receiverUser);
        }
    }
    useEffect(() => {
        
        async function fetchData() {
            const chatsRef = collection(db, "chats");
            const q = query(chatsRef, where('participants', 'array-contains-any', [users.sender, users.receiver]));
            const querySnapshot  = await getDocs(q);
            const userChats = querySnapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });
            if(userChats.length > 0) {
                setChats(userChats);
                setEmptyChats(false);
                setUIChats(userChats, users.sender, users.receiver);
            }
            else {
                setEmptyChats(true);
            }
        }

        async function fetchReceiverUser() {
            const usersRef = doc(db, "users", users.receiver);
            const docSnap = await getDoc(usersRef);
            // const querySnapshot = await getDocs(queryRef);
            if(docSnap.exists) {
                setReceiverUser(docSnap.data())
            }
        }
        
        // console.log(users.receiver)
        fetchReceiverUser();
        fetchData();
        // setChats();
        
    }, [users]);

    useEffect(() => {
        console.log(receiverUser)
        console.log(chats)
    }, [receiverUser, chats]);
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
                {chats.length > 0 || emptyChats  ? 
                    <List>
                    <ListItemButton  selected key="RemySharp">
                        <ListItemIcon>
                            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
                    </ListItemButton>
                    <ListItemButton key="Alice">
                        <ListItemIcon>
                            <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="Alice">Alice</ListItemText>
                    </ListItemButton>
                    <ListItemButton key="CindyBaker">
                        <ListItemIcon>
                            <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
                    </ListItemButton>
                </List> : null}
                {
                    emptyChats ? <Typography variant="h6" className="header-message">No hay chats</Typography> : null
                }
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

export default Chats;