(function(){
    let DB;
    let idParametros;
    const nombreCliente = document.querySelector('#nombre');
    const emailCliente = document.querySelector('#email');
    const telefonoCliente = document.querySelector('#telefono');
    const empresaCliente = document.querySelector('#empresa');
    const formulario = document.querySelector('#formulario');

    formulario.addEventListener('submit', actualizarCliente);

    document.addEventListener('DOMContentLoaded', () => {

        idParametros = new URLSearchParams(window.location.search).get('id');
        conectarBD();

     })

     function conectarBD(){
        const conectarBD = window.indexedDB.open('crm', 1);


        conectarBD.onsuccess = () => {
            console.log("Conectado con éxito...");
            DB = conectarBD.result;
            console.log(DB);
            obtenerClientes();
    
         }

        conectarBD.onerror= (e) => {
            console.log(e.target.error?.message);
        }
     }


    function obtenerClientes(){
        const objectStore = DB.transaction(['crm']).objectStore('crm');

        objectStore.openCursor().onsuccess = (e) => {
            const cursor = e.target.result; 
            if(cursor){
                const {nombre, email, telefono, empresa, id} = cursor.value;
                if(id === Number(idParametros)){
                    console.log(cursor.value);
                    nombreCliente.value = nombre;
                    emailCliente.value = email;
                    telefonoCliente.value = telefono;
                    empresaCliente.value = empresa;

                }
                cursor.continue();
            }
         }
    }

    function actualizarCliente(e){
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

            const transaction = DB.transaction(['crm'], 'readwrite');
            const objectStore = transaction.objectStore('crm');

            cliente.id = Number(idParametros);
            objectStore.put(cliente);

            transaction.oncomplete = () => {
                imprimirAlerta('Cliente editado correctamente');
             }

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }    

        
    }


}

)();