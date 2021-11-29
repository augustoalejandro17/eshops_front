import React from 'react'

import { Button, Paper, Typography } from "@mui/material";
// import { FormProvider, useForm } from "react-hook-form";
import { FormInputText } from "components/FormInputText";
import { FormInputFile } from "components/FormInputFile";

import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";


const AddShop = () => {
    const { handleSubmit, reset, control, setValue, watch, register } = useForm();
    const onSubmit = data => console.log(data.attachments[0]);

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

        <FormInputText name="textValue" control={control} label="Nombre de la Tienda" type="text" />
        
        <FormInputText name="descriptionValue" control={control} label="Descripción" type="text"/>

        <FormInputFile name="FileValue" control={control} label="File" />

    
        <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
            {" "}
            Submit{" "}
        </Button>

        </Paper>
    )
}

export default AddShop
