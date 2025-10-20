import { consultarAPI, eliminarCliente } from "./API.js";

const lista = document.querySelector('#listado-clientes');

document.addEventListener('DOMContentLoaded', mostrarClientes);
lista.addEventListener('click', confirmarEliminar);

async function mostrarClientes(){
    const clientes = await consultarAPI();

    clientes.forEach(cliente => {
        const {nombre, email, telefono, empresa, id} = cliente;

        const row = document.createElement('TR');
        row.innerHTML += `
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
            <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
            <p class="text-sm leading-10 text-gray-700"> ${email} </p>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
            <p class="text-gray-700">${telefono}</p>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
            <p class="text-gray-600">${empresa}</p>
        </td>
        `;

        const divOpciones = document.createElement('TD');
        divOpciones.classList.add('px-6', 'py-4', 'whitespace-no-wrap', 'border-b', 'border-gray-200', 'text-sm', 'leading-5');

        const btnEditar = document.createElement('A');
        btnEditar.classList.add('text-teal-600', 'hover:text-teal-900', 'mr-5');
        btnEditar.href = `editar-cliente.html?id=${id}`;
        btnEditar.textContent = 'Editar';

        const btnEliminar = document.createElement('A');
        btnEliminar.classList.add('text-red-600', 'hover:text-red-900', 'eliminar');
        btnEliminar.href = '#';
        btnEliminar.dataset.cliente = id;
        btnEliminar.textContent = 'Eliminar';

        divOpciones.appendChild(btnEditar);
        divOpciones.appendChild(btnEliminar);

        row.appendChild(divOpciones);


        lista.appendChild(row);
    });

}

function confirmarEliminar(e){
    if(e.target.classList.contains('eliminar')){
       const idCliente = e.target.dataset.cliente;

       const confirmar = confirm('¿Desea eliminar este cliente?');

       if(confirmar){
        eliminarCliente(idCliente);
       }

    }
}