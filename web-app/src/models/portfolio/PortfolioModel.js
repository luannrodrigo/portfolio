// importando configurando as configurações de conexão ao server 
import ConfigClass from "../../ConfigClass";

// Acessando api via node 
const caminho = `${ConfigClass.getUrlApi().toString()}/portifolio`;

export default class PortfolioModel {
    constructor() {

    }
    // metodo que pega todos os elementos da api
    static getTodos() {
        // caminho do banco
        return fetch(caminho).then(response => {
            if (response.status >= 400) {//caso ocorra algum erro
                throw new Error('Erro Servidor!!!');
            }
            return response.json();
        })
    }
    // metodo que pega todos os elementos da api
    static getId(id) {
        // caminho do banco
        return fetch(`${caminho}/${id}`).then(response => {
            if (response.status >= 400) {//caso ocorra algum erro
                throw new Error('Erro Servidor!!!');
            }
            return response.json();
        })
    }
    // metodo para adicionar novos elementos
    static adicionar(ObjPortfolioClass) {
        // caminho do banco
        return fetch(caminho,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(ObjPortfolioClass)
            }
        ).then(response => {
            if (response.status >= 400) {//caso ocorra algum erro
                throw new Error('Erro Servidor!!!');
            }
            return response.json();
        })
    }

    // metodo para editar elementos
    static editar(ObjPortfolioClass) {
        // caminho do banco
        return fetch(caminho,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "PUT",
                body: JSON.stringify(ObjPortfolioClass)
            }
        ).then(response => {
            if (response.status >= 400) {//caso ocorra algum erro
                throw new Error('Erro Servidor!!!');
            }
            return response.json();
        })
    }

    // metodo para Excluir elementos
    static deletar(id) {
        // caminho do banco
        return fetch(`${caminho}/${id}`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "DELETE",
                body: JSON.stringify(id)
            }
        ).then(response => {
            if (response.status >= 400) {//caso ocorra algum erro
                throw new Error('Erro Servidor!!!');
            }
            return response.json();
        })
    }
}

