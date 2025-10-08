let cliente = {
    mesa: '',
    hora: '',
    pedido: []
}

const categorias = {
    1: 'Comida', 
    2: 'Bebida',
    3: 'Postres'
};

const btnGuardarCliente = document.querySelector('#guardar-cliente');
btnGuardarCliente.addEventListener('click', guardarCliente);


function guardarCliente(){

    //Revisa que no exista una alerta activa
    if(document.querySelector('.alerta')) return;


    const mesa = document.querySelector('#mesa').value;
    const hora = document.querySelector('#hora').value;

    //Revisar si hay campos vacíos
    const camposVacios = [mesa, hora].some(campo => campo === '');

    if(camposVacios) {
        const alerta = document.createElement('DIV');
        alerta.classList.add('invalid-feedback', 'd-block', 'text-center', 'alerta');
        alerta.textContent = 'Todos los campos son oblgatorios';
        document.querySelector('.modal-body').appendChild(alerta);
        setTimeout(() => {
            alerta.remove();
        }, 1200);

        return;
    }
    //Asignar los valores del formulario al objeto 
    cliente = {...cliente, mesa, hora};
    // console.log(cliente);

    //Cerrar ventana modal
    const modalForm = document.querySelector('#formulario');
    bootstrap.Modal.getInstance(modalForm).hide();
    
    document.querySelector('#modal-form').reset();


    //Mostrar las secciones
    mostrarSecciones();

 
}

function mostrarSecciones(){
    const secciones = document.querySelectorAll('.d-none');

    secciones.forEach(seccion => seccion.classList.remove('d-none'));

    buscarPlatillos();
}

function buscarPlatillos(){
    url = 'http://localhost:3000/platillos';
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => mostrarPlatillos(datos))
        .catch(error => console.log(error))
}

function mostrarPlatillos(platillos){
    const contenido = document.querySelector('#platillos .contenido');

    platillos.forEach(platillo => {
        const row = document.createElement('DIV');
        row.classList.add('row', 'py-3', 'border-top');

        const nombre = document.createElement('DIV');
        nombre.classList.add('col-md-4');
        nombre.textContent = platillo.nombre;

        const precio = document.createElement('DIV');
        precio.classList.add('col-md-3', 'fw-bold');
        precio.textContent = `$${platillo.precio}`;

        const categoria =document.createElement('DIV');
        categoria.classList.add('col-md-3');
        categoria.textContent = categorias[platillo.categoria];

        const inputCantidad = document.createElement('INPUT');
        inputCantidad.type = 'number';
        inputCantidad.min = 0;
        inputCantidad.value = 0;
        inputCantidad.id = `producto-${platillo.id}`;
        inputCantidad.classList.add('form-control');


        //Si cambia la cantidad se agrega el platillo junto con la cantidad al arreglo del objeto
        inputCantidad.onchange = () => {
            const cantidad = parseInt(inputCantidad.value);

            agregarPlatillo({...platillo, cantidad});

         }

        const agregar = document.createElement('DIV');
        agregar.classList.add('col-md-2');
        agregar.appendChild(inputCantidad);

        row.appendChild(nombre);
        row.appendChild(precio);
        row.appendChild(categoria);
        row.appendChild(agregar);


        contenido.appendChild(row);
    })
}

function agregarPlatillo(producto){

    let {pedido} = cliente;
    
    if(producto.cantidad > 0){ 
        //Revisa si el id ya se encuentra en el arreglo
        if(pedido.some(articulo => articulo.id === producto.id)){

            //Devuelve un nuevo arreglo con la cantidad actualizada 
            const pedidoActualizado = pedido.map(articulo => {
                if(articulo.id === producto.id){
                    articulo.cantidad = producto.cantidad;
                }

                return articulo;
            })

            cliente.pedido = [...pedidoActualizado];
        }
        else{
            cliente.pedido = [...pedido, producto];
        }
    }
    else{
      const nuevoPedido = pedido.filter(articulo => articulo.id !== producto.id);

      cliente.pedido = [...nuevoPedido];
    }


    //Mostrar el resumen del pedido
    actualizarResumen();


}

