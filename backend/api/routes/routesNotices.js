const express= require("express");
const Notice= require('../models/Notice');
const router= express.Router();


//POST

router.post('/notices', async(req, res) => {
    const newNotice= new Notice(req.body);
    console.log(req.body);

    try {
        await newNotice.save() /*Graba el aviso en la base de datos*/
        res.json({
            notice: newNotice,
            mensaje: "Aviso creado exitosamente",
            resultado: "true"
        })
    } catch (error) {
        res.json({
            mensaje: "Ocurrio un error",
            error
        })
    }
})



/*Visible al servidor */
module.exports= router;