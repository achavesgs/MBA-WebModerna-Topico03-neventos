module.exports = function (app) {
    var valida = require('./../middlewares/valida'); // -> ./ indica para buscar na mesma pasta; ../ indica para sair da pasta
    
    var eventos = app.controllers.eventos;
    app.get('/menu', valida, eventos.menu); //valida = qq um que nao for validado, manda de volta

    app.get('/cadUsuario', valida, eventos.cadastroUsuario);
    app.get('/cadEvento', valida, eventos.cadastroEvento);
    app.get('/listaEventos', valida, eventos.listaEventos);
    app.post('/novoEvento', valida, eventos.novoEvento);

};