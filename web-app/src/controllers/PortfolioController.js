import PortfolioModel from '../models/portfolio/PortfolioModel';
import PortfolioClass from '../models/portfolio/PortfolioClass';


let divMsg = window.document.getElementById("msg");
let divPortfolios = window.document.getElementById("portfolios");
let formulario = window.document.getElementById("form");

let ObjPortfolioController;

class PortfolioController {
    // Metodo para criar a tabela

    getTodosTable(divPortfolios) {
        let promise = new Promise(function (resolve, reject) {
            let promiseFetch = PortfolioModel.getTodos();
            promiseFetch.then(response => {
                resolve(response);
            })
        });
        // implementado a listagem na page crud
        promise.then(response => {
            let dados = "";

            if (response.erro) {
                this.exibirMsgAlert(response.msg, 'erro');
            } else {
                dados += `
                    <div class="table-responsive text-center">
                        <table class="table table-sctriped table-bordered table-hover text-center table-sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nome</th>
                                    <th>Descrição</th>
                                    <th>Detalhes</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>                            
                            `;
                for (const servico of response.dados) {
                    dados += `
                        <tr>
                            <td>${servico.id_portifolio}</td>
                            <td>${servico.nome}</td>
                            <td>${servico.descricao}</td>
                            <td>${servico.detalhes}</td>
                            <td><button type="submit" class="btn btn-primary   btn-editar"  data-id="${servico.id_portifolio}">Editar</button></td>
                            <td><button type="submit" class="btn btn-secondary btn-excluir" data-id="${servico.id_portifolio}">Excluir</button></td>
                        </tr>`;
                }
                // Fechamaento das tags table
                dados += `  
                    </tbody>
                        </table>
                    </div>`;

                divPortfolios.innerHTML = dados;

                // Eventos dos botões editar e excluir
                let btnEditar = document.querySelectorAll(".btn-editar"); //recuperando elementos
                let btnExcluir = document.querySelectorAll(".btn-excluir"); //recuperando elementos

                // Evento botão editar
                btnEditar.forEach(function (item) {
                    // escuta o evento click 
                    item.addEventListener("click", event => {
                        //limpa os alertas
                        ObjPortfolioController.limparMsgAlert();
                        // atribui o data-id dos botõe
                        let id = event.target.getAttribute('data-id');
                        ObjPortfolioController.prepararEditar(id);
                    });
                });

                // Evento botão Excluir
                btnExcluir.forEach(function (item) {
                    // escuta o evento click 
                    item.addEventListener("click", event => {
                        //limpa os alertas
                        ObjPortfolioController.limparMsgAlert();
                        // atribui o data-id dos botõe
                        let id = event.target.getAttribute('data-id');
                        ObjPortfolioController.prepararExcluir(id);
                    });
                });
            }
        }).catch(response => console.log("Erro: ", response));
    }

