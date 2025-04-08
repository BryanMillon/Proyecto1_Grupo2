const express= require("express");
const Notice= require('../models/Notice');
const router= express.Router();


// GET

//http://localhost:3000/notices'

/*Nos traiga todas los avisos de la base de datos*/
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









/*Nos traiga todas los avisos en estado pending  */

router.get('/noticesPending', async(req, res) => {
    /*req: donde viaja la información de la petición*/
     /*res: donde viaja la información de la respuesta*/
 

     try {
        const avisosRecuparadaoDB= await Notice.find({ estado: 'pendiente' }) /*Lista de avisos*/

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


/*Nos traiga todas los avisos en estado publicado  */

router.get('/Nextnotices', async(req, res) => {
    /*req: donde viaja la información de la petición*/
     /*res: donde viaja la información de la respuesta*/

     // Obtener la fecha de hoy sin la hora
    const today = new Date();
    today.setHours(0, 0, 0, 0);
 


     try {
        const avisosRecuparadaoDB= await Notice.find({ estado: 'publicado', fechayhora: { $gte: today } }) /*Lista de avisos*/

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



//PUT 

//ACTUALIZAR EL ESTADO

//PUT
//actualizar registros que ya existen
//http://localhost:3000/noticesUpdateStatus
router.put('/noticesUpdateStatus',async(req,res)=>{
    //proporcionar un parametro de busqueda
    const id_notice = req.query.id;

    try {

        const avisoPublicado = await Notice.findByIdAndUpdate(id_notice, req.body, { new: true });
        if(!avisoPublicado){
            return res.json({
                mensaje:"El aviso no existe"
            })
        }

        res.json({
            aviso:avisoPublicado,
            mensaje:"Estado actualizada exitosamente"
        })
        
    } catch (error) {
        res.json({
            mensaje:"Ocurrio un error",
            error
        })
    }
})



/*Visible al servidor */
module.exports= router;