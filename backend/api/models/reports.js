const mongoose= require('mongoose');
const user = require('./user');

const reportsSchema= new mongoose.Schema({
    nombre:{type: String, required:true},
    fechayhora:{type: Date, required:true},
    categoria:{type: String, required:true,
        enum: ['solicitud publica', 'queja', 'denuncia','sugerencia','felicitacion' 
            ]},
    lugar:{type: String, required:true},
    descripcion:{type: String, required:true},
    estado:{type: String, required:true,
        enum: ['pendiente', 'resuelto'
            ]},
    userId:{type: String, required:true},
  archivoUrl: { type: String }, 
  archivos: [{ type: String }] 
    
})

module.exports= mongoose.model('Reports',reportsSchema )
