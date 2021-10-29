import React from "react";
import { TextField } from "@material-ui/core";

export const Field = ({ name, field, error, icon, ...rest }) => {
  return (
    <TextField
      error={!!error}
      fullWidth
      helperText={!!error ? error : field.placeholder}
      label={field.label}
      name={name}
      type={field.type}
      value={field.value}
      variant="outlined"
      {...rest}
    />
  );
};
