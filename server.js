//importar o express
const express = require('express');

//iniciar o express
const app = express();

// nome da pasta no dist que sera feito o build
const appName = 'gestao-de-ativos-app';

//local onde o build ira gerar os arquivos
const outputPath = `${__dirname}/dist/${appName}`;

//seta o diretorio de build para servir o conteudo Angular
app.use(express.static(outputPath));

//redirecionar qualquer requisicao para o index.html
app.get('/*', (req, res) => {
    res.sendFile(`${outputPath}/index.html`)
})

//ouvir a porta que o heroku disponibilizar

app.listen(process.env.PORT);