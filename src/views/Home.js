import React, {useEffect, useState} from 'react';
import CardComponent from './../components/CardComponent';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase.js"
import { useLocation } from "react-router-dom";

const Home = () => {
    const location = useLocation();
    const user = location.state ? location.state.user : null;
    const [cards, setCards] = useState();

    useEffect(() => {
        let queryVar = null;
        if(!user) {
            queryVar = query(collection(db, "shops"));
        }
        else {
            queryVar = query(collection(db, "shops"), where("userId", "==", user));
        }
        if(queryVar) {
            getDocs(queryVar).then((querySnapshot) => {
                const list = [];
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    const object = { index: doc.id, name: doc.data().name, description: doc.data().description, image: doc.data().image };
                    list.push(object);
                });
                setCards(list);
                
            });
        }
    },[user])
    return (
        <main>
            {cards ? <CardComponent cards={cards}/> : null}            
        </main>
    );
}

export default Home;