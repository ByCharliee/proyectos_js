import { obtenerCliente, editarCliente} from "./API.js";
import {mostrarAlerta, validarFormulario} from './funciones.js';



const nombreInput = document.querySelector('#nombre');
const idInput = document.querySelector('#id');
const emailInput = document.querySelector('#email');
const telefonoInput = document.querySelector('#telefono');
const empresaInput = document.querySelector('#empresa');


document.addEventListener('DOMContentLoaded', async () => {
    
    const parametrosURL = new URLSearchParams(window.location.search);
    const idCliente = parametrosURL.get('id');

    const cliente = await obtenerCliente(idCliente);

    mostrarCliente(cliente);

    const formulario = document.querySelector('#formulario');
    formulario.addEventListener('submit', validarCambios);
    
 });

 function mostrarCliente(cliente){
    const {id, nombre, email, telefono, empresa} = cliente;

    nombreInput.value = nombre;
    idInput.value = id;
    emailInput.value = email;
    telefonoInput.value = telefono;
    empresaInput.value = empresa;
 }



 function validarCambios(e){
   e.preventDefault();

   const cliente = {

      nombre:nombreInput.value,
      email:emailInput.value,
      telefono: telefonoInput.value,
      empresa: empresaInput.value,
      id: idInput.value
   }
   
   //Validar Campos
   if(validarFormulario(cliente)){
      mostrarAlerta("Todos los campos son obligatorios");
      return;
   }

   //Actualizar API

   editarCliente(cliente);


 }

