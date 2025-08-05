import {formulario} from "../selectores.js"

export default class Notificacion {
    constructor({texto, tipo = 'exito'}){
        this.texto = texto;
        this.tipo = tipo;

        this.mostrar();
    }

    mostrar(){
        //Crear alerta
        const alerta = document.createElement('div');
        alerta.classList.add('text-center', 'w-full', 'p-3', 'text-white', 'my-5', 'alert', 'uppercase', 'font-bold', 'text-sm');

        //Verificar alerta duplicada
        const alertaDuplicada = document.querySelector('.alert');
        alertaDuplicada?.remove();

        //Evaluar el tipo de alerta
        this.tipo === 'error' ? alerta.classList.add('bg-red-500') : alerta.classList.add('bg-green-500');

        //Añadir texto
        alerta.textContent = this.texto;

        //Añadir a DOM
        formulario.parentElement.insertBefore(alerta, formulario);

        //Desaparecer después de 2 seg
        setTimeout(() => {
            alerta.remove();
        }, 2000);
    }



}