(function(){

    let DB;

    //Selectores
    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded', () => {
      
        conectarBD();  
        formulario.addEventListener('submit', validarFormulario);
        activarFormulario();

    })


    function conectarBD(){
        const conectarBD = window.indexedDB.open('crm', 1);


        conectarBD.onsuccess = () => {
            console.log("Conectado con éxito...");
            DB = conectarBD.result;
            console.log(DB);
    
         }

        conectarBD.onerror= (e) => {
            console.log(e.target.error?.message);
        }

       

    }

    function validarFormulario(e){
        e.preventDefault();
        if(!document.querySelector('.alerta')){
            const nombre = formulario.querySelector('#nombre').value;
            const email = formulario.querySelector('#email').value;
            const telefono = formulario.querySelector('#telefono').value;
            const empresa = formulario.querySelector('#empresa').value;
    
            const formData = {nombre, email, telefono, empresa};
    
            if (Object.values(formData).some(value => value.trim() === '')) {
                imprimirAlerta('Todos los campos son obligatorios', 'error');
                return;
            }else if (!validarEmail(formData.email)){
                imprimirAlerta('Ingrese un email válido', 'error');
                return;
            }else{
                imprimirAlerta('Cliente agregado correctamente', 'exito');
            }
    
            
        }

        formulario.reset();
       


    }

    function imprimirAlerta(mensaje, tipo){
        const divMensaje = document.createElement('DIV');
        divMensaje.classList.add('px-4', 'py-3', 'rounded', 'mx-w-lg', 'mx-auto', 'mt-6', 'text-center', 'border', 'alerta');

        if(tipo === 'error'){
            divMensaje.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
        }else{
            divMensaje.classList.add('bg-green-100', 'border-green-400', 'text-green-700');
        }

        divMensaje.textContent = mensaje;

        formulario.appendChild(divMensaje);

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
        const resultado = regex.test(email);
        
        return resultado;
    }
     
    function activarFormulario(){
        if(document.querySelector('.alerta')){
            document.querySelector('input[type="submit"]').disabled = true;
        }else{
            document.querySelector('input[type="submit"]').disabled = false;
        }
    }







})();