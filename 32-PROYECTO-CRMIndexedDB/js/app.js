(function (){

    let DB;
    const lista = document.querySelector('#listado-clientes');
   

    window.onload = () => {
        crearDB();
        
        lista.addEventListener('click', eliminarCliente);

    }




    function crearDB(){
        const crearDB = window.indexedDB.open('crm', 1);

        crearDB.onupgradeneeded = (e) => {
            const db = e.target.result;

            const objectStore = db.createObjectStore('crm', {
                keyPath: 'id',
                autoIncrement: true
            });

            objectStore.createIndex('nombre', 'nombre', {unique: false});
            objectStore.createIndex('email', 'email', {unique: true});
            objectStore.createIndex('telefono', 'telefono', {unique: false});
            objectStore.createIndex('empresa', 'empresa', {unique: false});
        }

        crearDB.onerror = (e) => {
            console.log(e.target.error?.message);
         }

        crearDB.onsuccess = () => {
            console.log('base de datos creada con éxito');
            DB = crearDB.result;
            mostrarClientes();
         }



    }

    function mostrarClientes(){


        limpiarHtml();


        const objectStore = DB.transaction(['crm']).objectStore('crm');
        

        objectStore.openCursor().onsuccess = (e) => {
            const cursor = e.target.result;

            if(cursor){
                const {nombre, email, telefono, empresa, id} = cursor.value;

                lista.innerHTML += ` <tr>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
              <p class="text-sm leading-10 text-gray-700"> ${email} </p>
          </td>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
              <p class="text-gray-700">${telefono}</p>
          </td>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
              <p class="text-gray-600">${empresa}</p>
          </td>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
              <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
              <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
          </td>
      </tr>
  `;
                


    
                cursor.continue();
            }
            
         }
    }

    function eliminarCliente(e){
        if(e.target.classList.contains('eliminar')){
            const idEliminar = Number(e.target.dataset.cliente);

            const confirmar = confirm('Deseas eliminar este cliente?');

            if(confirmar){
                const transaction = DB.transaction(['crm'], 'readwrite');
                const objectStore = transaction.objectStore('crm');

                objectStore.delete(idEliminar);

                transaction.oncomplete = () => {
                    console.log("Eliminado");
                    limpiarHtml();
                    mostrarClientes();
                 }

                transaction.onerror = (e) => {
                    console.log(e.target.error?.message);
                 } 
            }
        }
    }



    function limpiarHtml(){
        const lista = document.querySelector('#listado-clientes');

        while(lista.firstChild){
            lista.removeChild(lista.firstChild);
        }
    }

}

)();