module.exports = function (app) {

    var mongoose = require('mongoose');
    var Usuario = mongoose.model('usuarios');

    var HomeController = {
        index: function (req, res) {
            res.render('home/index');
        },
        login: function (request, response) { //todas as actions do controller terao basicamente e requisicao e resposta
            var nome = request.body.usuario.nome;
            var senha = request.body.usuario.senha;

            var query = { 'nome': nome, 'senha': senha }; //objeto que representa a pesquisa... sempre em formato json

            Usuario.findOne(query).select('nome senha') //traz um obj... diz qual objeto quer buscar... está buscando um 
                //obj na colecao usuarios com base no nome e na senha; se fosse trazer o obj todo, seria somente o select();
                //traz somente o usuario e senha
                .exec(function (erro, usuario) {
                    if (erro) { //se o obj erro for criado, direciona para a pag inicial
                        console.log(erro);
                        response.redirect('/');
                    }
                    else { //armazena na sessao do usuario e redireciona para o menu
                        request.session.usuario = usuario;
                        response.redirect('/menu');
                    }
                });

            /*
            if (nome == 'admin' && senha == 'admin') {
                var usuario = request.body.usuario;
                request.session.usuario = usuario; //guarda o usuario na sessao
                response.redirect('/menu'); //é um get e precisa de uma rota /menu
            }
            else {
                response.redirect('/');
            }
            */
        },
        logout: function (request, response) {
            request.session.destroy();
            response.redirect('/');
        },
        //cadastro de usuários
        novoUsuario: function (request, response) {
            var nome = request.body.usuario.nome;
            var senha = request.body.usuario.senha;
            var confirma = request.body.usuario.confirma;

            if ((senha != confirma) || nome.trim().length == 0) {
                response.redirect('/');
            } else {
                var usuario = request.body.usuario;
                Usuario.create(usuario, function (erro, usuario) {
                    if (erro) {
                        console.log(erro);
                        response.redirect('/');
                    }
                    else {
                        response.redirect('/menu');
                    }
                });
            }
        }
    };
    return HomeController;
};