module.exports = function (app) {
    var home = app.controllers.home; //rota
    app.get('/', home.index);
    
    //primeiro param formulario, segundo param controller
    app.post('/login', home.login); //o metodo post do formulario se refere à pag \login
    app.get('/logout', home.logout);
    app.post('/novoUsuario', home.novoUsuario); 
};