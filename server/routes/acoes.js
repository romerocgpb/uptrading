const express = require('express');
const app = express.Router();
const JanelaDados = require('../janeladados');

app.post('/acoes/iniciar', async function(req, res){
    JanelaDados.iniciar(function(){
        console.log('iniciou');
        res.sendStatus(200);
    });
});

app.post('/acoes/dados', async function(req, res){
    JanelaDados.iniciar(function(){
        console.log('iniciou');
        res.sendStatus(200);
    });
});

module.exports = app;