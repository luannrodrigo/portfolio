var express = require('express');
var router = express.Router();
var PortifolioModel = require('../model/portifolio/PortifolioModel');
var RespostaClass = require('../model/RespostaClass');

// definindo o verbo get para listar tudo ue esta no banco
router.get('/', function(req, res, next) {
    PortifolioModel.getTodos(function(err, result){
        let resposta = new RespostaClass();
        // tratando os erros
        if (err) {
            resposta.err = true;
            resposta.msg = 'Ocorreu um erro';
            console.log(`Erro: ${err}`);
        }else {
            resposta.dados = result;
        }
        res.json(resposta);
    });
});

// definindo o verbo get para listar tudo ue esta no banco
router.get('/:id?', function(req, res, next) {
    PortifolioModel.getId(req.params.id, function(err, result){
        let resposta = new RespostaClass();
        // tratando os erros
        if (err) {
            resposta.err = true;
            resposta.msg = 'Ocorreu um erro';
            console.log(`Erro: ${err}`);
        }else {
            resposta.dados = result;
        }
        res.json(resposta);
    });
});

// definindo metodo para add portifolio
router.post('/?', function(req, res, next) {
    PortifolioModel.adicionar(req.body, function(err, result){
        let resposta = new RespostaClass();
        // tratando os erros
        if (err) {
            resposta.err = true;
            resposta.msg = 'Ocorreu um erro';
            console.log(`Erro: ${err}`);
        }else {
            if (result.affectedRows > 0) {
                resposta.msg = " Cadastro realizado com sucesso!"
            }else {
                resposta.erro = true;
                resposta.msg = "Ocorreu um erro ao inserir no servidor!"
            }
            console.log(`Erro: ${err}`);
        }
        res.json(resposta);
    });
});

// definindo metodo para excluir portifolio
router.delete('/:id', function(req, res, next) {
    PortifolioModel.deletar(req.params.id, function(err, result){
        let resposta = new RespostaClass();
        // tratando os erros
        if (err) {
            resposta.err = true;
            resposta.msg = 'Ocorreu um erro';
            console.log(`Erro: ${err}`);
        }else {
            if (result.affectedRows > 0) {
                resposta.msg = "Exclusão realizada com sucesso!"
            }else {
                resposta.erro = true;
                resposta.msg = "Ocorreu um erro ao excluir o registro!"
            }
            console.log(`Erro: ${err}`);
        }
        res.json(resposta);
    });
});
// definindo metodo para editar portifolio
router.put('/', function(req, res, next) {
    PortifolioModel.editar(req.body, function(err, result){
        let resposta = new RespostaClass();
        // tratando os erros
        if (err) {
            resposta.err = true;
            resposta.msg = 'Ocorreu um erro';
            console.log(`Erro: ${err}`);
        }else {
            if (result.affectedRows > 0) {
                resposta.msg = "Atualização realizada com sucesso!"
            }else {
                resposta.erro = true;
                resposta.msg = "Ocorreu um erro ao Atualizar o registro!"
            }
            console.log(`Erro: ${err}`);
        }
        res.json(resposta);
    });
});




module.exports = router;
