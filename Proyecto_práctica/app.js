//Selectores y variables
const formulario = document.querySelector('#formulario-tarea');
const nombreInput = document.querySelector('#nombre');
const prioridadSelect = document.querySelector('#prioridad');
const listaTareas = document.querySelector('#lista-tareas');
let tareaArr = [];

//Eventos
eventosListeners();

function eventosListeners(){
    formulario.addEventListener('submit', ingresarTarea);
}


//Clases

class Tarea {

    constructor(nombre, prioridad) {
        this.nombre= nombre; 
        this.prioridad = prioridad;
        this.id = Date.now();
    }


}

class UI {

    mostrarAlerta(mensaje, tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('alerta');
        if(tipo === 'error'){
            console.log("Desde mostrar alerta");
            divMensaje.classList.remove('alerta-success');
            divMensaje.classList.add('alerta-error');
        }else{
            divMensaje.classList.remove('alerta-error');
            divMensaje.classList.add('alerta-success');
        }
        divMensaje.textContent = mensaje;
        formulario.appendChild(divMensaje);


        //Retirar alerta 
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    mostrarlistado(listado){

        //Limpiar html
        this.limpiarHtml();

        listado.forEach((elemento) => {
            const tarea = document.createElement('li');
            tarea.classList.add(`${elemento.prioridad}`);
            tarea.textContent = elemento.nombre;

            listaTareas.appendChild(tarea);
         })
        
        
    }

    limpiarHtml(){
        while(listaTareas.firstChild){
            listaTareas.removeChild(listaTareas.firstChild);
        }
    }


}

//Instancias
const ui = new UI();
let tareaObj;


//Funciones
function ingresarTarea(e){
    e.preventDefault();

    //Verificar que la alerta esté activa
    if(document.querySelector('.alerta')){
        console.log("alerta activa");
        return;
    }

    const nombre = nombreInput.value;
    const prioridad = prioridadSelect.value;

    //Validar datos
    if(!validarTarea(nombre, prioridad)){
        return;
    }

    //añadir el objeto a la lista de tareas
    tareaObj = new Tarea(nombre, prioridad);

    tareaArr = [...tareaArr, tareaObj];
    
    ui.mostrarAlerta('La tarea se añadió con éxito');

    ui.mostrarlistado(tareaArr);

    formulario.reset();


    console.log(tareaArr);
}

//Validar la tarea

function validarTarea(nombre, prioridad){
    //Validamos los campos del formulario
    let validacion = true;
    if(nombre.trim() === '' || prioridad === ''){
        ui.mostrarAlerta('Todos los campos son obligatorios', 'error');
        validacion = false;
    }  

    //comprobación de duplicados
    tareaArr.forEach((tarea) => {
        if(nombre.trim() === tarea.nombre){
            ui.mostrarAlerta('La tarea ya existe', 'error');
            validacion = false;
        }
    })


    return validacion;
}
