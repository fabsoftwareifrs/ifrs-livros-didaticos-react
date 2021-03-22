export default {
    id:{
        type:'hidden',
        value:'',
    },
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
    email:{
        label:'E-mail',
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
    matriculation:{
        label:'Matrícula',
        type:'text',
        value:'',
        rules:{
            required:"Este campo é obrigatório",
            minLength:{
                value:3,
                message:"Mínimo de 3 caracteres"
            },
            
        }
    },
    course_id:{
        label:'Curso',
        type:'number',
        rules:{
            required:"Este campo é obrigatório",
        }
    },
    class_id:{
        label:'Turma',
        type:'number',
        rules:{
            required:"Este campo é obrigatório",
        }
    }
}