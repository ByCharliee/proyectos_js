//Selectores y variables
const btnInicio = document.querySelector('#btn-iniciar');
const contador = Number(document.querySelector('#tiempo').textContent);
const mensaje = document.querySelector('#mensaje-juego');
let puntaje;
//Eventos 
eventosListeners();

function eventosListeners(){
    btnInicio.addEventListener('click', iniciarJuego);
}

//Clases

class UI{
    constructor(){
        this.tiempo = document.querySelector('#tiempo');
        this.tablero = document.querySelector('#tablero-juego');
       this.topo = this.crearTopo();
       
    }

    actualizarTiempo(seg){
        this.tiempo.textContent = seg;

    }

    crearTopo(){
        const topo = document.createElement('DIV');
        topo.classList.add('topo', 'visible');
        topo.addEventListener('click', () => {
            puntaje++;
            this.golpearTopo();
            
            
         })

        return topo;
    }

    mostrarTopo(){
        
        this.limpiarHTML();


        const posicion = this.tablero.children[Math.floor(Math.random() * 9)];
        // console.log(Math.floor(Math.random() * 9));
        posicion.appendChild(this.topo);
    
    
        
        
    }

    golpearTopo(){
        this.topo.classList.remove('visible');
        this.topo.classList.add('golpeado');
        setTimeout(() => {
            this.topo.classList.add('visible');
            this.topo.classList.remove('golpeado');
        }, 200);

        //Actualiza el puntaje
        document.querySelector('#puntaje').textContent = puntaje;
    }

   


    limpiarHTML(){
        let cont = 0;
        while(this.tablero.childElementCount > cont){

            if(this.tablero.children[cont].firstChild){
                this.tablero.children[cont].removeChild(this.tablero.children[cont].firstChild);
            }
            
            cont++;
        }
    }

}

//Instancias
const ui = new UI();

//Funciones
function iniciarJuego(){
    //Resetear valores
    puntaje = 0;
    document.querySelector('#puntaje').textContent = puntaje;
    mensaje.textContent = '';


    //Activamos el tiempo
    for (let i = 0, j = contador; i <= contador; j--, i++) {
        setTimeout(() => {
            // console.log(j);
            ui.actualizarTiempo(j);
            ui.mostrarTopo();

        }, i*1000);
    }

    //Deshabilitar el botón de inicio
    btnInicio.disabled = true;
    btnInicio.className = "bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg  duration-300  shadow-xl";

    //Acciones para el juego terminado
    setTimeout(() => {
        juegoTerminado();
    }, 15000);
   
    function juegoTerminado(){
        ui.limpiarHTML();
        btnInicio.disabled = false;
        btnInicio.className = "bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-xl";
        mensaje.textContent = `¡Juego terminado! Tu puntaje es de: ${puntaje} puntos`;
    }
   
}

