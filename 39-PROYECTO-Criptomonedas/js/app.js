const selectCripto = document.querySelector('#criptomoneda');
const selectMoneda = document.querySelector('#moneda');
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

const objCambio = {
    moneda: '',
    criptomoneda: '',
    nombreMoneda: '',
    nombreCripto: ''
}


document.addEventListener('DOMContentLoaded',() => {
    buscarCriptomonedas();

    formulario.addEventListener('submit', validarFormulario);
    selectCripto.addEventListener('change', leerValor);
    selectMoneda.addEventListener('change', leerValor);

 })


function buscarCriptomonedas(){
    const url = 'https://min-api.cryptocompare.com/data/top/mktcap?limit=10&tsym=USD';

    fetch(url)
        .then(response => response.json())
        .then(data => agregarSelect(data.Data));
}

function agregarSelect(arrCripto){

    
    arrCripto.forEach(cripto => {
        const {Name, FullName} = cripto.CoinInfo;

        const option = document.createElement('OPTION');
        option.value = Name;
        option.textContent = FullName;
        selectCripto.appendChild(option);
    });
    
}

function leerValor(e){
    objCambio[e.target.name] = e.target.value;

    //Extrae el nombre de la moneda en el Option seleccionado
    const moneda = [...e.target.children].find(item => item.value === e.target.value);
    objCambio[e.target.dataset.coin] = moneda.textContent;
    
    console.log(moneda.textContent);
    console.log(e.target.dataset.coin);

    console.log(objCambio);
}

function validarFormulario(e){
    e.preventDefault();

    const {moneda, criptomoneda} = objCambio;

    //Verificar si hay alerta activa
    if(document.querySelector('.alerta')){
        return;
    }

    if(moneda === '' || criptomoneda === ''){
        mostrarAlerta('Debes seleccionar ambos campos');
        return;
    }

    consultarCotizacion(moneda, criptomoneda);

    formulario.reset();


}

function mostrarAlerta(mensaje){
    const divAlerta = document.createElement('DIV');
    divAlerta.classList.add('alerta', 'error');
    divAlerta.textContent = mensaje;

    formulario.appendChild(divAlerta);

    setTimeout(() => {
        divAlerta.remove();
    }, 1500);
}

function consultarCotizacion(moneda, criptomoneda){
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

    mostrarSpinner();

    fetch(url)
        .then(response => response.json())
        .then(data => mostrarCotizacion(data.DISPLAY[criptomoneda][moneda]));
}

function mostrarCotizacion(cotizacion){
    limpiarHtml();

    console.log(cotizacion);

    const {CHANGEPCT24HOUR, HIGHDAY, LASTUPDATE, LOWDAY, PRICE} = cotizacion;

    const descripcion = document.createElement('H2');
    descripcion.classList.add('descripcion');
    descripcion.textContent = `${objCambio.nombreMoneda}  -  ${objCambio.nombreCripto}`;

    const precio = document.createElement('P');
    precio.classList.add('precio');
    precio.innerHTML = `El precio actual es de:<span>${PRICE}</span>`;

    const precioAlto = document.createElement('P');
    precioAlto.innerHTML = `El precio más alto es de:<span>${HIGHDAY}</span>`;

    const precioBajo = document.createElement('P');
    precioBajo.innerHTML = `El precio más bajo es de:<span>${LOWDAY}</span>`;

    const variacion = document.createElement('P');
    variacion.innerHTML = `Variación las últimas 24 horas:<span>${CHANGEPCT24HOUR}%</span>`;

    const actualizacion = document.createElement('P');
    actualizacion.innerHTML = `Última actualización:<span>${LASTUPDATE}</span>`;

    



    resultado.appendChild(descripcion);
    resultado.appendChild(precio);
    resultado.appendChild(precioAlto);
    resultado.appendChild(precioBajo);
    resultado.appendChild(variacion);
    resultado.appendChild(actualizacion);



}

function mostrarSpinner(){
    const spinner = document.createElement('DIV');
    spinner.classList.add('spinner');

    spinner.innerHTML = `
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    
    `

    resultado.appendChild(spinner);
}

function limpiarHtml(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}