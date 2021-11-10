/*
 * This file is part of LMS Livros Didáticos.
 *
 * LMS Livros Didáticos is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License.
 *
 * LMS Livros Didáticos is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Foobar.  If not, see <https://www.gnu.org/licenses/>
 */

import { useState, useCallback, useMemo, createRef } from "react";

const useMyForm = (initialState, data = {}) => {
  const [errors, setErrors] = useState({});
  const [fields, setFields] = useState(
    Object.entries(initialState).reduce((prev, [key, field]) => {
      const value = field.mask ? field.mask(data[key] || "") : data[key];
      return {
        ...prev,
        [key]: {
          ...field,
          name: key,
          value: field.type !== "file" ? value || field.value : field.value,
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

  const handleChange = ({ name, value, type, ...rest }) => {
    const field = fields[name];
    const valueTyped =
      type === "number" ? +value : type === "checkbox" ? rest.checked : value;
    const valueFormatted = field.mask ? field.mask(valueTyped) : valueTyped;
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

  const setValues = useCallback(
    (values) => {
      setFields(
        Object.entries(initialState).reduce((previous, [key, field]) => {
          const value = field.mask
            ? field.mask(values[key] || "")
            : values[key];

          return {
            ...previous,
            [key]: {
              ...field,
              value: field.type !== "file" ? value || field.value : field.value,
            },
          };
        }, {})
      );
    },
    [initialState]
  );

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
                [key]:
                  field.type === "number" ? field.value || null : field.value,
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
