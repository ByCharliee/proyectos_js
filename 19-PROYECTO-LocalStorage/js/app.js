
//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];



//Eventos
eventListeners();
document.addEventListener('DOMContentLoaded', () => {
    //Verifica el contenido de local storage
    if(localStorage.length > 0){
     tweets = JSON.parse(localStorage.getItem('tweets'));
     crearHtml();
}

 })

function eventListeners(){
    formulario.addEventListener('submit', agregarTweet);
}


//Funciones
function agregarTweet(e){
    e.preventDefault();

    //Obteniendo el contenido del tweet y validando formulario
    const tweet = document.querySelector('#tweet').value; 
    console.log(tweet);

    if (tweet === '') {
        mensajeError("El mensaje no puede estar vacío");
        return;
    }

    //Crear el objeto de tweet
    const tweetObj = {
        id: Date.now(), 
        tweet
    }

    //Agregar el tweet al arreglo
    tweets = [...tweets, tweetObj ]

    console.log(tweets);
    console.log("Agregando tweet");

    //Crea el Html
    crearHtml();



    //Resetear formulario
    formulario.reset();

}

//Muestra mensaje de error
function mensajeError(error){

    const contenido = document.querySelector('#contenido');
    const mensaje = document.createElement('P');
    mensaje.textContent = error;
    mensaje.classList.add("error");

    contenido.appendChild(mensaje);

    setTimeout(() => {
        mensaje.remove();
    }, 3000);

}


//Crear contenido HTML
function crearHtml(){
    //Limpiar Html de la lista de tweets
    limpiarHtml();

    tweets.forEach(tweet => {
        //Crea el botón de borrar
        const btnBorrar = document.createElement('a');
        btnBorrar.textContent = "X";
        btnBorrar.classList.add('borrar-tweet');

        btnBorrar.onclick = () => {
            borrarTweet(tweet.id);
         }

        const li = document.createElement('li');
        li.innerHTML = tweet.tweet;


        //Añadir boton de borrar al tweet
        li.appendChild(btnBorrar);

        //Añadir los elementos al contenedor
        listaTweets.appendChild(li);
    
       

        
    });

//    console.log(listaTweets);
    

    //Añadir los tweets a local storage
    sincronizarElementos();
}

//Almacenar tweets
function sincronizarElementos(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Borra un tweet
function borrarTweet(id){
     tweets = tweets.filter(tweet =>  tweet.id !== id);

    //  console.log(id);
    crearHtml();

}


//Limpiar el contenido html
function limpiarHtml(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}