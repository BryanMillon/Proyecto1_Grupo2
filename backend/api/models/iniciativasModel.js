const mongoose = require('mongoose');

const iniciativaSchema = new mongoose.Schema({
  usuarioId: String, // más adelante podrías hacerlo tipo ObjectId
  categoria: String,
  descripcion: String,
  distritos: [String],
  estado: { type: String, enum: ['pendiente', 'aprobada', 'rechazada'], default: 'pendiente' },
  fechaCreacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Iniciativa', iniciativaSchema);