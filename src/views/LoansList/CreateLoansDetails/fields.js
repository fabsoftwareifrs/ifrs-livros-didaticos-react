export default {
    // $id:ID!, $withdrawDate:Date!, $loanDays:Int!, $delivered:Boolean!, $studentId: Int!, $bookId: Int!, $userId: Int!
    withdrawDate:{
        label:'Dara de Retirada',
        type:'date',
        value:'',
        rules:{
            required:"Este campo é obrigatório"
        }
    },
    loanDays:{
        label:'Dias de Empréstimo',
        type:'number',
        value:'',
        rules:{
            required:"Este campo é obrigatório"
        }
    },
    delivered:{
        label:'Entrege',
        type:'bool',
        value:'',
        rules:{
            required:"Este campo é obrigatório"
        }
    },
    studentId:{
        label:'Estudante',
        type:'text',
        value:'',
        rules:{
            required:"Este campo é obrigatório",
            
        }
    },
    bookId:{
        label:'Livro',
        type:'number',
        value:'',
        rules:{
            required:"Este campo é obrigatório",
        }
    },
    userId:{
        label:'Usuário',
        type:'number',
        value:'',
        rules:{
            required:"Este campo é obrigatório",
        }
    }
}