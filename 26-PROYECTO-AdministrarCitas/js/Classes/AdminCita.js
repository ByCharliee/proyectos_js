import { contenedorCitas } from "../selectores.js";
import { cargarEditar } from "../funciones.js";
import { citaObj } from "../variables.js";
import { DB } from "../Database/database.js";

export default class AdminCita{
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
        console.log(DB);


        //limpiar html  
        this.limpiarHtml();

        //Traer los objetos de la base de datos
        const objectStore = DB.transaction('citas').objectStore('citas');
        const total = objectStore.count();

        //Verificar que se tengan citas en la BD
        total.onsuccess = () => {
            this.textoHeading(total.result);
         }

        

        objectStore.openCursor().onsuccess = (e) => {
            const cursor = e.target.result;

            if(cursor){
                const {paciente, propietario, email, fecha, sintomas} = cursor.value;
                const divCita = document.createElement('div');
                divCita.classList.add('mx-5', 'my-10', 'bg-white', 'shadow-md', 'px-5', 'py-10' ,'rounded-xl', 'p-3');
                divCita.dataset.id = citaObj.id;
            
                const pacienteParrafo = document.createElement('p');
                pacienteParrafo.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
                pacienteParrafo.innerHTML = `<span class="font-bold uppercase">Paciente: </span> ${paciente}`;
            
                const propietarioParrafo = document.createElement('p');
                propietarioParrafo.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
                propietarioParrafo.innerHTML = `<span class="font-bold uppercase">Propietario: </span> ${propietario}`;
            
                const emailParrafo = document.createElement('p');
                emailParrafo.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
                emailParrafo.innerHTML = `<span class="font-bold uppercase">E-mail: </span> ${email}`;
            
                const fechaParrafo = document.createElement('p');
                fechaParrafo.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
                fechaParrafo.innerHTML = `<span class="font-bold uppercase">Fecha: </span> ${fecha}`;
            
                const sintomasParrafo = document.createElement('p');
                sintomasParrafo.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
                sintomasParrafo.innerHTML = `<span class="font-bold uppercase">Síntomas: </span> ${sintomas}`;


                const btnEditar = document.createElement('button');
                btnEditar.classList.add('py-2', 'px-10', 'bg-indigo-600', 'hover:bg-indigo-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
                btnEditar.innerHTML = 'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';
                const clone = structuredClone(cursor.value);
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
                divCita.appendChild(pacienteParrafo);
                divCita.appendChild(propietarioParrafo);
                divCita.appendChild(emailParrafo);
                divCita.appendChild(fechaParrafo);
                divCita.appendChild(sintomasParrafo);
                divCita.appendChild(contenedorBtn);
                contenedorCitas.appendChild(divCita);

                cursor.continue();
            }
         }


    }

    textoHeading(total){
        if(total === 0){
            const sinPacientes = document.createElement('P');
            sinPacientes.className = 'text-xl mt-5 mb-10 text-center' ;
            sinPacientes.textContent = "No hay pacientes";
            contenedorCitas.appendChild(sinPacientes);

        }
    }

    limpiarHtml(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }


}