function actualizarResumen(){

    const contenido = document.querySelector('#resumen .contenido');

    //Limpiar html previo
    limpiarHtml(contenido);

    //Verificar si hay productos para mostrar
    if(!cliente.pedido.length){
        mensajePedidoVacio();
        return;
    }

    

    const resumen = document.createElement('DIV');
    resumen.classList.add('col-md-6', 'card', 'py-2', 'px-3', 'shadow');

    //Información de la mesa
    const mesa = document.createElement('P');
    mesa.classList.add('fw-bold');
    mesa.textContent = 'Mesa: ';

    const spanMesa = document.createElement('SPAN');
    spanMesa.classList.add('fw-normal');
    spanMesa.textContent = cliente.mesa;

    mesa.appendChild(spanMesa);

    //Información de la hora

    const hora = document.createElement('P');
    hora.classList.add('fw-bold');
    hora.textContent = 'Hora: ';

    const spanHora = document.createElement('SPAN');
    spanHora.classList.add('fw-normal');
    spanHora.textContent = cliente.hora;

    hora.appendChild(spanHora);

    //Encabezado de pedidos

    const encabezado = document.createElement('H3');
    encabezado.textContent = 'Platillos Consumidos';
    encabezado.classList.add('text-center', 'my-4')

    //Iterar sobre los pedidos

    const grupo = document.createElement('UL');
    grupo.classList.add('list-group');

    const {pedido} = cliente;

    pedido.forEach(articulo => {
        const {nombre, precio, cantidad, id} = articulo;

        const lista = document.createElement('LI');
        lista.classList.add('list-group-item');

        const nombreItem = document.createElement('H4');
        nombreItem.classList.add('my-4');
        nombreItem.textContent = nombre;

        //Agregar cantidad

        const cantidadItem = document.createElement('P');
        cantidadItem.classList.add('fw-bold');
        cantidadItem.textContent = 'Cantidad: ';

        const cantidadValor = document.createElement('SPAN');
        cantidadValor.classList.add('fw-normal');
        cantidadValor.textContent = cantidad;

        cantidadItem.appendChild(cantidadValor);

        //Agregar precio

        const precioItem = document.createElement('P');
        precioItem.classList.add('fw-bold');
        precioItem.textContent = 'Precio: ';

        const precioValor = document.createElement('SPAN');
        precioValor.classList.add('fw-normal');
        precioValor.textContent = `$${precio}`;

        precioItem.appendChild(precioValor);

        //Calcular Subtotal

        const subtotalItem = document.createElement('P');
        subtotalItem.classList.add('fw-bold');
        subtotalItem.textContent = 'Subtotal: ';

        const subtotalValor = document.createElement('SPAN');
        subtotalValor.classList.add('fw-normal');
        subtotalValor.textContent = `$${calcularSubtotal(precio, cantidad)}`;

        subtotalItem.appendChild(subtotalValor);

        //Botón eliminar producto

        const btnEliminar = document.createElement('BUTTON');
        btnEliminar.classList.add('btn', 'btn-danger');
        btnEliminar.textContent = 'Eliminar del pedido';

        btnEliminar.onclick = function() {
           eliminarProducto(id);
        }


        //Agregar elementos a li
        lista.appendChild(nombreItem);
        lista.appendChild(cantidadItem);
        lista.appendChild(precioItem);
        lista.appendChild(subtotalItem);
        lista.appendChild(btnEliminar);

        //Agregar items a la lista
        grupo.appendChild(lista);
     })

     

    resumen.appendChild(encabezado);
    resumen.appendChild(mesa);
    resumen.appendChild(hora);
    resumen.appendChild(grupo);


    contenido.appendChild(resumen);

    //Mostrar formulario de propina
    formularioPropina();
}

function calcularSubtotal(precio, cantidad){
    return precio * cantidad;
}

function eliminarProducto(id){
    const {pedido} = cliente;
    const nuevoPedido = pedido.filter(orden => orden.id !== id);

    cliente.pedido = [...nuevoPedido];

    //Actualizar los valores de las cantidades
    const cantidadInput = document.querySelector(`#producto-${id}`);
    cantidadInput.value = 0;
    cantidadInput.textContent = 0;

    actualizarResumen();


}

function mensajePedidoVacio(){
    const contenido = document.querySelector('#resumen .contenido');

    const texto = document.createElement('P');
    texto.classList.add('text-center');
    texto.textContent = 'Añade los elementos del pedido';

    contenido.appendChild(texto);

}

