import React, { useEffect, useCallback, useState } from "react";

import { useQuery } from "@apollo/client";
import { CLASSES_BY_COURSE_ID } from "src/graphql/queries/class";

import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

export const Classes = ({ field, error, onChange, courseId, data }) => {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState([]);
  const [value, setValue] = useState({ value: "", label: "" });

  const onCompleted = useCallback(
    (response) => {
      const options = response.classes?.map(({ id, name }) => ({
        value: id,
        label: name,
      }));
      setState(options);
      setLoading(false);
    },
    [setState]
  );

  const { refetch } = useQuery(CLASSES_BY_COURSE_ID, {
    skip: true,
    fetchPolicy: "cache-and-network",
    variables: { input: { courseId } },
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

  useEffect(() => {
    async function fetchData() {
      if (courseId !== "") {
        setLoading(true);
        const {
          data: { classesByCourseId },
        } = await refetch({ courseId });

        const options = classesByCourseId.map(({ id, name }) => ({
          value: id,
          label: name,
        }));
        setState(options);

        setLoading(false);
      }
    }
    fetchData();
  }, [refetch, courseId]);

  return (
    <Autocomplete
      name="classId"
      options={state}
      onChange={(_, value) => {
        if (!value) {
          onChange({ name: "classId", value: "" });
        } else {
          onChange({
            name: "classId",
            value: +value.value,
          });
        }
      }}
      disabled={!courseId || loading}
      value={value}
      getOptionLabel={(option) => option.label}
      getOptionSelected={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField
          {...params}
          label={field.label}
          variant="outlined"
          error={!!error}
          helperText={!!error ? error : "Informe a turma do estudante"}
        />
      )}
    />
  );
};
