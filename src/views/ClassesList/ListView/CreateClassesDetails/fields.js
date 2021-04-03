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
    courseId:{
        label:'Curso',
        type:'number',
        value:'',
        rules:{
            required:"Este campo é obrigatório",
        }
    }
}