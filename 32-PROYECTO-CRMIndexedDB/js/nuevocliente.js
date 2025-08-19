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
            
            //crear objeto con los valores del cliente
            const cliente = {nombre, email, telefono, empresa};
    
            if (Object.values(cliente).some(value => value.trim() === '')) {
                imprimirAlerta('Todos los campos son obligatorios', 'error');
                return;
            }else if (!validarEmail(cliente.email)){
                imprimirAlerta('Ingrese un email válido', 'error');
                return;
            }

            cliente.id = Date.now();

            crearCliente(cliente);
    
            
        }

       

        formulario.reset();
       


    }

    function crearCliente(cliente){

        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');

        objectStore.add(cliente);

        transaction.onerror = (e) => {
            console.log(e.target.error?.message);
         }
        
        transaction.oncomplete = () => {
            imprimirAlerta('El cliente se agregó correctamente');

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1200);
         } 

    }

   








})();