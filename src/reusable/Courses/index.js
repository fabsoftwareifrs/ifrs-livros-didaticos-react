import React, { useEffect, useCallback, useState } from "react";

import { useQuery } from "@apollo/client";
import { AllCoursesQuery } from "src/graphql/queries/course";

import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

export const Courses = ({ field, error, onChange, data }) => {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState([]);
  const [value, setValue] = useState({ value: "", label: "" });

  const onCompleted = useCallback(
    (response) => {
      const options = response.courses?.map(({ id, name }) => ({
        value: id,
        label: name,
      }));
      setState(options);
      setLoading(false);
    },
    [setState]
  );

  useQuery(AllCoursesQuery, {
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
      name="courseId"
      options={state}
      onChange={(_, value) => {
        if (!value) {
          onChange({ name: "courseId", value: "" });
        } else {
          onChange({
            name: "courseId",
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
          helperText={!!error ? error : "Informe o curso do estudante"}
        />
      )}
    />
  );
};
