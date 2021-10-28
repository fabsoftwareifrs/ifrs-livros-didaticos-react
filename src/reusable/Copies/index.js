import React, { useEffect, useCallback, useState } from "react";

import { useQuery } from "@apollo/client";
import { AvailableCopiesQuery } from "src/graphql/queries";

import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

export const Copies = ({ field, error, onChange, data }) => {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState([]);
  const [value, setValue] = useState({ value: "", label: "" });
  console.log("Value: ", field.value);
  const onCompleted = useCallback(
    (response) => {
      const options = response.availableCopies?.map(({ id, code }) => ({
        value: id,
        label: code,
      }));
      setState(options);
      setLoading(false);
    },
    [setState]
  );

  useQuery(AvailableCopiesQuery, {
    skip: !!data,
    fetchPolicy: "cache-and-network",
    onCompleted,
  });

  useEffect(() => {
    console.log("oi", state, field.value);
    setValue({
      value: `${field.value}`,
      label: state.find((s) => s.value === `${field.value}`)?.label || "",
    });
  }, [state, field.value]);

  useEffect(() => {
    async function fetchData() {
      if (data !== undefined) {
        setLoading(true);
        const options = data.map(({ id, name }) => ({
          value: id,
          label: name,
        }));
        setState(options);
        setLoading(false);
      }
    }
    fetchData();
  }, [data]);

  return (
    <Autocomplete
      name="copyId"
      options={state}
      onChange={(_, value) => {
        if (!value) {
          onChange({ name: "copyId", value: "" });
        } else {
          onChange({
            name: "copyId",
            value: +value.value,
          });
        }
      }}
      disabled={loading}
      value={value}
      getOptionLabel={(option) => option.label}
      getOptionSelected={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField
          {...params}
          label={field.label}
          variant="outlined"
          error={!!error}
          helperText={!!error ? error : "Informe o exemplar"}
        />
      )}
    />
  );
};
