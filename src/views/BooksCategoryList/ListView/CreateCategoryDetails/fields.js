export default {
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