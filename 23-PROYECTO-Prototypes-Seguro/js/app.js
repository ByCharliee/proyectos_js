//Constructores
function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year; 
    this.tipo = tipo;
}

function UI(){}


//Prototype de Seguro--------
Seguro.prototype.cotizarSeguro = function(){
    /*
        1 = Americano +1.15
        2 = Asiático +1.05
        3 = Europeo +1.35
    
    */
    let cotizacion;
    const base = 2000;

    switch(this.marca){
        case '1':
            cotizacion = base * 1.15;
            break;
        case '2':
            cotizacion = base * 1.05; 
            break;
        case '3':
            cotizacion = base * 1.35; 
            break;
        default:
            break;
    }

    console.log(cotizacion);

    /**
      Decrementa 3% por cada año 
     */
    const diferencia = new Date().getFullYear() - this.year;
    cotizacion -= ((diferencia * 3) * cotizacion) / 100;

    console.log(cotizacion);
    
    /**
     Si el seguro es básico se multiplica por 30% más
     Si el seguro es completo se multiplica por 50% más
     
     */

     if(this.tipo === 'basico'){
        cotizacion *= 1.30;
     }else{
        cotizacion *= 1.50;
     }

     console.log(cotizacion);
     return cotizacion;

}





//Prototype de UI---------

//Llena las opciones de los años
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear();
    const min = max - 10;

    const selectYeaer = document.querySelector('#year');

    for(let i = max; i >= min; i--){
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYeaer.appendChild(option);
    }

}

//Mostrar resultado de cotización
UI.prototype.mostrarResultado = (seguro, total) => {
    //Destructuring al objeto seguro
    let {marca, year, tipo} = seguro;
    switch(marca){
        case '1':
            marca = 'Americano';
            break;
        case '2':
            marca = 'Asiático';
            break;
        case '3':
            marca = 'Americano';
            break;
        default:
            break;
    }

    //Html del resultado
    const div = document.createElement('DIV');
    div.classList.add('mt-10');
    div.innerHTML = `
        <p class = "header">Tu Resumen</p>
        <p class = "font-bold" >Marca: <span class  = "font-normal"> ${marca} </span></p>
        <p class = "font-bold" >Año: <span class = "font-normal"> ${year} </span></p>
        <p class = "font-bold" >Tipo de seguro: <span class = "font-normal capitalize"> ${tipo} </span></p>
        <p class = "font-bold" >Total: <span class = "font-normal">$ ${total} </span></p>
    
    `

    const resultado = document.querySelector('#resultado');

    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none';
        resultado.appendChild(div);
    }, 3000);


 }

//Muestra mensaje
UI.prototype.mostrarAlerta = (mensaje, tipo) => {
    const div = document.createElement('DIV');
    div.classList.add('mensaje', 'mt-10');

    if(tipo){
        div.classList.add('correcto');
    }else{
        div.classList.add('error');
    }
    div.textContent = mensaje;
    //Añadir mensaje a formularo
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 3000);


 }



//Instancias---------
const ui = new UI();





//Eventos-------
eventosListeners();
function eventosListeners(){
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones();
 })



 //Funciones-----
function cotizarSeguro(e){
    e.preventDefault();

    if (document.querySelector('.mensaje')) {
        console.log("alerta activa");
        return;
    }

    //Marca
    const marca = document.querySelector('#marca').value;

    //Año
    const year = document.querySelector('#year').value;

    //Tipo
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

   //Validación de formulario
   if (marca === '' || year === '' || tipo === '') {
        ui.mostrarAlerta("Todos los campos son obligatorios.", false);
        return;
   }

   ui.mostrarAlerta("Cotizando", true);

   const resultado = document.querySelector('#resultado div');
   if(resultado != null){
    resultado.remove();
   }

   //Instanciar el seguro
   const seguro = new Seguro(marca, year, tipo);
   const total = seguro.cotizarSeguro();

   //Mostrar el resultado de la cotización

   ui.mostrarResultado(seguro, total);

}

    

 



