// Criando a classe para conexão com a rest-api
export default class ConfigClass{
    constructor(){

    }
    static getUrlApi(){
        this.urlApi = "http://127.0.0.1:3000";
        return this.urlApi;
    }
}