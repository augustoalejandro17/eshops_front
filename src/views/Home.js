import React, {useEffect, useState} from 'react';
import CardComponent from './../components/CardComponent';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase.js"
import { useAuth } from "context/AuthContext"

const Home = () => {
    const [cards, setCards] = useState();
    const {  userRef } = useAuth();
    console.log(userRef);
    useEffect(() => {
        const queryVar = query(collection(db, "stores"));
        getDocs(queryVar).then((querySnapshot) => {
            const list = [];
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                const object = { index: doc.id, name: doc.data().name, description: doc.data().description, image: doc.data().image };
                list.push(object);
            });
            setCards(list);
            
        });
    },[])
    return (
        <main>
            {cards ? <CardComponent cards={cards}/> : null}            
        </main>
    );
}

export default Home;