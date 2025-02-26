const express = require('express');
const app = express();
const file_sys = require('fs');
const JanelaDados = require('./janeladados');

const PORT = 8800

app.use(express.json());

app.get('/files/:file', function(req, res, next) {
  // Note: deve se usar um stream aqui ao invés de readFile;
  file_sys.readFile('./static/' + req.params.file, function(err, data) {
    if(err) {
      res.send("Oops! Não pôde encontrar este arquivo...");
    } else {
      res.contentType(req.params.file);
      res.send(data);
    }   
    res.end();
  }); 
});

const acoes = require('./routes/acoes');

app.use('/', [acoes])

app.listen(PORT, () => {
    console.log(`Servidor disponível em localhost:${PORT}/`);
});

