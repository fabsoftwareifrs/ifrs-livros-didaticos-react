import React, { useEffect, useCallback, useState } from "react";

import { useQuery } from "@apollo/client";
import { AllPeriodsQuery } from "src/graphql/queries";

import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

export const Periods = ({ field, error, onChange, data }) => {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState([]);
  const [value, setValue] = useState({ value: "", label: "" });

  const onCompleted = useCallback(
    (response) => {
      const options = response.periods?.map(({ id, name }) => ({
        value: id,
        label: name,
      }));
      setState(options);
      setLoading(false);
    },
    [setState]
  );

  useQuery(AllPeriodsQuery, {
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
      name="periodId"
      options={state}
      onChange={(_, value) => {
        if (!value) {
          onChange({ name: "periodId", value: "" });
        } else {
          onChange({
            name: "periodId",
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
          label="Período Letivo"
          variant="outlined"
          error={!!error}
          // helperText={!!error ? error : "Informe o período"}
        />
      )}
    />
  );
};
