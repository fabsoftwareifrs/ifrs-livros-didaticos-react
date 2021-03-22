export default {
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
    }
}