const url = 'http://localhost:4000/clientes';

export async function nuevoCliente(obj){
    try {
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        window.location.href = 'index.html';

    } catch (error) {
        console.log(error);
    }
}

export async function consultarAPI() {
    try {
        const resultado = await fetch (url);
        const datos = await resultado.json();

        return datos;

    } catch (error) {
        console.log(error);
    }
}


export async function eliminarCliente(id){
    try {
        await fetch(`${url}/${id}`,{
            method: 'DELETE'
        });
    } catch (error) {
        console.log(error);
    }
}

export async function obtenerCliente(id) {
   
    try {
        const resultado = await fetch(`${url}/${id}`);
        const cliente = await resultado.json();
    
        return cliente;  
    } catch (error) {
        console.log(error);
    }
}

export async function editarCliente(cliente) {
    try {
        await fetch(`${url}/${cliente.id}`,{
            method: 'PUT',
            body: JSON.stringify(cliente),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        window.location.href = 'index.html';
    } catch (error) {
        console.log(error);
    }
}