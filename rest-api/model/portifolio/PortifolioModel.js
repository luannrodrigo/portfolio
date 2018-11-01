const db = require('../../banco/dbconnection');

module.exports = class PortifolioModel {
    // metodo para recuperar todos os portiifolio do banco
    static getTodos(callback){
        return db.query("select * from portifolio", callback);
    }
    // metodo para recuperar portifolio por id
    static getId(id, callback){
        return db.query("select * from portifolio where id_portifolio = ?", [id], callback);
    }
    // metodo para adicionar um portifolio
    static adicionar(portifolio, callback){
        return db.query("insert into portifolio(nome, descricao, detalhes) values (?, ?, ?)", [portifolio.nome, portifolio.descricao, portifolio.detalhes], callback);
    }
    // metodo para excluir um portifolio
    static deletar(id, callback){
        return db.query("delete from portifolio where id_portifolio = ?", [id], callback);
    }
    // metodo para editar um portifolio
    static editar(portifolio, callback){
        return db.query("update portifolio set nome = ?, descricao = ?, detalhes = ? where id_portifolio = ?", [portifolio.nome, portifolio.descricao, portifolio.detalhes, portifolio.id_portifolio], callback);
    }

};
