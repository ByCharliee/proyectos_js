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
        this.gastoArr = [];
    }

    nuevoGasto(gastoObj){
        this.gastoArr = [...this.gastoArr, gastoObj];
        console.log(this.gastoArr);
        this.calcularRestante();
    }

    calcularRestante(){
        const gastado = this.gastoArr.reduce((total, gastoNuevo) => total + gastoNuevo.cantidad, 0);
        console.log(gastado);
        this.restante = this.presupuesto - gastado;
        console.log(this.restante);


    }

    eliminarGasto(elemento){
        

        //Ubicar el objeto por el id
        const gastoObj = this.gastoArr.find((gasto) => gasto.id == elemento.dataset.id ); 
        const {cantidad} = gastoObj;

        //Sumar rembolso a restante
        
        this.restante += cantidad;

        //Eliminar del arreglo
        this.gastoArr = this.gastoArr.filter((gasto) => gasto.id != elemento.dataset.id );
        
        


        console.log(elemento);
        console.log(gastoObj);
        console.log(`Cantidad: ${cantidad}`);
        console.log(this.restante);
    }
}//fin de clase Presupuesto--------


class UI {
    
    insertarPresupuesto(objeto){
        //Extraer los valores
        const {presupuesto, restante} = objeto;

        //Insertar en html
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;


    }

    imprimirAlerta(mensaje, tipo){

        
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

        //Limpiar el HTML
        this.limpiarHtml();
       

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
            btnBorrar.onclick = () => {
                const elemento = gastoListado.querySelector(`[data-id ="${id}"]`);
                eliminarGasto(elemento);
             }
            nuevoGasto.appendChild(btnBorrar);



            //Agregar al HTML
            gastoListado.appendChild(nuevoGasto);

        });

    }

    //Actualiza el valor restante en HTML
    actualizarRestante(restante){
        document.querySelector('#restante').textContent = restante;
    }

    //comprueba el restante
    comprobarRestante(comprobarObj){
        const {presupuesto, restante} = comprobarObj;
       
        
        const divRestante = document.querySelector('.restante');

        if((presupuesto * 0.25) >= restante ){
            divRestante.classList.remove('alert-success', 'alert-warning');
            divRestante.classList.add('alert-danger');
        }else if ((presupuesto * 0.5) >= restante){
            divRestante.classList.remove('alert-success', 'alert-danger');
            divRestante.classList.add('alert-warning');
        }else{
            divRestante.classList.remove('alert-warning', 'alert-danger');
            divRestante.classList.add('alert-success');
        }

        //Comprobar si se ha terminado el presupuesto
        if(restante <= 0){
            this.imprimirAlerta('El presupuesto se ha agotado', 'error');

            formulario.querySelector('button[type = "submit"]').disabled = true;
        }else{
            formulario.querySelector('button[type = "submit"]').disabled = false;
        }
    



    }


    limpiarHtml(){
        while(gastoListado.firstChild){
            gastoListado.removeChild(gastoListado.firstChild);
        }
    }
}//fin de clase UI-------------------



//Instancias globales--------

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
    const cantidad = Number(document.querySelector('#cantidad').value);

    
    //Validar información
    if(nombre === '' || cantidad === ''){
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
        return;
    }else if(cantidad <= 0 || isNaN(cantidad)){
    
        ui.imprimirAlerta('Cantidad no válida', 'error');
        return;
    }

    //Validar que el restante alcance para el gasto
    
    if(cantidad > presupuestoObj.restante){
        ui.imprimirAlerta('El presupuesto restante no cubre el gasto', 'error');
        return;
    }


    //Crear objeto de presupuesto
    const gastoObj = {nombre, cantidad, id: Date.now()}; 
    presupuestoObj.nuevoGasto(gastoObj);

    //Imprimir alerta de agregado 
    ui.imprimirAlerta('Gasto agregado correctamente');

    //Agragar listado de gastos
    const {gastoArr, restante} = presupuestoObj; 
    ui.agragarGastoListado(gastoArr);

    //Actualizar el restante en html
    ui.actualizarRestante(restante);

    //Comprueba el porcentaje de presupuesto restante
    ui.comprobarRestante(presupuestoObj);

    //Limpiar el formulario
    formulario.reset();

}


function eliminarGasto(elemento){
    //Llama a la función dentro de la clase
    presupuestoObj.eliminarGasto(elemento);

    //Actualizamos el html
    const {restante} = presupuestoObj;
    ui.actualizarRestante(restante);

    //Comprobamos el restante
    ui.comprobarRestante(presupuestoObj);

    //Se elimina el gasto de la lista
    elemento.remove();
   
    


}
