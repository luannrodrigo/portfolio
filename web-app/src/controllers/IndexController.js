// importando a model dos portfolios
import PortfolioModel from "../models/portfolio/PortfolioModel";

let divPortfolios = window.document.getElementById("div-portfolios");
let ObjIndexController; 

class IndexController{
    // Criando os metodos
    getTodosIndex(divPortfolios){
        let promise = new Promise(function(resolve, reject) {
           let promiseFetch = PortfolioModel.getTodos(); 
           promiseFetch.then(response => {
                resolve(response);
           })
        });

        promise.then(response => {
            let dados = "";

            for(const servico of response.dados){
                dados += `
                <div class="card" text-white bg-primary;">
                <div class="card-head">
                    <h3 class="card-title">${servico.descricao}</h3>
                    <h5 class="card-title">${servico.nome}</h5>
                </div>
                <div class="card-body>
                    <p class="card-text>${servico.detalhes}</p>
                </div>   
              </div><br>`;
            }
            divPortfolios.innerHTML = dados;
        }).catch(response => console.log("Erro: ", response));
    }
}

function main(){
    ObjIndexController = new IndexController();
    ObjIndexController.getTodosIndex(divPortfolios)

}
window.onload = main;
