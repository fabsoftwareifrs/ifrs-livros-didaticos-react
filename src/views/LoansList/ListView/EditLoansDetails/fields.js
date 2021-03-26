export default {
    id:{
        type:'hidden',
        value:'',
    },
    
    student_id:{
        label:'Estudante',
        type:'text',
        value:'',
        rules:{
            required:"Este campo é obrigatório",
            
        }
    },
    book_id:{
        label:'Livro',
        type:'number',
        value:'',
        rules:{
            required:"Este campo é obrigatório",
        }
    },
    period_id:{
        label:'Período letivo',
        type:'number',
        value:'',
        rules:{
            required:"Este campo é obrigatório",
        }
    },
}