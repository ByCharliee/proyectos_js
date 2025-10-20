export function mostrarAlerta(mensaje){
    const alerta = document.querySelector('.bg-red-100');

    if(!alerta){
        const alertaTexto = document.createElement('P');
        alertaTexto.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center');

        const alertaStrong = document.createElement('STRONG');
        alertaStrong.classList.add('font-bold');
        alertaStrong.textContent = 'Error!  ';

        const alertaSpan = document.createElement('SPAN');
        alertaSpan.classList.add('block', 'sm:inline');
        alertaSpan.textContent = mensaje;

        alertaTexto.appendChild(alertaStrong);
        alertaTexto.appendChild(alertaSpan);

        const formulario = document.querySelector('#formulario');
        formulario.appendChild(alertaTexto);

        setTimeout(() => {
            alertaTexto.remove();
        }, 2000);
    }
}

export function validarFormulario(obj){
    return !Object.values(obj).every(input => input !== '');
}