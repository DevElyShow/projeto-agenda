require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTIONSTRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Conectado ao MongoDB!');
})
.catch(e => {
  console.log('Erro ao conectar:', e);
});