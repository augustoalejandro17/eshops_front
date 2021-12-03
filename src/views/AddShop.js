import React, {useState} from 'react'

import { Button, Paper, Typography } from "@mui/material";
// import { FormProvider, useForm } from "react-hook-form";
import { FormInputText } from "components/FormInputText";
import { FormInputFile } from "components/FormInputFile";

import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";


const AddShop = () => {
    const [file, setFile] = useState(null);
    const [shopName, setShopName] = useState(null);
    const [shopDescription, setShopDescription] = useState(null);

    const { handleSubmit, reset, control, setValue, watch, register } = useForm();
    const onSubmit = data => {
        setFile(data.attachments[0]);
        setShopName(data.shopName);
        setShopDescription(data.shopDescription);
        console.log(file, shopName, shopDescription);
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

        <FormInputFile name="FileValue" control={control} label="File" />

    
        <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
            {" "}
            Submit{" "}
        </Button>

        </Paper>
    )
}

export default AddShop