    // metodo para ocultar elemento
    ocultarElemento(elemento) {
        document.getElementById(elemento).style.display = "none";
    }
    // Exibir para ocultar elemento
    exibirElemento(elemento) {
        document.getElementById(elemento).style.display = "block";
    }
    // metodo para limpar o campo formulario
    limparCampoForm(form) {
        form.id.value = "";
        form.nome.value = "";
        form.descricao.value = "";
        form.detalhes.value = "";
    }
    // Metodo para exibir a mensagem de alerta
    exibirMsgAlert(msg, tipo) {
        let dados = "";
        if (tipo == "sucesso") {
            dados = `
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>${msg}</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `
        } else if (tipo == "erro") {
            dados = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>${msg}</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>            
            `
        }
        divMsg.innerHTML = dados;
    }
    // metodo para limpar os alertas
    limparMsgAlert() {
        divMsg.innerHTML = "";


    }

    // metodo para registrar eventos
    registrarEvento() {
        // Mostrando form de cadastro e ocultando a listagem
        document.getElementById('btn-exibir-form').addEventListener("click", function () {
            // Ocultando a listagem
            ObjPortfolioController.limparMsgAlert();
            ObjPortfolioController.ocultarElemento("listagem");
            // Mostarndo o formulario de cadastro
            ObjPortfolioController.exibirElemento("formulario");
        });
        // Botão para ação de cadastrar 
        document.getElementById('btn-cadastrar-portfolio').addEventListener("click", function () {
            event.preventDefault();
            ObjPortfolioController.limparMsgAlert();
            if (formulario.id.value) {
                ObjPortfolioController.editar(formulario);
            } else {
                ObjPortfolioController.adicionar(formulario)
            }

        });
        // Botão para ação de cadastrar 
        document.getElementById('btn-cancelar').addEventListener("click", function () {
            ObjPortfolioController.limparMsgAlert();
            //Limpando os campos do formulario
            ObjPortfolioController.limparCampoForm(formulario);
            // Ocultando listagem
            ObjPortfolioController.ocultarElemento("formulario");
            // Mostarndo o formulario de cadastro
            ObjPortfolioController.exibirElemento("listagem");


        });



    }

    // Metodo da ação que pega a id para editar
    prepararEditar(id) {
        let promise = new Promise(function (resolve, reject) {
            let promiseFetch = PortfolioModel.getId(id);
            promiseFetch.then(response => {
                resolve(response);
            });
        });

        promise.then(response => {
            if (response.erro) {
                this.exibirMsgAlert(response.msg, "erro");
            } else {
                let ObjPortfolioClass = new PortfolioClass(
                    response.dados[0].id_portifolio,
                    response.dados[0].nome,
                    response.dados[0].descricao,
                    response.dados[0].detalhes
                );
                console.log(typeof (id))
                console.log(id)

                formulario.id.value = ObjPortfolioClass.id_portifolio;
                formulario.nome.value = ObjPortfolioClass.nome;
                formulario.descricao.value = ObjPortfolioClass.descricao;
                formulario.detalhes.value = ObjPortfolioClass.detalhes;


                // pegando o formulario
                ObjPortfolioController.ocultarElemento("listagem");
                ObjPortfolioController.exibirElemento("formulario");
            }
        }).catch(response => {
            console.log("Erro: ", response);
        });
    }
    // Metodo para editar 
    editar(formulario) {
        let id, nome, descricao, detalhes;
        id = formulario.id.value;
        nome = formulario.nome.value;
        descricao = formulario.descricao.value;
        detalhes = formulario.detalhes.value;

        if (id && nome && descricao && detalhes) {
            let ObjPortfolioClass = new PortfolioClass(id, nome, descricao, detalhes);

            let promise = new Promise(function (resolve, reject) {
                let promiseFetch = PortfolioModel.editar(ObjPortfolioClass);
                promiseFetch.then(response => {
                    resolve(response);
                });
            });
            promise.then(response => {
                if (response.erro) {
                    this.exibirMsgAlert(response.msg, "erro");
                } else {
                    // Populando os dados
                    ObjPortfolioController.getTodosTable(divPortfolios);
                    ObjPortfolioController.exibirMsgAlert(response.msg, "sucesso");
                    // pegando o formulario
                    ObjPortfolioController.ocultarElemento("formulario");
                    ObjPortfolioController.exibirElemento("listagem");
                    ObjPortfolioController.limparCampoForm(formulario);

                }
            }).catch(response => {
                console.log("Erro: ", response);
            });
        } else {
            this.exibirMsgAlert("Há campos não preenchidos", "erro");
        }

    }
    // Metodo para adicionar
    adicionar(formulario) {
        let nome, descricao, detalhes;
        nome = formulario.nome.value;
        descricao = formulario.descricao.value;
        detalhes = formulario.detalhes.value;

        if (nome && descricao && detalhes) {
            let ObjPortfolioClass = new PortfolioClass(null, nome, descricao, detalhes);

            let promise = new Promise(function (resolve, reject) {
                let promiseFetch = PortfolioModel.adicionar(ObjPortfolioClass);
                promiseFetch.then(response => {
                    resolve(response);
                });
            });
            promise.then(response => {
                if (response.erro) {
                    this.exibirMsgAlert(response.msg, "erro");
                } else {
                    // Populando os dados
                    ObjPortfolioController.getTodosTable(divPortfolios);
                    ObjPortfolioController.exibirMsgAlert(response.msg, "sucesso");
                    // pegando o formulario
                    ObjPortfolioController.ocultarElemento("formulario");
                    ObjPortfolioController.exibirElemento("listagem");
                    ObjPortfolioController.limparCampoForm(formulario);

                }
            }).catch(response => {
                console.log("Erro: ", response);
            });
        } else {
            this.exibirMsgAlert("Há campos não preenchidos", "erro");
        }

    }

    // Metodo para excluir um elemento 
    prepararExcluir(id) {
        let promise = new Promise(function (resolve, reject) {
            let promiseFetch = PortfolioModel.deletar(id);

            promiseFetch.then(response => {
                resolve(response);
            });
        });
        promise.then(response => {
            if (response.erro) {
                this.exibirMsgAlert(response.msg, "erro");
            } else {
                // Populando os dados
                ObjPortfolioController.getTodosTable(divPortfolios);
                ObjPortfolioController.exibirMsgAlert(response.msg, "sucesso");
                // pegando o formulario
                ObjPortfolioController.ocultarElemento("formulario");
                ObjPortfolioController.exibirElemento("listagem");
                ObjPortfolioController.limparCampoForm(formulario);

            }
        }).catch(response => {
            console.log("Erro: ", response);
        });


    }


    // // Metodo da ação que pega a id para Excluir
    // prepararExcluir(id) {
    //     console.log(`Excluindo ${typeof(id)}`);
    // }
}

// function ponto de partida que carrega ao carregar a pagina
function main() {
    ObjPortfolioController = new PortfolioController();
    ObjPortfolioController.ocultarElemento("formulario");
    ObjPortfolioController.getTodosTable(divPortfolios);
    ObjPortfolioController.registrarEvento()
}

window.onload = main;