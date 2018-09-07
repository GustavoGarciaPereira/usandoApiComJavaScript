document.querySelector('#dolar').addEventListener('click',function(){
    obterDados("dolar");
});

document.querySelector('#uf').addEventListener('click',function(){
    obterDados('uf');
});

document.querySelector('#cotacaoDolar').addEventListener('click',function(){
    obterDadosCotacaoDoDolar(1);
});

function obterDados(valor){
    let url = `https://mindicador.cl/api/${valor}`;
    const api = new XMLHttpRequest();
    api.open('GET', url, true);
    api.send();
    
    api.onreadystatechange = function(){
        if(this.status == 200 && this.readyState == 4){            
            let dados = JSON.parse(this.responseText);
            //console.log(dados.serie[1]['fecha']);
            //console.log(dados.serie);
            let resultado = document.querySelector('#resultado');
            resultado.innerHTML = '';
            let i = 0;
            for (let item of dados.serie){
                resultado.innerHTML +=  `<li> Data: ${(item.fecha).substr(0, 10)} - Valor: $ ${item.valor} - moeda: ${dados.codigo}</li>`;
                i+=1;
                if(i==10){
                    break;
                }
            }            
        }else{
            let resultado = document.querySelector("#resultado");
            resultado.innerHTML = '';
            resultado.innerHTML = `<b>Erro ao procurar os dados</b>`;
        }
    }     
}

function obterDadosCotacaoDoDolar(){
    let url = `https://api.promasters.net.br/cotacao/v1/valores?moedas=USD&alt=json`;
    const api = new XMLHttpRequest();
    api.open('GET', url, true);
    api.send();

    api.onreadystatechange = function(){
        if(this.status == 200 && this.readyState == 4){
            let dados = JSON.parse(this.responseText);
            console.log(dados.valores.USD);
            let resultado = document.querySelector("#resultado");
            resultado.innerHTML = '';
            resultado.innerHTML = `<p><b>Valor do ${dados.valores.USD.nome}:</b> ${dados.valores.USD.valor}</p>`
        }else{
            let resultado = document.querySelector("#resultado");
            resultado.innerHTML = '';
            resultado.innerHTML = `<b>Erro ao procurar os dados</b>`;
        }
    }   
}