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

import React from "react";
import { useMutation } from "@apollo/client";
import { SIGN_IN } from "src/graphql/mutations";
import { login as AuthLogin, useAuth } from "src/providers/Auth";
import useMyForm from "src/hooks/MyForm";
import { fields } from "./fields";
import { Box, Button, TextField, Typography } from "@material-ui/core";

const LoginView = () => {
  const { dispatch } = useAuth();
  const {
    fields: input,
    errors,
    handleSubmit,
    handleChange,
  } = useMyForm(fields);

  const [mutationLogin, { loading, error: mutationError }] = useMutation(
    SIGN_IN,
    {
      onError() {},
      onCompleted({ login }) {
        dispatch(AuthLogin(login.user, login.token));
      },
    }
  );
  const onSubmit = async (data) => {
    await mutationLogin({ variables: { input: data } });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box mb={3}>
        <Typography color="textPrimary" variant="h2">
          Entrar
        </Typography>
        <Typography color="textSecondary" gutterBottom variant="body2">
          Entre no gerenciador de livros didáticos
        </Typography>
        <Typography style={{ color: "red" }} gutterBottom variant="body2">
          {mutationError && "Usuário ou senha incorretos"}
        </Typography>
      </Box>

      <TextField
        error={!!errors.login}
        fullWidth
        label={input.login.label}
        margin="normal"
        name="login"
        type={input.login.type}
        onChange={({ target }) => handleChange(target)}
        value={input.login.value}
        variant="outlined"
        helperText={errors.login}
      />

      <TextField
        error={!!errors.password}
        fullWidth
        label={input.password.label}
        margin="normal"
        name="password"
        type={input.password.type}
        onChange={({ target }) => handleChange(target)}
        value={input.password.value}
        helperText={errors.password}
        variant="outlined"
      />

      <Box my={2}>
        <Button
          color="primary"
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={loading}
        >
          Entrar
        </Button>
      </Box>
    </form>
  );
};

export default LoginView;
