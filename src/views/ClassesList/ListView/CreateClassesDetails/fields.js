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
    course_id:{
        label:'Curso',
        type:'number',
        rules:{
            required:"Este campo é obrigatório",
        }
    }
}