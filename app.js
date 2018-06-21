var express = require('express');
var load = require('express-load');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var error = require('./middlewares/error');

app = express(); //é o arquivos que está sendo executado app.js

//eventos do mongoDB
var mongoose = require('mongoose');
global.db = mongoose.connect('mongodb://localhost:27017/neventos'); //string de conexao para o mongoDB

mongoose.connection.on('connected', function () {
  console.log('=====Conexão estabelecida com sucesso=====');
});
mongoose.connection.on('error', function (err) {
  console.log('=====Ocorreu um erro: ' + err);
});
mongoose.connection.on('disconnected', function () {
  console.log('=====Conexão finalizada=====');
});


app.set('views', __dirname + '/views'); //a pasta views é a raiz do html
app.set('view engine', 'ejs'); //define o mecanismo da camada view como sendo ejs

app.use(cookieParser('neventos'));
app.use(expressSession());
app.use(bodyParser.json()); //pega as infos do formulario
app.use(bodyParser.urlencoded({ extended: true })); //urlencoded representa: converte caracteres especiais

app.use(express.static(__dirname + '/public')); //td o que for colocado na pasta public sao os arquivos estaticos

load('models')
  .then('controllers') //significa que controllers routes usa infos do models
  .then('routes') //significa que pasta routes usa infos do controllers
  .into(app);

//middlewares
app.use(error.notFound);
app.use(error.serverError);

app.listen(3000, function () { //subindo o servidor na porta 3000
  console.log("Aplicação no ar.");
});