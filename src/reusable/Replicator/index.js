import React, { useEffect, useState } from "react";

import { IconButton } from "@material-ui/core";
import { Plus, Minus } from "react-feather";

export const Replicator = ({ name, max, children, handleChange }) => {
  const [state, setState] = useState([{}]);
  const [isDisabledAdd, setIsDisabledAdd] = useState(true);
  const [isDisabledRemove, setIsDisabledRemove] = useState(true);

  const setNewState = (s) => {
    setState(s);
    handleChange({ name, value: s, type: "replicador" });
  };

  const onChange = ({ name, value }, idx) =>
    setNewState([
      ...state.slice(0, idx),
      { ...state[idx], [name]: value },
      ...state.slice(idx + 1),
    ]);

  const add = () => {
    if (state.length >= max) return;
    setNewState([...state, {}]);
  };
  const remove = (idx) => {
    if (state.length <= 1) return;
    setNewState([...state.slice(0, idx), ...state.slice(idx + 1)]);
  };

  useEffect(() => {
    setIsDisabledAdd(state.length >= max);
    setIsDisabledRemove(state.length <= 1);
  }, [state.length, max]);

  return (
    <div>
      {state.map((value, idx) => (
        <div key={idx} style={{ display: "flex" }}>
          {React.Children.map(children, (child) =>
            React.cloneElement(child, {
              style: { ...child.style, flex: 1 },
              field: { ...child.field, value: state[idx][child.name] },
              onChange:
                child.type.name === "Field"
                  ? ({ target }) => onChange(target, idx)
                  : (target) => onChange(target, idx),
            })
          )}

          <IconButton
            style={{ alignSelf: "center" }}
            type="button"
            size="small"
            color="primary"
            disabled={isDisabledAdd}
            onClick={add}
          >
            <Plus />
          </IconButton>
          <IconButton
            style={{ alignSelf: "center" }}
            type="button"
            size="small"
            color="secondary"
            disabled={isDisabledRemove}
            onClick={() => remove(idx)}
          >
            <Minus />
          </IconButton>
        </div>
      ))}
    </div>
  );
};
