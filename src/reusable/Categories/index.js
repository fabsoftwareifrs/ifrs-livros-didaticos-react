import React, { useEffect, useCallback, useState } from "react";

import { useQuery } from "@apollo/client";
import { AllCategoriesQuery } from "src/graphql/queries/categories";

import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

export const Categories = ({ field, error, onChange, data }) => {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState([]);
  const [value, setValue] = useState({ value: "", label: "" });

  const onCompleted = useCallback(
    (response) => {
      const options = response.categories?.map(({ id, name }) => ({
        value: id,
        label: name,
      }));
      setState(options);
      setLoading(false);
    },
    [setState]
  );

  useQuery(AllCategoriesQuery, {
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
      name="categoryId"
      options={state}
      onChange={(_, value) => {
        if (!value) {
          onChange({ name: "categoryId", value: "" });
        } else {
          onChange({
            name: "categoryId",
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
          helperText={!!error ? error : "Informe a categoria do livro"}
        />
      )}
    />
  );
};
