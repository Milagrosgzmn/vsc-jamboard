/* eslint-disable no-prototype-builtins */
export default function validation (input){
    let errors = {};
    if(input.hasOwnProperty('name')){
         if (input.name===''){
        errors.name= 'Nombre requerido'
        }
        if (input.name.length>36) {
            errors.name='Máximo 35 caracteres';
        }
    }
    if(input.hasOwnProperty('description')){
       if (input.description.length>251) {
           errors.description='Máximo 250 caracteres';
       }
   }
   
    return errors;
}