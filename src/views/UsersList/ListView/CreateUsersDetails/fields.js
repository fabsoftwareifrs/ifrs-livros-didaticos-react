export default {
    name:{
        label:'Nome',
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
    login:{
        label:'Login',
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
    password:{
        label:'Senha',
        type:'password',
        value:'',
        rules:{
            required:"Este campo é obrigatório",
            minLength:{
                value:3,
                message:"Mínimo de 3 caracteres"
            },
            
        }
    },
    accessLevel:{
        label:'Nível de acesso',
        type:'number',
        value:'',
        rules:{
            required:"Este campo é obrigatório",
        }
    }
}