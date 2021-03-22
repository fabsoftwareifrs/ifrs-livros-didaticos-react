export default {
    id:{
        type:'hidden',
        value:'',
    },
    name:{
        label:'Categoria',
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
    
}