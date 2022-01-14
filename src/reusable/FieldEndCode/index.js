import React from "react";
import { Checkbox, TextField } from "@material-ui/core";

export const FieldEndCode = ({ name, field, error, icon, search, ...rest }) => {
  if (field.type === "checkbox")
    return <Checkbox name={name} checked={field.value} {...rest} />;

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
      onKeyPress={(e) => {
        if (e.key === "Enter" || e.target.value.length >= 8) {
          e.preventDefault();
          search(e.target.value);
        }
      }}
      {...rest}
    />
  );
};
