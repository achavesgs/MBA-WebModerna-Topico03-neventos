exports.notFound = function (request, response, next) { //notFound = propriedade criada por nós
    response.status(404);
    response.render('erro404');
};
exports.serverError = function (error, request, response, next) { //serverError = propriedade criada por nós
    response.status(500);
    response.render('erroServidor', { error: error });
};