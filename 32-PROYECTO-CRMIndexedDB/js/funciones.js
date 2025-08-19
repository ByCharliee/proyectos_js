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