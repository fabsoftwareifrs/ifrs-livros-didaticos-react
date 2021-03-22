export default {
    id:{
        type:'hidden',
        value:'',
    },
    name:{
        label:'Título',
        type:'text',
        value:'',
        rules:{
            required:"Este campo é obrigatório",
            minLength:{
                value:3,
                message:"Mínimo de 3 caracteres"
            }
        }
    },
    code:{
        label:'Código',
        type:'text',
        value:'',
        rules:{
            required:"Este campo é obrigatório",
            minLength:{
                value:3,
                message:"Mínimo de 3 caracteres"
            }
        }
    },
    author:{
        label:'Autor',
        type:'text',
        value:'',
        rules:{
            required:"Este campo é obrigatório",
            minLength:{
                value:3,
                message:"Mínimo de 3 caracteres"
            }
        }
    },
    volume:{
        label:'Volume',
        type:'text',
        value:'',
        rules:{
            required:"Este campo é obrigatório",
            
        }
    },
    quantity:{
        label:'Quantidade',
        type:'number',
        value:'',
        rules:{
            required:"Este campo é obrigatório",
        }
    }
}