document.addEventListener('DOMContentLoaded', iniciarApp);

function iniciarApp(){
    const selectCategoria = document.querySelector('#categorias');
    const resultadoCategoria = document.querySelector('#resultado');

    const modal = new bootstrap.Modal('#modal', {});
    selectCategoria.addEventListener('change', seleccionarCategoria);




    obtenerCategorias();

    function obtenerCategorias(){
        const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';

        fetch(url)
            .then(resultado => resultado.json())
            .then(datos => llenarSelect(datos.categories));
    }

    function llenarSelect(opciones = []){
       
        opciones.forEach(categoria => {
            const {strCategory} = categoria;
            const opcionCategoria = document.createElement('OPTION');

            opcionCategoria.value = strCategory;
            opcionCategoria.textContent = strCategory;

            selectCategoria.appendChild(opcionCategoria);

        });
    }
    
    function seleccionarCategoria(e){
    
        const categoria = e.target.value;
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`;

        fetch(url)
            .then(resultado => resultado.json())
            .then(datos => mostrarPlatillo(datos.meals));

    }

    function mostrarPlatillo(platillos = []){
        limpiarHTML(resultadoCategoria);

        const heading = document.createElement('H2');
        heading.classList.add('text-center', 'text-black', 'my-5');
        heading.textContent = platillos.length ? 'Resultados' : 'No hay resultados';
        resultadoCategoria.appendChild(heading);
        
        platillos.forEach(platillo => {
            const {idMeal, strMeal, strMealThumb} = platillo;

            const platilloContenedor = document.createElement('DIV');
            platilloContenedor.classList.add('col-md-4');

            const platilloCard = document.createElement('DIV');
            platilloCard.classList.add('card', 'mb-4');

            const platilloImg = document.createElement('IMG');
            platilloImg.classList.add('card-img-top');
            platilloImg.alt = `Imagen del platillo ${strMeal}`;
            platilloImg.src = strMealThumb;

            const platilloCardBody = document.createElement('DIV');
            platilloCardBody.classList.add('card-body');

            const platilloCardHeading = document.createElement('H3');
            platilloCardHeading.classList.add('card-body', 'mb-3');
            platilloCardHeading.textContent = strMeal;

            const platilloButton = document.createElement('BUTTON');
            platilloButton.classList.add('btn', 'btn-danger', 'w-100');
            platilloButton.textContent = 'Ver Platillo';
            platilloButton.onclick = function(){
                seleccionarPlatillo(idMeal);
            }

            //Inyectar en el HTML

    
            platilloCardBody.appendChild(platilloCardHeading);
            platilloCardBody.appendChild(platilloButton);

            platilloCard.appendChild(platilloImg);
            platilloCard.appendChild(platilloCardBody);

            platilloContenedor.appendChild(platilloCard);
            resultadoCategoria.appendChild(platilloContenedor);

        });
    }

    function seleccionarPlatillo(id){
        const url = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

        fetch(url)
            .then(resultado => resultado.json())
            .then(datos => mostrarReceta(datos.meals[0]));

    }


    function mostrarReceta(receta){
        const {idMeal, strInstructions, strMeal, strMealThumb} = receta;

        const modalTitle = document.querySelector('.modal .modal-title');
        const modalBody = document.querySelector('.modal .modal-body');
        
        modalTitle.textContent = strMeal;
        
        modalBody.innerHTML = `
            <img class = "img-fluid" src="${strMealThumb}" alt="Imagen de ${strMeal}"/>
            <h3 class="my-3">Instructions</h3>
            <p>${strInstructions}</p>
            <h3 class="my-3">Ingredients</h3>
        `

        //Mostrar lista de ingredientes
        const listGroup = document.createElement('UL');
        listGroup.classList.add('list-group');


        for (let i = 1; i <=20; i++){
            const ingrediente = receta[`strIngredient${i}`];
            const cantidad = receta[`strMeasure${i}`];

            if(ingrediente){
                const listItem = document.createElement('LI');
                listItem.classList.add('list-group-item');
                listItem.textContent = `${ingrediente}  -  ${cantidad} `;

                listGroup.appendChild(listItem);
            }
        }

        modalBody.appendChild(listGroup);

        modal.show();


    }

    function limpiarHTML(selector){
        while(selector.firstChild){
            selector.removeChild(selector.firstChild);
        }
    }
    
}    

