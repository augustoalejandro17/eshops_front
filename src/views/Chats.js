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
    const [chats, setChats] = useState(null);
    const [emptyChats, setEmptyChats] = useState(false);
    const { currentUserData } = useAuth();
    const [uiChatsList, setUIChatsList] = useState([]);
    const [currentChatRef, setCurrentChatRef] = useState(null);
    const [currentMessageList, setCurrentMessageList] = useState([]);
    const [receiverUser, setReceiverUser] = useState(null);
    const classes = useClasses(styles);
    const location = useLocation();
    const users = location.state.users;

    async function createChat(senderUserArgument, receiverUserArgument, senderData, receiverData) {
        const chatsRef = collection(db, "chats");
        const newChat = {
            participants: [senderUserArgument, receiverUserArgument],
            participantsData: [senderData, receiverData],
        }
        const docRef = await addDoc(chatsRef, newChat);
        setCurrentChatRef(docRef)
        return { ...newChat, active: true, receiverName: receiverData.name };
    };

    function setUIChats(chats, senderUserArgument, receiverUserArgument, senderData, receiverData ) {
        if(chats.length > 0) {
            const listOfChatsWithState = (chatsActive, senderUserActive, receiverUserActive) => {
                return chatsActive.map(chat => { 
                    const receiverName =  chat.participantsData.filter(participant => participant.id !== senderUserActive)[0].name;
                    if(chat.participants.includes(senderUserActive) && chat.participants.includes(receiverUserActive)) {
                        if(chat.messages && chat.messages.length > 0) {
                            setCurrentMessageList(chat.messages);
                        }
                        return {...chat, active: true, receiverName: receiverName};
                    }
                    else {
                        const receiverName =  chat.participantsData.filter(participant => participant.id !== senderUserActive)[0].name;
                        return {...chat, active: false, receiverName: receiverName};
                    }
                });
            };
            const chatsVar = listOfChatsWithState(chats, senderUserArgument, receiverUserArgument);
            if(chatsVar.filter(chat => chat.active === true).length > 0)
            {
                setUIChatsList([...uiChatsList, ...chatsVar]);
            }
            else {
                setUIChatsList([...uiChatsList, createChat(senderUserArgument, receiverUserArgument, senderData, receiverData), ...chatsVar]);
            }

        }
        else {
            setUIChatsList([...uiChatsList, createChat(senderUserArgument, receiverUserArgument, senderData, receiverData)]);
        }
    }
    useEffect(() => {
        async function fetchReceiverUser() {
            const usersRef = doc(db, "users", users.receiver);
            const docSnap = await getDoc(usersRef);
            // const querySnapshot = await getDocs(queryRef);
            if(docSnap.exists) {
                setReceiverUser({id: docSnap.id, ...docSnap.data()});
            }
        }
        fetchReceiverUser();
    }, [users]);

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
                setEmptyChats(false);
                
                
            }
            else {
                setEmptyChats(true);
            }
            setChats(userChats);
        }
        fetchData();        
    }, [users]);
    
    useEffect(() => {
        if(receiverUser && currentUserData && chats !== null) {
            const receiverUserData = receiverUser;
            setUIChats(chats, users.sender, users.receiver, currentUserData, receiverUserData);
        }
    }, [receiverUser, chats, currentUserData]);

    useEffect(() => {
        if(uiChatsList.length > 0) {
            console.log(uiChatsList);
        }
    }, [uiChatsList]);
    
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
                {uiChatsList  ? 
                    <List>
                        {uiChatsList.map(chat => {
                            return (
                                <ListItem button selected={chat.active} key={chat.id} >
                                    <ListItemIcon>
                                    <Avatar alt={chat.receiverName} src="https://" />
                                    </ListItemIcon>
                                    <ListItemText primary={chat.receiverName}>{chat.receiverName}</ListItemText>
                                </ListItem>
                            )
                        })}
                </List> : "No hay chats"}
                {
                    emptyChats ? <Typography variant="h6" className="header-message">No hay chats</Typography> : null
                }
              </Grid>
              <Grid item xs={9}>
                  <List className={classes.messageArea}>
                      {currentMessageList.length > 0 ? 
                      <div>
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
                      <ListItem key="4">
                          <Grid container>
                              <Grid item xs={12}>
                                  <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
                              </Grid>
                              <Grid item xs={12}>
                                  <ListItemText align="right" secondary="10:30"></ListItemText>
                              </Grid>
                          </Grid>
                      </ListItem> 
                      
                      </div>:
                        <ListItem key="1">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText align="left" primary="Envia tu primer mensaje..."></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                      }
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