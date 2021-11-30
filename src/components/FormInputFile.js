
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";

export const FormInputFile = ({ name, control, label, type }) => {

    return (
        <Controller
          name="attachments"
          control={control}
          defaultValue=""
          render={({ field, field: { value },
            fieldState: { error },
            formState, }) => (
            <TextField
                helperText={error ? error.message : null}
                size="small"
                type= "file"
                error={!!error}
                onChange={(e) => {
                    field.onChange(e.target.files);
                }}
                fullWidth
                variant="outlined"
            />
          )}
            
        />
    );
};