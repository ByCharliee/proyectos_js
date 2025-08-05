import {pacienteInput,propietarioInput, emailInput,fechaInput,sintomasInput, formulario} from "./selectores.js"
import { datosCita, submitFormulario } from "./funciones.js";

//Eventos 
eventosListeners();

function eventosListeners(){
    pacienteInput.addEventListener('blur', datosCita);
    propietarioInput.addEventListener('blur', datosCita);
    emailInput.addEventListener('blur', datosCita);
    fechaInput.addEventListener('blur', datosCita);
    sintomasInput.addEventListener('blur', datosCita);
    formulario.addEventListener('submit', submitFormulario);
}





