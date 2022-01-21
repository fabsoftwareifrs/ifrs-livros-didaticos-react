import React, { useCallback, useState } from "react";

import { useQuery } from "@apollo/client";
import { SearchStudentsQuery } from "src/graphql/queries/students";

import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

export const Students = ({ field, error, onChange, data }) => {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");

  const onCompleted = useCallback(
    (response) => {
      const options = response.searchStudents?.map(({ id, name }) => ({
        value: id,
        label: name,
      }));
      setState(options);
      setLoading(false);
    },
    [setState]
  );

  const { refetch } = useQuery(SearchStudentsQuery, {
    variables: {
      search: search,
      selected: selected,
    },
    skip: !!data,
    fetchPolicy: "cache-and-network",
    onCompleted,
  });

  function refetchData() {
    setState([]);
    refetch();
  }

  return (
    <Autocomplete
      name="studentId"
      options={state}
      filterOptions={(options, state) => options}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === "Tab") {
          e.preventDefault();
        }
      }}
      onChange={(_, value) => {
        onChange({ name: "studentId", value: value ? +value.value : "" });
        setSelected(value ? value.value : "");
        refetchData();
      }}
      loading={loading}
      getOptionLabel={(option) => option.label}
      getOptionSelected={(option, value) => option.value === value.value}
      renderInput={(params) => (
        <TextField
          {...params}
          label={field.label}
          variant="outlined"
          tabIndex="-1"
          onChange={(e) => {
            setSearch(e.target.value);
            refetchData();
          }}
          error={!!error}
          helperText={!!error ? error : "Informe o estudante"}
        />
      )}
    />
  );
};
