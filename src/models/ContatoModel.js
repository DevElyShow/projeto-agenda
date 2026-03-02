const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, default: '' },
  email: { type: String, default: '' },
  telefone: { type: String, default: '' },

  cep: { type: String, default: '' },
  rua: { type: String, default: '' },
  numero: { type: String, default: '' },
  bairro: { type: String, default: '' },
  cidade: { type: String, default: '' },
  estado: { type: String, default: '' },

  tags: { type: [String], default: [] },

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Login', required: true },
  criadoEm: { type: Date, default: Date.now },
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body, userId) {
  this.body = body;
  this.userId = userId;
  this.errors = [];
  this.contato = null;
}

Contato.prototype.register = async function() {
  this.valida();
  if (this.errors.length > 0) return;

  this.body.user = this.userId;
  this.contato = await ContatoModel.create(this.body);
};

Contato.prototype.valida = function() {
  this.cleanUp();

  if (this.body.email && !validator.isEmail(this.body.email))
    this.errors.push('E-mail inválido');

  if (!this.body.nome)
    this.errors.push('Nome é obrigatório.');

  if (!this.body.email && !this.body.telefone)
    this.errors.push('Envie pelo menos e-mail ou telefone.');
};

Contato.prototype.cleanUp = function() {
  for (const key in this.body) {
    if (typeof this.body[key] !== 'string') {
      this.body[key] = '';
    }
  }

  if (typeof this.body.tags === 'string') {
    this.body.tags = this.body.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag);
  }

  this.body = {
    nome: this.body.nome,
    sobrenome: this.body.sobrenome,
    email: this.body.email,
    telefone: this.body.telefone,
    cep: this.body.cep,
    rua: this.body.rua,
    numero: this.body.numero,
    bairro: this.body.bairro,
    cidade: this.body.cidade,
    estado: this.body.estado,
    tags: this.body.tags,
  };
};

Contato.prototype.edit = async function(id) {
  if (typeof id !== 'string') return;
  this.valida();
  if (this.errors.length > 0) return;

  this.contato = await ContatoModel.findOneAndUpdate(
    { _id: id, user: this.userId },
    this.body,
    { new: true }
  );
};

Contato.buscaPorId = async function(id, userId) {
  if (typeof id !== 'string') return;
  return await ContatoModel.findOne({ _id: id, user: userId });
};

Contato.delete = async function(id, userId) {
  if (typeof id !== 'string') return;
  return await ContatoModel.findOneAndDelete({ _id: id, user: userId });
};

module.exports = {
  Contato,
  ContatoModel
};