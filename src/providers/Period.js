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

import React, {
  createContext,
  useReducer,
  useEffect,
  useContext,
  useCallback,
  useState,
} from "react";

import { useQuery } from "@apollo/client";
import { AllPeriodsQuery } from "src/graphql/queries";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useAuth } from "./Auth";
import { Button, CardHeader, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
//import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    minWidth: "40%",
  },
}));

const Context = createContext();

const initialState = {
  value: -1,
  label: "",
  showModal: false,
};

const SET_PERIOD = "SET_PERIOD";
const OPEN_MODAL = "OPEN_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";

export const setPeriod = (id) => ({ type: SET_PERIOD, payload: id });
export const openModal = () => ({ type: OPEN_MODAL });
export const closeModal = () => ({ type: CLOSE_MODAL });

const reducer = (state, { type, payload }) => {
  switch (type) {
    case SET_PERIOD: {
      return { ...state, ...payload, showModal: false };
    }
    case OPEN_MODAL: {
      return { ...state, showModal: true };
    }
    case CLOSE_MODAL:
      return { ...state, showModal: false };
    default:
      return state;
  }
};

export const usePeriod = () => {
  const [state, dispatch] = useContext(Context);
  if (state === undefined)
    throw new Error("usePeriod deve ser utilizado dentro de um PeriodProvider");

  return [state, dispatch];
};

const PeriodProvider = ({ children }) => {
  const classes = useStyles();
  const localState = JSON.parse(localStorage.getItem("period"));
  const [state, dispatch] = useReducer(reducer, localState || initialState);
  const { auth } = useAuth();

  useEffect(() => {
    localStorage.setItem("period", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (state.value === -1 && !state.showModal) {
      dispatch(openModal());
    }
  }, [state.value, state.showModal]);

  return (
    <Context.Provider value={[state, dispatch]}>
      {auth.isAuthenticated && state.showModal && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={state.showModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={state.showModal}>
            <div className={classes.paper}>
              <Period />
            </div>
          </Fade>
        </Modal>
      )}
      {children}
    </Context.Provider>
  );
};

const Period = () => {
  const [period, dispatch] = usePeriod();
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(period);
  const [loading, isLoading] = useState(true);
  const onCompleted = useCallback(
    (response) => {
      const options = response.periods?.map(({ id, name }) => ({
        value: +id,
        label: name,
      }));
      setOptions(options);
      isLoading(false);
    },
    [setOptions]
  );

  useQuery(AllPeriodsQuery, {
    fetchPolicy: "cache-and-network",
    onCompleted,
  });

  const handleChange = (periodId) => {
    const found = options.find(({ value }) => value === periodId);
    dispatch(setPeriod(found));
  };

  if (loading) return <p>Aguarde...</p>;

  return (
    <>
      <CardHeader
        subheader={"Selecione o período que deseja utilizar como parâmetro."}
        title="Selecionar Período"
      />
      <div>
        <Autocomplete
          options={options}
          value={value}
          onChange={(_, value) => setValue(value)}
          style={{ margin: "0 16px" }}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => <TextField {...params} label="Selecione" />}
        />
        <Button
          variant="contained"
          style={{
            width: 100,
            margin: 10,
            backgroundColor: "#8B0000",
            color: "#fff",
          }}
          onClick={() => dispatch(closeModal())}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          style={{
            width: 100,
            margin: 10,
            backgroundColor: "#17882c",
            color: "#fff",
          }}
          onClick={() => handleChange(+value.value)}
        >
          Salvar
        </Button>
      </div>
    </>
  );
};

export default PeriodProvider;
