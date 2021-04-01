export default {
    name: {
        label: 'Título',
        type: 'text',
        value: '',
        rules: {
            required: "Este campo é obrigatório",
            minLength: {
                value: 3,
                message: "Mínimo de 3 caracteres"
            }
        }
    },
    author: {
        label: 'Autor',
        type: 'text',
        value: '',
        rules: {
            required: "Este campo é obrigatório",
            minLength: {
                value: 3,
                message: "Mínimo de 3 caracteres"
            }
        }
    },
    volume: {
        label: 'Volume',
        type: 'text',
        value: '',
        rules: {
            required: "Este campo é obrigatório",

        }
    },
    categoryId: {
        label: 'Categoria',
        type: 'number',
        value: '',
        rules: {
            required: "Este campo é obrigatório",
        }
    },
}