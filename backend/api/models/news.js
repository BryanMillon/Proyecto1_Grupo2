const mongoose= require('mongoose');

const newsSchema= new mongoose.Schema({
    titulo:{type: String, required:true},
    subtitulo:{type: String, required:true},
    categoria:{type: String, required:true,
        enum: ['politica', 'deportiva', 'economica','cultural','social','entretenimiento', 'nacional',
            'internacionales'
           ]},
    contenido:{type: String, required:true},    
    fechaDePublicacion:{type: Date, required:true},
    estado:{type: String, required:true,
        enum: ['publicado', 'pendiente', 'cancelado'
            ]}
})

module.exports= mongoose.model('News',newsSchema )