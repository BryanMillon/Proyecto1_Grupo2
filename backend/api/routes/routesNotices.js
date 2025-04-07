const express= require("express");
const Notice= require('../models/Notice');
const router= express.Router();


// GET

//http://localhost:3000/notices'

/*Nos traiga todas las personas de la base de datos*/
router.get('/notices', async(req, res) => {
    /*req: donde viaja la información de la petición*/
     /*res: donde viaja la información de la respuesta*/
 
     try {
        const avisosRecuparadaoDB= await Notice.find() /*Lista de avisos*/

        res.json({
            lista_avisos: avisosRecuparadaoDB,
            mensaje: "Avisos recuperados exitosamente"

        })

     } catch (error) {
        res.json({
            mensaje: "ocurrió un error",
            error
        })
        
     }
})


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


//DELETE
//http://localhost:3000/personas
router.delete('/notices',async(req,res)=>{

    const id = req.query.id

    try {

        const noticeDeleted = await Notice.findByIdAndDelete(id)

        if(!noticeDeleted){
            return res.json({
                mensaje:"El aviso no existe"
            })
        }

        res.json({
            aviso:noticeDeleted,
            mensaje:"Aviso eliminada exitosamente"
        })
        
    } catch (error) {

        res.json({
            mensaje:"Ocurrio un error...",
            error
        })
        
    }

})



/*Visible al servidor */
module.exports= router;