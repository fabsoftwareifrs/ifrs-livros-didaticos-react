import { useState, useCallback, useMemo, createRef } from "react";

const useMyForm = (initialState) => {
  const [errors, setErrors] = useState({});
  const [fields, setFields] = useState(
    Object.entries(initialState).reduce((prev, [key, field]) => {
      return {
        ...prev,
        [key]: {
          ...field,
          name: key,
          touched: false,
          ref: createRef(),
        },
      };
    }, {})
  );

  const isVisible = useCallback(
    (dependencies) =>
      dependencies === undefined ||
      dependencies.every(({ name, value }) => fields[name].value === value),
    [fields]
  );

  const fieldsForm = useMemo(() => {
    return Object.entries(fields).reduce(
      (prev, [key, field]) => ({
        ...prev,
        [key]: {
          ...field,
          visible: isVisible(field.dependencies),
        },
      }),
      {}
    );
  }, [fields, isVisible]);

  const setTouched = ({ name, value }) => {
    const field = fields[name];

    const valueFormatted = field.mask ? field.mask(value) : value;
    const error = validateField(field, valueFormatted);
    setErrors((prev) => ({ ...prev, [name]: error }));
    setFields((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        touched: true,
      },
    }));
  };

  const handleChange = ({ name, value }) => {
    const field = fields[name];

    const valueFormatted = field.mask ? field.mask(value) : value;
    const error = validateField(field, valueFormatted);
    setErrors((prev) => ({ ...prev, [name]: error }));
    setFields((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value: field.type !== "file" || !error ? valueFormatted : "",
      },
    }));
  };

  const validateField = useCallback(
    (field, v) => {
      const value = v || field.value;
      let error = null;

      if (isVisible(field.dependencies) && field.rules) {
        if (field.rules.required && !value) {
          error = field.rules.required.message || field.rules.required;
        } else if (
          field.rules.size &&
          field.type === "file" &&
          value &&
          value.some((file) => file.size > field.rules.size.value)
        ) {
          error = field.rules.size.message;
        } else if (
          field.rules.minLength &&
          value.toString().length < field.rules.minLength.value
        ) {
          error = field.rules.minLength.message;
        } else if (
          field.rules.maxLength &&
          value.toString().length > field.rules.maxLength.value
        ) {
          error = field.rules.maxLength.message;
        } else if (
          value.toString() &&
          field.rules.pattern &&
          !field.rules.pattern.value.test(value.toString())
        ) {
          error = field.rules.pattern.message;
        }
      }

      if (
        !isVisible(field.dependencies) &&
        field.value !== initialState[field.name].value
      ) {
        setFields((prev) => ({
          ...prev,
          [field.name]: {
            ...prev[field.name],
            value: initialState[field.name].value,
          },
        }));
      }

      return error;
    },
    [isVisible, initialState, setFields]
  );

  const setValues = (values) => {
    setFields(
      Object.entries(fields).reduce((previous, [key, field]) => {
        const value = field.mask ? field.mask(values[key]) : values[key];

        return {
          ...previous,
          [key]: {
            ...field,
            value: field.type !== "file" ? value || field.value : field.value,
          },
        };
      }, {})
    );
  };

  const validate = useCallback(() => {
    let erros = {};
    Object.entries(fields).forEach(([key, field]) => {
      const error = validateField(field);
      if (error) {
        erros = {
          ...erros,
          [key]: field.rules.required.message || field.rules.required,
        };
      }
    });
    setErrors(erros);
    return Object.entries(erros).length === 0;
  }, [fields, validateField]);

  const reset = () => setFields(initialState);

  const handleSubmit = useCallback(
    (cb) => {
      return async (e) => {
        e.preventDefault();
        if (validate()) {
          await cb(
            Object.entries(fields).reduce(
              (previous, [key, field]) => ({
                ...previous,
                [key]: field.value,
              }),
              {}
            )
          );
        }
      };
    },
    [validate, fields]
  );

  return {
    fields: fieldsForm,
    errors,
    handleSubmit,
    handleChange,
    setValues,
    setTouched,
    reset,
  };
};

export default useMyForm;
