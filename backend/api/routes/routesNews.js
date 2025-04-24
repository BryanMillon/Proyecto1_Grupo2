const express= require("express");
const News= require('../models/news');
const router= express.Router();

// GET

//http://localhost:3000/news'

/*Nos traiga todas las noticias de la base de datos*/
router.get('/news', async(req, res) => {
    /*req: donde viaja la información de la petición*/
     /*res: donde viaja la información de la respuesta*/
 
     try {
        const noticiasRecuparadasDB= await News.find() /*Lista de noticias*/

        res.json({
            lista_noticias: noticiasRecuparadasDB,
            mensaje: "Noticias recuperadas exitosamente"

        })

     } catch (error) {
        res.json({
            mensaje: "ocurrió un error",
            error
        })
        
     }
})

/*Nos traiga todas las noticias en estado pending  */

router.get('/newsPending', async(req, res) => {
    /*req: donde viaja la información de la petición*/
     /*res: donde viaja la información de la respuesta*/
 

     try {
        const noticiasRecuparadasDB= await News.find({ estado: 'pendiente' }) /*Lista de noticias*/
console.log (noticiasRecuparadasDB)
        res.json({
            lista_noticias: noticiasRecuparadasDB,
            mensaje: "Noticias recuperadas exitosamente"

        })

     } catch (error) {
        res.json({
            mensaje: "ocurrió un error",
            error
        })
        
     }
})

/*Nos traiga todas los avisos en estado publicado  */

router.get('/newsPublished', async(req, res) => {
    /*req: donde viaja la información de la petición*/
     /*res: donde viaja la información de la respuesta*/

     /*/ Obtener la fecha de hoy sin la hora
    const today = new Date();
    today.setHours(0, 0, 0, 0);*/
 
     try {
        const noticiasRecuparadasDB= await News.find({ estado: 'publicado'}) /*fechayhora: { $gte: today } }) /*Lista de avisos*/

        res.json({
            lista_noticias: noticiasRecuparadasDB,
            mensaje: "Avisos recuperados exitosamente"

        })

     } catch (error) {
        res.json({
            mensaje: "ocurrió un error",
            error
        })
        
     }
})

//Post

router.post('/news', async(req, res) => {
    const newNew= new News(req.body);
    console.log(req.body);

    try {
        await newNew.save() /*Graba la noticia en la base de datos*/
        res.json({
            notice: newNew,
            mensaje: "Noticia creado exitosamente",
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
router.delete('/news',async(req,res)=>{

    const id = req.query.id

    try {

        const newDeleted = await News.findByIdAndDelete(id)

        if(!newDeleted){
            return res.json({
                mensaje:"La noticia no existe"
            })
        }

        res.json({
            aviso:newDeleted,
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
//http://localhost:3000/newsUpdateStatus
router.put('/newsUpdateStatus',async(req,res)=>{
    //proporcionar un parametro de busqueda
    const id_new = req.query.id;

    try {

        const noticiaPublicado = await News.findByIdAndUpdate(id_new, req.body, { new: true });
        if(!noticiaPublicado){
            return res.json({
                mensaje:"La noticia no existe"
            })
        }

        res.json({
            aviso:noticiaPublicado,
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