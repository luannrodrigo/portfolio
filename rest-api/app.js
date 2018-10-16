const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// Obj de inicialição do express
const app = express();
// Porta de escuta do servidor
const port = 3000;
// rotas
const router = express.Router();
portifolioRouter = require('./router/portifolioRouter');
// setando os middawares
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

router.get("/", (req, res) => res.json({
    mensagem: 'Api online'
}));
// middaware que cuida das rotas
app.use('/', router)
app.use('/portifolio', portifolioRouter);

// escuta da porta
app.listen(port);
console.log(`Server is running!!`);
