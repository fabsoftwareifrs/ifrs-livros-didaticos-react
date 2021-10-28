import React, { useEffect, useCallback, useState } from "react";

import { useQuery } from "@apollo/client";
import { AllStudentsQuery } from "src/graphql/queries/students";

import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

export const Students = ({ field, error, onChange, data }) => {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState([]);
  const [value, setValue] = useState({ value: "", label: "" });

  const onCompleted = useCallback(
    (response) => {
      const options = response.students?.map(({ id, name }) => ({
        value: id,
        label: name,
      }));
      setState(options);
      setLoading(false);
    },
    [setState]
  );

  useQuery(AllStudentsQuery, {
    skip: !!data,
    fetchPolicy: "cache-and-network",
    onCompleted,
  });

  useEffect(() => {
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
      name="studentId"
      options={state}
      onChange={(_, value) => {
        if (!value) {
          onChange({ name: "studentId", value: "" });
        } else {
          onChange({
            name: "studentId",
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
          helperText={!!error ? error : "Informe o estudante"}
        />
      )}
    />
  );
};
