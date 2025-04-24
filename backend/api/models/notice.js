const mongoose= require('mongoose');

const noticeSchema= new mongoose.Schema({
    nombre:{type: String, required:true},
    fechayhora:{type: Date, required:true},
    categoria:{type: String, required:true,
        enum: ['cultura', 'deportes', 'educacion','reuniones','salud','medio-ambiente', 'jovenes',
             'adultos-mayores', 'aviso-importante', 'mantenimiento', 'reunion' 
            ]},
    lugar:{type: String, required:true},
    descripcion:{type: String, required:true},
    estado:{type: String, required:true,
        enum: ['publicado', 'pendiente', 'cancelado'
            ]}
})

module.exports= mongoose.model('Notice',noticeSchema )





