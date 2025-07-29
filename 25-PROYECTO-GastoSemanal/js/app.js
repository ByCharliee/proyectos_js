//Variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');


//Eventos
eventosListeners();

function eventosListeners(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
    formulario.addEventListener('submit', agregarGasto)

}



//Clases

class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gasto = [];
    }

    nuevoGasto(gastoObj){
        this.gasto = [...this.gasto, gastoObj];
        console.log(this.gasto);
    }
}

class UI {
    
    insertarPresupuesto(objeto){
        //Extraer los valores
        const {presupuesto, restante} = objeto;

        //Insertar en html
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;


    }

    imprimirAlerta(mensaje, tipo){

        //Limpiar el HTML
        limpiarHtml();
       
        const divAlerta = document.createElement('DIV');
        divAlerta.classList.add('text-center', 'alert');
        divAlerta.id = 'alerta-formulario';

        if(tipo === 'error'){
            divAlerta.classList.add('alert-danger');
        }else{
            divAlerta.classList.add('alert-success');
        }

        divAlerta.textContent = mensaje;

        document.querySelector('.primario').insertBefore(divAlerta, formulario);

        //Remover div
        setTimeout(() => {
            divAlerta.remove();
        }, 2000);

    }

    agragarGastoListado(listaGasto){

        //Iterar sobre los gastos
        listaGasto.forEach(gasto => {
            const {nombre, cantidad, id} = gasto;

            //Crear li
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id = id;

            //Agregar el html de gasto
            nuevoGasto.innerHTML = `
                ${nombre} <span class = "badge badge-primary badge-pill ">$${cantidad}</span>
            `

            //Agregar boton de borrar gasto 
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnBorrar.innerHTML = `Borrar &times`;
            nuevoGasto.appendChild(btnBorrar);

            //Agregar al HTML
            gastoListado.appendChild(nuevoGasto);

        });

    }
}

//Instancias

const ui = new UI();
let presupuestoObj;




//Funciones------------

function preguntarPresupuesto(){
    const presupuestoValido = Number(prompt('Ingresa tu presupuesto: '));

    console.log(presupuestoValido);

    if (presupuestoValido === null || presupuestoValido === '' || isNaN(presupuestoValido) || presupuestoValido <= 0) {
        window.location.reload();
    }

    //Crear objeto con presupuesto válido
    presupuestoObj = new Presupuesto(presupuestoValido);

    console.log(presupuestoObj);

    ui.insertarPresupuesto(presupuestoObj);
}

function agregarGasto(e){
    e.preventDefault();
    if(document.querySelector('#alerta-formulario')){
        console.log('Alerta activa');
        console.log(presupuestoObj);
        return;
    }

    
    const nombre = document.querySelector('#gasto').value;
    const cantidad = document.querySelector('#cantidad').value;

    
    //Validar información
    if(nombre === '' || cantidad === ''){
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
        return;
    }else if(cantidad <= 0 || isNaN(cantidad)){
    
        ui.imprimirAlerta('Cantidad no válida', 'error');
        return;
    }

    //Crear objeto de presupuesto
    const gastoObj = {nombre, cantidad, id: Date.now()}; 
    presupuestoObj.nuevoGasto(gastoObj);

    //Imprimir alerta de agregado 
    ui.imprimirAlerta('Gasto agregado correctamente');

    //Agragar listado de gastos
    const {gasto} = presupuestoObj;
    ui.agragarGastoListado(gasto);

    //Limpiar el formulario
    formulario.reset();

}

function limpiarHtml(){
    while(gastoListado.firstChild){
        gastoListado.removeChild(gastoListado.firstChild);
    }
}