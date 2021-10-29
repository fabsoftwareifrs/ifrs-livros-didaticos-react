import React, { useEffect, useState } from "react";

import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

export const Status = ({ field, error, onChange, data }) => {
  const [state] = useState([
    { value: "MISPLACED", label: "Extraviado" },
    { value: "AVAILABLE", label: "Disponível" },
    { value: "LOANED", label: "Emprestado" },
  ]);
  const [value, setValue] = useState({ value: "", label: "" });

  useEffect(() => {
    setValue({
      value: `${field.value}`,
      label: state.find((s) => s.value === `${field.value}`)?.label || "",
    });
  }, [state, field.value]);

  return (
    <Autocomplete
      name="status"
      options={state}
      onChange={(_, value) => {
        if (!value) {
          onChange({ name: "status", value: "" });
        } else {
          onChange({
            name: "status",
            value: value.value,
          });
        }
      }}
      value={value}
      getOptionLabel={(option) => option.label}
      getOptionSelected={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField
          {...params}
          label={field.label}
          variant="outlined"
          error={!!error}
          helperText={!!error ? error : "Informe a situação do livro"}
        />
      )}
    />
  );
};
