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
   
    return errors;
}