//Selectores y variables globales
const pacienteInput = document.querySelector('#paciente');
const propietarioInput = document.querySelector('#propietario');
const emailInput = document.querySelector('#email');
const fechaInput = document.querySelector('#fecha');
const sintomasInput = document.querySelector('#sintomas');

const formulario = document.querySelector('#formulario-cita');
const contenedorCitas = document.querySelector('#citas');

//Objeto de cita
const citaObj = {
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

    mostrarCita(){

        //limpiar html  
        this.limpiarHtml();

        this.citaArr.forEach(cita => {
            const divCita = document.createElement('div');
            divCita.classList.add('mx-5', 'my-10', 'bg-white', 'shadow-md', 'px-5', 'py-10' ,'rounded-xl', 'p-3');
        
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
        
            // Agregar al HTML
            divCita.appendChild(paciente);
            divCita.appendChild(propietario);
            divCita.appendChild(email);
            divCita.appendChild(fecha);
            divCita.appendChild(sintomas);
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

     //Validar email
     if(e.target.name === 'email'){
        const validacion = validarEmail(e.target.value)

        if(validacion){
            citaObj[e.target.name]=e.target.value;
                console.log(citaObj);

            return;
        }
        else {
            console.log("Email no válido");
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

    //Añadir la cita al arreglo
    administrarCita.agregarCita(citaObj);


    //Mostrar mensaje de éxito
    new Notificacion({
        texto: "Cita agregada con éxito"
    });

    //Resetear formulario   
    formulario.reset();
    resetearObjeto();


}

function resetearObjeto(){
    for(let key in citaObj){
        citaObj[key]= '';
        console.log(key + ": " + citaObj[key]);
    }
}


