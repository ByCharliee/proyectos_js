const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const paginacion = document.querySelector('#paginacion');

const totalImagenes = 40;
let totalPaginas;
let paginaActual = 1;

window.onload = () => {
    formulario.addEventListener('submit', validarFormulario);
}

function validarFormulario(e){
    e.preventDefault();

    const terminoBusqueda = formulario.querySelector('#termino').value;

    if(terminoBusqueda === ''){
        mostrarAlerta("Ingresa un término de búsqueda válido");
        return;
    }

    buscarImagenes();
}

function mostrarAlerta(mensaje){
    const existeAlerta = document.querySelector('.alerta');
    if(existeAlerta){
        return;
    }

    const alerta = document.createElement('P');
    alerta.classList.add('alerta', 'bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6' , 'text-center', 'font-bold');
    alerta.textContent = mensaje;


    formulario.appendChild(alerta);

    setTimeout(() => {
        alerta.remove();
    }, 1700);
}

async function buscarImagenes(){
    const termino = formulario.querySelector('#termino').value;

    const key = '';
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${totalImagenes}&page=${paginaActual}`;

    
    // fetch(url)
    //     .then(resultado => resultado.json())
    //     .then(datos => {
    //         totalPaginas = calcularPaginas(datos.totalHits);

    //         mostrarImagenes(datos.hits)
    //     });

    try {
        const resultado = await fetch(url);
        const datos = await resultado.json();

        totalPaginas=calcularPaginas(datos.totalHits);
        mostrarImagenes(datos.hits);
        
    } catch (error) {
        console.log("Hubo un error: ", error);
    }    
}

function mostrarImagenes(imagenes){
    limpiarHtml(resultado);

    imagenes.forEach(imagen => {
        const {previewURL, largeImageURL, likes, views} = imagen;

        resultado.innerHTML += `
            <div class= "w-1/2 md:w-1/3  lg:w-1/4 p-3 mb-4">
                <div class="bg-white overflow-hidden  flex flex-col h-full">
                    <img class="w-full h-full object-cover" src="${previewURL}">
                    <div class="p-4">
                        <p><span class="font-bold">${likes}</span> Me Gusta </p>
                        <p><span class="font-bold">${views}</span> Veces Visto </p>

                        <a 
                            class= "block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded p-1"
                            href="${largeImageURL}"
                            target="_blank"
                            rel= "noopener noreferrer"
                        >
                        Ver Imagen
                        </a>
                    </div>
                </div>
            </div>
        `

        
    });

    //Generar e imprimir la paginación
       imprimirPaginador();

}

//Generar paginador 
function *crearPaginador(total){
    for (let i = 1; i <= total; i++) {
        yield i;  
    }
}

function imprimirPaginador(){
    limpiarHtml(paginacion);
    const iterador = crearPaginador(totalPaginas);

    while(true){
        const {value, done} = iterador.next();
        //Si el generador llegó a su fin, entonces sal del ciclo 
        if(done) return;

        //si no, entonces genera un botón

        const boton = document.createElement('A');
        boton.href = '#';
        boton.dataset.pagina = value;
        boton.textContent = value;
        boton.classList.add('siguiente', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2', 'mb-4', 'font-bold', 'rounded');
        boton.onclick = () => {
            paginaActual = value;

            buscarImagenes();
         }

        paginacion.appendChild(boton);


    }
}

function calcularPaginas(total){
    return parseInt(Math.ceil(total / totalImagenes));
}

function limpiarHtml(elemento){
    while(elemento.firstChild){
        elemento.removeChild(elemento.firstChild);
    }
}