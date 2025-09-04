const selectCriptoMoneda = document.querySelector('#criptomoneda');

document.addEventListener('DOMContentLoaded',() => {
    buscarCriptomonedas();
 })


function buscarCriptomonedas(){
    const url = 'https://min-api.cryptocompare.com/data/top/mktcap?limit=10&tsym=USD';

    fetch(url)
        .then(response => response.json())
        .then(data => agregarSelect(data.Data));
}

function agregarSelect(arrCripto){
    
    arrCripto.forEach(cripto => {
        const {Name, FullName} = cripto.CoinInfo;

        const option = document.createElement('OPTION');
        option.value = Name;
        option.textContent = FullName;
        selectCriptoMoneda.appendChild(option);
    });
    
}