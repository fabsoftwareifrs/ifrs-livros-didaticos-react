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

const fields = {
  name: {
    label: "Título",
    type: "text",
    value: "",
    rules: {
      required: "Este campo é obrigatório",
      minLength: {
        value: 3,
        message: "Mínimo de 3 caracteres",
      },
    },
  },
  author: {
    label: "Autor",
    type: "text",
    value: "",
    rules: {
      required: "Este campo é obrigatório",
      minLength: {
        value: 3,
        message: "Mínimo de 3 caracteres",
      },
    },
  },
  volume: {
    label: "Volume",
    type: "text",
    value: "",
    rules: {
      required: "Este campo é obrigatório",
    },
  },
  year: {
    label: "Ano",
    type: "number",
    value: null,
    placeholder: "Informe o ano do Livro",
  },
  isbn: {
    label: "ISBN",
    type: "text",
    value: "",
    placeholder: "Informe o ISBN do livro",
    rules: {},
  },
  categoryId: {
    label: "Categoria",
    type: "number",
    value: "",
    rules: {
      required: "Este campo é obrigatório",
    },
  },
};

export default fields;
