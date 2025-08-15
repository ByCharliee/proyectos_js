import AdminCita from "./Classes/AdminCita.js";
import Notificacion from "./Classes/Notificacion.js";
import { formulario, registrar, pacienteInput, propietarioInput, emailInput, fechaInput, sintomasInput } from "./selectores.js";
import { citaObj, editando } from "./variables.js";
import { DB } from "./Database/database.js";


const administrarCita = new AdminCita();
export function datosCita(e){

    console.log(citaObj);
    //Validar email
    if(e.target.name === 'email'){
       const validacion = validarEmail(e.target.value)

       if(validacion){
           citaObj[e.target.name]=e.target.value;
               console.log(citaObj);

           return;
       }
       else {
           new Notificacion({
               texto: 'Ingresa un correo electrónico válido',
               tipo: 'error'
           })
           console.log(citaObj);

           return;
       }
   }

   citaObj[e.target.name]=e.target.value;
   console.log(citaObj);

  

}

export function validarEmail(email){
   const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
   const resultado = regex.test(email);
   
   return resultado;
}

export function submitFormulario(e){
   e.preventDefault();

   if (Object.values(citaObj).some(value => value.trim() === '')) {
       new Notificacion({
           texto: "Todos los campos son obligatorios",
           tipo: 'error'
       })
       return;
   }


   //Verificar editando
   if(editando.value){
       administrarCita.editarCita({...citaObj});
   }else{
       //Añadir la cita al arreglo
       administrarCita.agregarCita({...citaObj});

       //Insertar registro a la tabla
       const transaction = DB.transaction(['citas'], 'readwrite');

       //Habilitar el object store
       const objectStore = transaction.objectStore('citas');

       //Añadir registro
       objectStore.add(citaObj);

       transaction.oncomplete = () => {
            console.log("Registro ingresado correctamente");

            //Mostrar mensaje de éxito
            new Notificacion({
            texto: "Cita agregada con éxito"
            });

            administrarCita.mostrarCita();
          
        }

      
   }

  



   //Resetear formulario   
   formulario.reset();
   resetearObjeto();
   registrar.value = 'Registrar Paciente';
   editando.value = false;


}

export function generarId(){
   return Math.random().toString(36).substring(2) + Date.now();
}

export function resetearObjeto(){
   for(let key in citaObj){
       citaObj[key]= '';
       if(key == 'id') citaObj[key] =  generarId();
       console.log(key + ": " + citaObj[key]);
   }
}

export function cargarEditar(cita){
   
   Object.assign(citaObj, cita);

   pacienteInput.value = citaObj.paciente
   propietarioInput.value = citaObj.propietario
   emailInput.value = citaObj.email
   fechaInput.value = citaObj.fecha
   sintomasInput.value = citaObj.sintomas

   editando.value = true;
   registrar.value = "Guardar Cambios";
}