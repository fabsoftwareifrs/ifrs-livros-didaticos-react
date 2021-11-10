import React, { useCallback, useState } from "react";

import { useQuery } from "@apollo/client";
import { AvailableCopiesQuery } from "src/graphql/queries";

import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

// Esse componente renderiza apenas com cópias disponíveis
export const Copies = ({ field, error, onChange, data, idCopyInclude }) => {
  const [state, setState] = useState([]);
  const [search, setSearch] = useState("");
  const [selecteds, setSelecteds] = useState([]);
  const onCompleted = useCallback(
    (response) => {
      const options = response.availableCopies?.map(({ id, code, book }) => ({
        value: id,
        label: code,
        book,
      }));
      setState(options);
    },
    [setState]
  );

  const { loading, refetch } = useQuery(AvailableCopiesQuery, {
    variables: {
      idCopyInclude: +idCopyInclude,
      search: search,
      selecteds: selecteds,
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
      name="copiesIds"
      multiple
      options={state}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === "Tab") {
          e.preventDefault();
        }
      }}
      onChange={(_, value) => {
        let values = [];
        value.forEach(function (val) {
          values.push(val.value);
        });
        onChange({ name: "copiesIds", value: values });
        setSelecteds(values);
        refetchData();
      }}
      loading={loading}
      getOptionLabel={(option) => option.label + " (" + option.book.name + ")"}
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
          helperText={!!error ? error : "Informe o exemplar"}
        />
      )}
    />
  );
};
