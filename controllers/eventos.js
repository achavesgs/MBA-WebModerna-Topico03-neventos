module.exports = function (app) {
    var Evento = app.models.eventos;

    var EventosController = {
        //chamadas a páginas via get
        menu: function (request, response) {
            var usuario = request.session.usuario,
                params = { usuario: usuario }; //está sendo criado no controller e redirecionado para a view
            response.render('eventos/menu', params);
        },
        cadastroUsuario: function (request, response) {
            var usuario = request.session.usuario,
                params = { usuario: usuario };
            response.render('eventos/cadUsuario', params);
        },
        cadastroEvento: function (request, response) {
            var usuario = request.session.usuario,
                params = { usuario: usuario };
            response.render('eventos/cadEvento', params);
        },
        listaEventos: function (request, response) {
            Evento.find(function (erro, eventos) {
                if (erro) {
                    response.render('/menu');
                }
                else {
                    var usuario = request.session.usuario,
                        params = { usuario: usuario, eventos: eventos };
                    response.render('eventos/listaEventos', params);
                }
            });
            /*
            var usuario = request.session.usuario,
                params = { usuario: usuario };
            response.render('eventos/listaEventos', params);
            */
        },
        //cadastro de eventos
        novoEvento: function (request, response) {
            var descricao = request.body.evento.descricao;
            var data = request.body.evento.data.split('/');
            //formato dd/MM/yyyy
            var objDate = new Date(data[2], data[1] - 1, data[0]);
            var responsavel = request.body.evento.responsavel;

            //código a ser implementado
            //response.redirect('/menu');
            if (descricao.trim().length == 0) {
                response.redirect('/cadEvento');
            }
            else {
                //var evento = request.body.evento;
                var evento = { //definindo um obj explicitamente para formatar a data
                    descricao: descricao,
                    data: objDate,
                    responsavel: responsavel
                };
                Evento.create(evento, function (erro, evento) {
                    if (erro) {
                        response.redirect('/cadEvento');
                    } else {
                        response.redirect('/menu');
                    }
                });
            }
        }
    };
    return EventosController;
};