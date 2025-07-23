document.addEventListener('DOMContentLoaded', function(){

    const email = {
        email : '',
        asunto: '',
        mensaje : ''
    }



    //Seleccionar los elementos del formulario
    const inputEmail = document.querySelector('#email');
    const inputExtra = document.querySelector('#extra');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnEnviar = document.querySelector('#botones button[type=submit]');
    const btnReset = document.querySelector('#botones button[type=reset]');
    const spinner = document.querySelector('#spinner');
    

    //Asignar los eventos 
    inputEmail.addEventListener('blur', validar);
    inputExtra.addEventListener('blur', validar);
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);


    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(e){
        e.preventDefault();
        

        //Resetear el objeto
        resetearFormulario();
    })

    function enviarEmail(e){
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            resetearFormulario();
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            //Mostrar alerta de éxito

            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'rounded-lg', 'text-center', 'font-bold', 'uppercase', 'text-sm');
            alertaExito.textContent="Mensaje enviado correctamente.";
            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);

        }, 3000);

        
    }



    function validar (e){
        let mensaje = ''
        //Valida que el campo contenga información válida
        if(e.target.value.trim() === '' && e.target.id !== 'extra'){
            switch(e.target.id){
                case 'email': 
                    mensaje= "Este campo es obligatorio.";
                break;
                case 'asunto':
                    mensaje = "Debe llenar el asunto.";
                break;
                default:
                    mensaje = "Debe incluir un mensaje";
                break;     
            }
            mostrarAlerta(mensaje, e.target.parentElement);
            email[e.target.id] = '';
            comprobarEmail();
            return;
        }

        

        //Verifica que sea un email válido
        if((e.target.id === 'email' || (e.target.id === 'extra' && e.target.value !== '') ) && !validarEmail(e.target.value)) {
            mostrarAlerta("El email no es válido", e.target.parentElement);
            email[e.target.id] = '';
            comprobarEmail();
            return;
        }
        



        limpiarHtml(e.target.parentElement);

        //Asignar los valores del input al objeto y comprobar el email
        email[e.target.id] = e.target.value.trim().toLowerCase();

        //Verificar que se ingresó un destinatario extra, si el campo está vacío, elimina la propiedad del objeto 
        if(e.target.id === 'extra' && e.target.value === ''){
            delete email.extra;
        }
       
        console.log(email);
        comprobarEmail();

    }

    function mostrarAlerta(mensaje, referencia){
        //valida si la alerta está activada
        limpiarHtml(referencia);


        //Crea el mensaje de error
        const error = document.createElement('p');

        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'p-2', 'text-center', 'text-white', 'font-medium', 'alerta');
        
        //Añade el error a HTML
        referencia.appendChild(error);

        console.log(error);

    }

    //Elimina el html de la referencia que llegue como parámetro
    function limpiarHtml(referencia){
        const alerta = referencia.querySelector('.alerta');
        if(alerta){
            alerta.remove();
        }
        
    }

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
        const resultado = regex.test(email);
        
        return resultado;
    }

    //Comprueba que el objeto tenga contenido en sus atributos
    function comprobarEmail(){
        if(Object.values(email).includes('')){
            btnEnviar.setAttribute('disabled', 'true');
            btnEnviar.classList.add('opacity-50');
        }else{
            btnEnviar.removeAttribute('disabled');
            btnEnviar.classList.remove('opacity-50');
        }
    }

    function resetearFormulario(){
        email.email = '';
        email.extra = '';
        email.asunto = '';
        email.mensaje = '';

        formulario.reset();
        
        comprobarEmail();
    }


})