import React, { useCallback } from "react";

import { TextField } from "@material-ui/core";

export const UploadInput = ({
  name,
  field,
  error,
  onFocus,
  onChange,
  ...rest
}) => {
  const handleChange = useCallback(
    (e) => {
      const filesList = e.target.files;
      const length = filesList.length;
      const files = [];
      for (let i = 0; i < length; i++) {
        files.push(filesList.item(i));
      }

      onChange({ name, value: files });
    },
    [onChange, name]
  );

  return (
    <TextField
      error={!!error}
      fullWidth
      helperText={!!error ? error : "Selecione o arquivo"}
      // inputProps={{
      //   accept: ".csv",
      // }}
      name={name}
      type="file"
      onChange={handleChange}
      variant="outlined"
      {...rest}
    />
  );
};
