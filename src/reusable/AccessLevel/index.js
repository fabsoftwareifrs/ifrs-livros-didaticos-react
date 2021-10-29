import React, { useEffect, useState } from "react";

import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

export const AccessLevel = ({ field, error, onChange }) => {
  const [state] = useState([{ value: 1, label: "Administrador" }]);
  const [value, setValue] = useState({ value: "", label: "" });

  useEffect(() => {
    setValue({
      value: field.value,
      label: state.find((s) => s.value === field.value)?.label || "",
    });
  }, [state, field.value]);

  return (
    <Autocomplete
      name="accessLevel"
      options={state}
      onChange={(_, value) => {
        if (!value) {
          onChange({ name: "accessLevel", value: "" });
        } else {
          onChange({
            name: "accessLevel",
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
          helperText={!!error ? error : "Informe o nível de acesso do usuário."}
        />
      )}
    />
  );
};
