 //Variables
 const marca = document.querySelector('#marca');
 const year = document.querySelector('#year');
 const minimo = document.querySelector('#minimo');
 const maximo = document.querySelector('#maximo');
 const puertas = document.querySelector('#puertas');
 const transmision = document.querySelector('#transmision');
 const color = document.querySelector('#color');

 const max = new Date().getFullYear();
 const min = max - 10;
 
//Contenedor de resultados de búsqueda
const resultado = document.querySelector('#resultado');

//Objeto para el filtrado de resultados

const datosBusqueda = {
    marca :'',
    year :'',
    minimo :'',
    maximo :'',
    puertas :'',
    transmision :'',
    color :''
}


 
 //Eventos
 document.addEventListener('DOMContentLoaded',() => {
     mostrarAutos(autos); //muestra el listado de autos

     llenarSelect(); // Añande las opciones de año al select
  })

//Eventos para los select de la búsqueda  
  marca.addEventListener('change', e => {
      datosBusqueda.marca = e.target.value;

      filtrarAuto();
   })

   year.addEventListener('change', e => {
        datosBusqueda.year = parseInt(e.target.value);

        filtrarAuto()
    });

    minimo.addEventListener('change', e => {
        datosBusqueda.minimo = parseInt(e.target.value);
        filtrarAuto();
    });

    maximo.addEventListener('change', e => {
        datosBusqueda.maximo = e.target.value;
        filtrarAuto();
    });

    puertas.addEventListener('change', e => {
        datosBusqueda.puertas = parseInt(e.target.value);
        filtrarAuto();
    });

    transmision.addEventListener('change', e => {
        datosBusqueda.transmision = e.target.value;
        filtrarAuto();
    });

    color.addEventListener('change', e => {
        datosBusqueda.color = e.target.value;
        filtrarAuto();
    });




  //Funciones
  function mostrarAutos(autos){
    limpiarHtml();

    autos.forEach(auto => {
        const {marca, modelo, year, precio, puertas, color, transmision} = auto;
        
        const item = document.createElement('P');
        item.innerHTML = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: $${precio} - Color: ${color}
        `
        resultado.appendChild(item);

     })

  }

  //Limpirar HTML

  function limpiarHtml(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
  }


  function llenarSelect(){

    for(let i = max; i >= min; i-- ){
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        year.appendChild(option);
    }

  }

  function filtrarAuto(){
    const busqueda = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    // console.log(busqueda);
    mostrarAutos(busqueda); //se le mandan los resultados de la búsqueda por filtro a la función 
  }

  function filtrarMarca(auto){
    const {marca} = datosBusqueda;
    if(marca){
        return auto.marca === marca;
    }
 
    return true;
  }

  function filtrarYear(auto){
    const {year} = datosBusqueda;
    if(year){
        return auto.year === year;
    }

    return true;
  }

  function filtrarMinimo(auto){
    const {minimo} = datosBusqueda;
    if(minimo){
        return auto.precio >= minimo;
    }

    return true;
  }

  function filtrarMaximo(auto){
    const {maximo} = datosBusqueda;
    if(maximo){
        return auto.precio <= maximo;
    }

    return true;
  }

  function filtrarPuertas(auto){
    const {puertas} = datosBusqueda;
    if(puertas){
        return auto.puertas === puertas;
    }

    return true;
  
}
  function filtrarTransmision(auto){
    const {transmision} = datosBusqueda;
    if(transmision){
        return auto.transmision === transmision;
    }

    return true;
  }

  function filtrarColor(auto){
    const {color} = datosBusqueda;
    if(color){
        return auto.color === color;
    }

    return true;
  }

