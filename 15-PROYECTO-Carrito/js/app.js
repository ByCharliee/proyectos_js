//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let agregarCarrito = [];

cargarEventListener();

function cargarEventListener(){
    //Cargar elementos de local storage
    document.addEventListener('DOMContentLoaded', () => {
        if(localStorage.length > 0){
            agregarCarrito = JSON.parse(localStorage.getItem('cursos'));
            carritoHtml();
        }
     })


    //Cuando se da click a Agregar Curso
    listaCursos.addEventListener('click', agregarCurso);

    //Eliminar un curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar el carrito de cursos
    vaciarCarritoBtn.addEventListener('click', vaciarCursos);

}

//Funciones

function agregarCurso(e){
    e.preventDefault()
    if(e.target.classList.contains('agregar-carrito')){
        //Selecciona el card completo
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

//Vacia por completo el carrito de compras
function vaciarCursos(){
    agregarCarrito.length = 0;
    limpiarHtml();
}

//Elimina el curso del carrito de compras
function eliminarCurso(e){
    e.preventDefault();

    const cursoId = e.target.getAttribute('data-id');
    //Genera un nuevo arreglo sin el elemento eliminado
    agregarCarrito = agregarCarrito.filter(curso => curso.id !== cursoId);
    console.log(agregarCarrito);

    //Sincronizar carrito con local storage
    sincronizarCurso();

    //Vuelve a crear el Html para mostrar el carrito actualizado
    carritoHtml();

}



//Lee la información del curso seleccionado 
function leerDatosCurso(curso){
    //Creamos objeto con los datos del curso
    const infoCurso ={
        imagen: curso.querySelector('IMG').src,
        nombre: curso.querySelector('.info-card h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }


    //Verifica primero que el curso no se encuentre en el arreglo para añadirlo a la lista    
    if(!verificarCurso(infoCurso.id)){
        agregarCarrito = [...agregarCarrito, infoCurso];
    }else{
        agregarCarrito.forEach(curso => {
            if(infoCurso.id === curso.id){
                curso.cantidad += 1;
            }
         })
    }
    
    //Almacena el objeto el local storage
    sincronizarCurso();

    console.log(agregarCarrito);
    // console.log(verificarCurso('Guitarra para Principiantes'));

    carritoHtml();
}

//Almacena el objeto en local storage
function sincronizarCurso(){
    localStorage.setItem('cursos', JSON.stringify(agregarCarrito));
}


//Agrega el carrito al contenedor
function carritoHtml(){
    //Limpiar el HTML
    limpiarHtml();

    //Recorre el carrito y crea el HTML
    agregarCarrito.forEach(curso => {
        const {imagen, nombre, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML= `
            <td>
                <img src="${imagen}" width = 100>
            </td>

            <td>
                ${nombre}
            </td>

            <td>
                ${precio}
            </td>

            <td>
                ${cantidad}
            </td>

            <td>
                <a href="#" class = "borrar-curso" data-id="${id}" > X  </a>
            </td>

            

        
        `
        contenedorCarrito.appendChild(row);
     })
     
}

//Revisa si ya existe el nombre del curso en el arreglo
function verificarCurso(id){
    return agregarCarrito.some(curso => curso.id === id);
}


//Limpia el HTML
function limpiarHtml(){

    //Forma lenta
    // contenedorCarrito.innerHTML = '';


    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

