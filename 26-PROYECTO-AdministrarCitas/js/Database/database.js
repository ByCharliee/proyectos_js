

export let DB;

export function crearDB(done){
    //Creando la base de datos
    const crearDB = window.indexedDB.open('citas', 1);

    //Creamos el Schema 
    crearDB.onupgradeneeded = (e) => {
        const db = e.target.result;
        
        const objectStore = db.createObjectStore('citas', {
            ketpath: 'id', 
            autoIncrement: true
        });

        objectStore.createIndex('paciente', 'paciente', {unique: false});
        objectStore.createIndex('propietario', 'propietario', {unique: false});
        objectStore.createIndex('email', 'email', {unique: false});
        objectStore.createIndex('fecha', 'fecha', {unique: false});
        objectStore.createIndex('sintomas', 'sintomas', {unique: false});
        objectStore.createIndex('id', 'id', {unique: true});

     }

    //Si hay error 
    crearDB.onerror = () => {
        console.log("No se pudo crear la base de datos");
     }

    //si todo sale bien
    crearDB.onsuccess =() => {
        console.log("Base de datos creada con exito");
        DB = crearDB.result; 
        console.log(DB);

        if(done) done();
     }


}