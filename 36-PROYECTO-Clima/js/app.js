const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
 })


 function buscarClima(e){
    e.preventDefault();

    const alerta = document.querySelector('.alerta');
    
    if(alerta){
        return;
    }

    

    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === ''){
        mostrarAlerta('Todos los campos son obligatorios');

        return;
    }

    consultarAPI(ciudad, pais);

    formulario.reset();

 }


 function mostrarAlerta(mensaje){
    const divAlerta = document.createElement('DIV');
    const btnSubmit = formulario.querySelector('input[type="submit"]');
    divAlerta.classList.add('alerta', 'bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

    divAlerta.innerHTML = `
        <strong class= "font-bold"> Error! </strong>
        <span class= "block">${mensaje}</span>
    
    `

    container.appendChild(divAlerta);

    btnSubmit.disabled = true;

    setTimeout(() => {
       
        const btnSubmit = formulario.querySelector('input[type="submit"]');
        btnSubmit.disabled = false;

        divAlerta.remove();
    }, 2000);
 }


function consultarAPI(ciudad, pais){

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`

    fetch(url)
        .then(resultado => resultado.json())
        .then(datos => {

            limpiarHTML() //Limpia el HTML previo

            if(datos.cod === "404"){
                mostrarAlerta('Ciudad no encotrada');
                return;
            }

            mostrarClima(datos);
        });
}



function mostrarClima(datos){

    const {name, main:{temp, temp_max, temp_min}} = datos;

    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement('P');
    nombreCiudad.textContent = name;
    nombreCiudad.classList.add('font-bold', 'text-2xl');

    const actual = document.createElement('P');
    actual.innerHTML= `${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    const tempMaxima = document.createElement('P');
    tempMaxima.innerHTML = `Max: ${max} &#8451;`
    tempMaxima.classList.add('text-xl');

    const tempMinima = document.createElement('P');
    tempMinima.innerHTML = `Min: ${min} &#8451;`
    tempMinima.classList.add('text-xl');

    const resultadoDiv = document.createElement('DIV');
    resultadoDiv.classList.add('text-center', 'text-white');

    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);

    resultado.appendChild(resultadoDiv);

}

const kelvinACentigrados = grados => parseInt(grados - 273.15);

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}
