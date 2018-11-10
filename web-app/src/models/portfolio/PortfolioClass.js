export default class PortfolioClass{
    constructor(id, nome, descricao, detalhes){
        if (id != null) this.id_portfolio = id;
        this.nome = nome;
        this.descricao = descricao;
        this.detalhes = detalhes;
    }
}