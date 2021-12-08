import React, { useState, useEffect } from 'react'

import { Button, Paper, Typography } from "@mui/material";
// import { FormProvider, useForm } from "react-hook-form";
import { FormInputText } from "components/FormInputText";
import { FormInputFile } from "components/FormInputFile";

import {  useForm } from "react-hook-form";
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../firebase.js"
import { useAuth } from "context/AuthContext"
import { collection, addDoc } from "firebase/firestore"; 

const AddShop = () => {
    const { userRef } = useAuth();
    const [file, setFile] = useState(null);
    const [shopName, setShopName] = useState(null);
    const [shopDescription, setShopDescription] = useState(null);

    const { handleSubmit, control, watch } = useForm();
    
    useEffect(() => {
        const subscription = watch((data) => {   
            setFile(data.attachments[0]);         
            setShopName(data.shopName);
            setShopDescription(data.shopDescription);
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    const onSubmit = () => {
        if(file == null)
            return;
        const storageRef = ref(storage, 'images/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
        (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case 'paused':
            console.log('Upload is paused');
            break;
            case 'running':
            console.log('Upload is running');
            break;
            default:
            break;
        }
        }, 
        (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
            case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
            case 'storage/canceled':
            // User canceled the upload
            break;
            case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
            default:
            break;
        }
        }, 
        () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const productRef = addDoc(collection(db, "shops"), {
                        name: shopName,
                        description: shopDescription,
                        image: downloadURL,
                        userId: userRef
                    }).then(() => {console.log("success")}).catch((e) => {console.log(e)});
                });
            }
        );
        
    };
    
    return (
        <Paper
        style={{
            display: "grid",
            gridRowGap: "20px",
            padding: "20px",
            margin: "10px 300px",
        }}
        >
        <Typography variant="h6"> Tienda Nueva</Typography>

        <FormInputText name="shopName" control={control} label="Nombre de la Tienda" type="text" />
        
        <FormInputText name="shopDescription" control={control} label="Descripción" type="text"/>

        <FormInputFile name="FileValue" control={control} label="File"/>

    
        <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
            {" "}
            Submit{" "}
        </Button>

        </Paper>
    )
}

export default AddShop
