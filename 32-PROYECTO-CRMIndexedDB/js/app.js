(function (){

    let DB;

    window.onload = () => {
        crearDB();
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
            Db = crearDB.result;
         }



    }

}

)();