//Selectores y variables globales
const pacienteInput = document.querySelector('#paciente');
const propietarioInput = document.querySelector('#propietario');
const emailInput = document.querySelector('#email');
const fechaInput = document.querySelector('#fecha');
const sintomasInput = document.querySelector('#sintomas');

const formulario = document.querySelector('#formulario-cita');
const registrar = formulario.querySelector('input[type="submit"]');
const contenedorCitas = document.querySelector('#citas');

let editando = false;

//Objeto de cita
const citaObj = {
    id: generarId(),
    paciente: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: ''
}

//Clases
class Notificacion {
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

class AdminCita{
    constructor(){
        this.citaArr = []
        console.log(this.citaArr);
    }

    agregarCita(cita){
        this.citaArr = [...this.citaArr, cita];
        this.mostrarCita();
    }

    editarCita(citaActualizada){
        this.citaArr = this.citaArr.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita );
        this.mostrarCita();
        console.log(this.citaArr);
    }

    eliminarCita(id){
        this.citaArr = this.citaArr.filter(cita => cita.id !== id);
        this.mostrarCita();

        console.log(this.citaArr);
    }


    mostrarCita(){

        //limpiar html  
        this.limpiarHtml();


        if(this.citaArr.length === 0){
            const sinPacientes = document.createElement('P');
            sinPacientes.className = 'text-xl mt-5 mb-10 text-center' ;
            sinPacientes.textContent = "No hay pacientes";
            contenedorCitas.appendChild(sinPacientes);

        }


        this.citaArr.forEach(cita => {
            const divCita = document.createElement('div');
            divCita.classList.add('mx-5', 'my-10', 'bg-white', 'shadow-md', 'px-5', 'py-10' ,'rounded-xl', 'p-3');
            divCita.dataset.id = citaObj.id;
        
            const paciente = document.createElement('p');
            paciente.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            paciente.innerHTML = `<span class="font-bold uppercase">Paciente: </span> ${cita.paciente}`;
        
            const propietario = document.createElement('p');
            propietario.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            propietario.innerHTML = `<span class="font-bold uppercase">Propietario: </span> ${cita.propietario}`;
        
            const email = document.createElement('p');
            email.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            email.innerHTML = `<span class="font-bold uppercase">E-mail: </span> ${cita.email}`;
        
            const fecha = document.createElement('p');
            fecha.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            fecha.innerHTML = `<span class="font-bold uppercase">Fecha: </span> ${cita.fecha}`;
        
            const sintomas = document.createElement('p');
            sintomas.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            sintomas.innerHTML = `<span class="font-bold uppercase">Síntomas: </span> ${cita.sintomas}`;


            const btnEditar = document.createElement('button');
            btnEditar.classList.add('py-2', 'px-10', 'bg-indigo-600', 'hover:bg-indigo-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
            btnEditar.innerHTML = 'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';
            const clone = structuredClone(cita);
            btnEditar.onclick = (e) => {
                cargarEditar(clone);
             }

            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('py-2', 'px-10', 'bg-red-600', 'hover:bg-red-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
            btnEliminar.innerHTML = 'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
            btnEliminar.onclick = () => this.eliminarCita(cita.id);

            const contenedorBtn = document.createElement('DIV');
            contenedorBtn.classList.add('flex', 'justify-between', 'mt-10');
            contenedorBtn.appendChild(btnEditar);
            contenedorBtn.appendChild(btnEliminar);

        
            // Agregar al HTML
            divCita.appendChild(paciente);
            divCita.appendChild(propietario);
            divCita.appendChild(email);
            divCita.appendChild(fecha);
            divCita.appendChild(sintomas);
            divCita.appendChild(contenedorBtn);
            contenedorCitas.appendChild(divCita);
        });    
      


    }

    limpiarHtml(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }


}

//Instancias
const administrarCita = new AdminCita();




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


//Funciones
function datosCita(e){

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

function validarEmail(email){
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
    const resultado = regex.test(email);
    
    return resultado;
}

function submitFormulario(e){
    e.preventDefault();

    if (Object.values(citaObj).some(value => value.trim() === '')) {
        new Notificacion({
            texto: "Todos los campos son obligatorios",
            tipo: 'error'
        })
        return;
    }


    //Verificar editando
    if(editando){
        administrarCita.editarCita({...citaObj});
    }else{
        //Añadir la cita al arreglo
        administrarCita.agregarCita({...citaObj});

        //Mostrar mensaje de éxito
        new Notificacion({
            texto: "Cita agregada con éxito"
        });
    }

   



    //Resetear formulario   
    formulario.reset();
    resetearObjeto();
    registrar.value = 'Registrar Paciente';
    editando = false;


}

function generarId(){
    return Math.random().toString(36).substring(2) + Date.now();
}

function resetearObjeto(){
    for(let key in citaObj){
        citaObj[key]= '';
        if(key == 'id') citaObj[key] =  generarId();
        console.log(key + ": " + citaObj[key]);
    }
}

function cargarEditar(cita){
    
    Object.assign(citaObj, cita);

    pacienteInput.value = citaObj.paciente
    propietarioInput.value = citaObj.propietario
    emailInput.value = citaObj.email
    fechaInput.value = citaObj.fecha
    sintomasInput.value = citaObj.sintomas

    editando = true;
    registrar.value = "Guardar Cambios";
}