function formularioPropina(){
    const contenido = document.querySelector('#resumen .contenido');

    const formulario = document.createElement('DIV');
    formulario.classList.add('col-md-6', 'formulario');

    const divFormulario = document.createElement('DIV');
    divFormulario.classList.add('py-2', 'card', 'shadow', 'px-3')

    const heading = document.createElement('H3');
    heading.classList.add('text-center', 'my-4');
    heading.textContent='Propina ';

    //Generar radio buttons para la propina

    const radio10 = document.createElement('INPUT');
    radio10.type = 'radio';
    radio10.classList.add('form-check-input');
    radio10.value = 10;
    radio10.name = 'propina';
    radio10.onclick = calcularPropina;
    
    const radio10Label = document.createElement('LABEL');
    radio10Label.classList.add('form-check-label');
    radio10Label.textContent = '10%';

    const radio10Div = document.createElement('DIV');
    radio10Div.classList.add('form-check');

    radio10Div.appendChild(radio10);
    radio10Div.appendChild(radio10Label);

    //Propina de 25%

    const radio25 = document.createElement('INPUT');
    radio25.type = 'radio';
    radio25.classList.add('form-check-input');
    radio25.value = 25;
    radio25.name = 'propina';
    radio25.onclick = calcularPropina;

    
    const radio25Label = document.createElement('LABEL');
    radio25Label.classList.add('form-check-label');
    radio25Label.textContent = '25%';

    const radio25Div = document.createElement('DIV');
    radio25Div.classList.add('form-check');

    radio25Div.appendChild(radio25);
    radio25Div.appendChild(radio25Label);

    //Propina de 50%

    const radio50 = document.createElement('INPUT');
    radio50.type = 'radio';
    radio50.classList.add('form-check-input');
    radio50.value = 50;
    radio50.name = 'propina';
    radio50.onclick = calcularPropina;
    
    const radio50Label = document.createElement('LABEL');
    radio50Label.classList.add('form-check-label');
    radio50Label.textContent = '50%';

    const radio50Div = document.createElement('DIV');
    radio50Div.classList.add('form-check');

    radio50Div.appendChild(radio50);
    radio50Div.appendChild(radio50Label);

    //Añadir al div general
    divFormulario.appendChild(heading);
    divFormulario.appendChild(radio10Div);
    divFormulario.appendChild(radio25Div);
    divFormulario.appendChild(radio50Div);

    //Añadir al formulario
    formulario.appendChild(divFormulario);


    //Añadir a contenedor general
    contenido.appendChild(formulario);

}


function limpiarHtml(elemento){
    

    while(elemento.firstChild){
        elemento.removeChild(elemento.firstChild);
    }
}

function calcularPropina(){
    const {pedido} = cliente; 


    let subTotal = 0;

    //Calcula el subtotal de toda la orden
    pedido.forEach(articulo => {
        subTotal += articulo.cantidad * articulo.precio;
    })

    //Selecciona el radio button y calcula la propina

    const propinaSeleccionada = document.querySelector('[name="propina"]:checked').value;

    const propina = (subTotal * parseInt(propinaSeleccionada)) / 100;

    const total = subTotal + propina;

    mostrarTotalHTML(propina, subTotal, total);
    
}

function mostrarTotalHTML(propina, subTotal, total){


    const divTotales = document.createElement('DIV');
    divTotales.classList.add('totales-contenedor');

   

    //Añadir el subtotal al HTML
    const subtotalParrafo = document.createElement('P');
    subtotalParrafo.classList.add('fs-3', 'fw-bold', 'mt-5');
    subtotalParrafo.textContent = 'Subtotal consumo: ';

    const subtotalSpan = document.createElement('SPAN');
    subtotalSpan.classList.add('fw-normal');
    subtotalSpan.textContent = `$${subTotal}`;

    subtotalParrafo.appendChild(subtotalSpan);


    //Añadir propina a HTML
    const propinaParrafo = document.createElement('P');
    propinaParrafo.classList.add('fs-3', 'fw-bold', 'mt-5');
    propinaParrafo.textContent = 'Propina: ';

    const propinaSpan = document.createElement('SPAN');
    propinaSpan.classList.add('fw-normal');
    propinaSpan.textContent = `$${propina}`;

    propinaParrafo.appendChild(propinaSpan);


    //Añadir total a HTML
    const totalParrafo = document.createElement('P');
    totalParrafo.classList.add('fs-3', 'fw-bold', 'mt-5');
    totalParrafo.textContent = 'Total: ';

    const totalSpan = document.createElement('SPAN');
    totalSpan.classList.add('fw-normal');
    totalSpan.textContent = `$${total}`;

    totalParrafo.appendChild(totalSpan);

    const totalesContenedor = document.querySelector('.totales-contenedor');

    if(totalesContenedor) {
        totalesContenedor.remove();
    }
    divTotales.appendChild(subtotalParrafo);
    divTotales.appendChild(propinaParrafo);
    divTotales.appendChild(totalParrafo);
    document.querySelector('.formulario > div').appendChild(divTotales);


}