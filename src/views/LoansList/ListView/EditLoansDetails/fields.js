export default {
    id: {
        type: 'hidden',
        value: '',
    },

    studentId: {
        label: 'Estudante',
        type: 'number',
        value: '',
        rules: {
            required: "Este campo é obrigatório",

        }
    },
    copyId: {
        label: 'Exemplar',
        type: 'number',
        value: '',
        rules: {
            required: "Este campo é obrigatório",
        }
    },
    periodId: {
        label: 'Período letivo',
        type: 'number',
        value: '',
        rules: {
            required: "Este campo é obrigatório",
        }
    },
}