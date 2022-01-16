import React, { useState, useEffect } from 'react'

import { Button, Paper, Typography } from "@mui/material";
// import { FormProvider, useForm } from "react-hook-form";
import { FormInputText } from "components/FormInputText";
import { FormInputFile } from "components/FormInputFile";

import {  useForm } from "react-hook-form";
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore"; 
import { storage, db } from "../firebase.js"
import { useAuth } from "context/AuthContext"
import { useParams } from "react-router-dom";

const AddContent = () => {
    
    const { userRef } = useAuth();
    const { productIndex } = useParams();

    const [file, setFile] = useState(null);
    const [video, setVideo] = useState(null);
    const [contentName, setContentName] = useState(null);
    const [contentDescription, setcontentDescription] = useState(null);
    const [productReference, setProductReference] = useState(null);

    const { handleSubmit, control, watch } = useForm();
    useEffect(() => {
        const subscription = watch((data) => {   
            if(data.ImageAttachment){
                setFile(data.ImageAttachment[0]);
            }
            if(data.VideoAttachment){
                setVideo(data.VideoAttachment[0]);
            }         
            setContentName(data.contentName);
            setcontentDescription(data.contentDescription);
        });
        return () => subscription.unsubscribe();
    }, [watch]);
    
    useEffect(() => {
        if(productReference && video){
            console.log("Uploading video")
            uploadVideo(video);
        }
    } , [productReference, video]);

    const uploadVideo = (file) => {
        const storageRef = ref(storage, 'product-videos/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed', (snapshot) => {
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
                    const contentRef = doc(db, "content", productReference);
                    updateDoc(contentRef, { videoUrl: downloadURL }).then(() => {console.log("success")}).catch((e) => {console.log(e)});
                    });
                }
            );
        }
    const onSubmit = () => {
        if(file == null)
            return;
        const storageRef = ref(storage, 'product-images/' + file.name);
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
                    addDoc(collection(db, "content"), {
                        name: contentName,
                        description: contentDescription,
                        image: downloadURL,
                        userId: userRef,
                        shopId: productIndex
                    }).then((reference) => {console.log("success"); setProductReference(reference.id);}).catch((e) => {console.log(e)});
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
            // margin: "10px 300px",
        }}
        >
        <Typography variant="h6"> Nueva Entrada</Typography>

        <FormInputText name="contentName" control={control} label="Nombre" type="text" />
        
        <FormInputText name="contentDescription" control={control} label="Descripción" type="text"/>

        <Typography variant="overline" sx={{ marginBottom: "-16px" }}>Imagen del contenido</Typography>
        <FormInputFile name="ImageAttachment" control={control} label="File" />
        
        <Typography variant="overline" sx={{ marginBottom: "-16px" }}>Video (opcional)</Typography>
        <FormInputFile name="VideoAttachment" control={control} label="Video" />

        <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
            {" "}
            Submit{" "}
        </Button>

        </Paper>
    )
}

export default AddContent;

