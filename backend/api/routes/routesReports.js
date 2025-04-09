const express= require("express");
const Report= require('./models/Reports');
const router= express.Router();


// GET

//http://localhost:3000/reports'

/*Nos traiga todos las denuncias de la base de datos*/
router.get('/reports', async(req, res) => {
    /*req: donde viaja la información de la petición*/
     /*res: donde viaja la información de la respuesta*/
 
     try {
        const reportsHistoricosDB= await Report.find() /*Lista de denuncias*/

        res.json({
            lista_avisos: reportsHistoricosDB,
            mensaje: "Denuncias recuperadas exitosamente"

        })

     } catch (error) {
        res.json({
            mensaje: "ocurrió un error",
            error
        })
        
     }
})



/*Nos traiga todas las denuncias en estado pending  */

router.get('/reportsPending', async(req, res) => {
    /*req: donde viaja la información de la petición*/
     /*res: donde viaja la información de la respuesta*/
 

     try {
        const reportsHistoricosDB= await Report.find({ estado: 'pendiente' }) /*Lista de denuncias*/

        res.json({
            lista_avisos: reportsHistoricosDB,
            mensaje: "Denuncias recuperadas exitosamente"

        })

     } catch (error) {
        res.json({
            mensaje: "ocurrió un error",
            error
        })
        
     }
})


/*Nos traiga todas las denuncias en estado publicado  */

router.get('/Nextreports', async(req, res) => {
    /*req: donde viaja la información de la petición*/
     /*res: donde viaja la información de la respuesta*/

     // Obtener la fecha de hoy sin la hora
    const today = new Date();
    today.setHours(0, 0, 0, 0);
 


     try {
        const reportsHistoricosDB= await Report.find({ estado: 'publicado', fechayhora: { $gte: today } }) /*Lista de denuncias*/

        res.json({
            lista_denuncias: reportsHistoricosDB,
            mensaje: "Denuncias recuperadas exitosamente"

        })

     } catch (error) {
        res.json({
            mensaje: "ocurrió un error",
            error
        })
        
     }
})



//POST

router.post('/reports', async(req, res) => {
    const newReport= new Report(req.body);
    console.log(req.body);

    try {
        await newReport.save() /*Graba la denuncia en la base de datos*/
        res.json({
            report: newReport,
            mensaje: "Denuncia creada exitosamente",
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
//http://localhost:3000/reports
router.delete('/reports',async(req,res)=>{

    const id = req.query.id

    try {

        const reportDeleted = await Report.findByIdAndDelete(id)

        if(!reportDeleted){
            return res.json({
                mensaje:"La denuncia no existe"
            })
        }

        res.json({
            aviso:reportDeleted,
            mensaje:"Denuncia eliminada exitosamente"
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
//http://localhost:3000/reportsUpdateStatus
router.put('/reportsUpdateStatus',async(req,res)=>{
    //proporcionar un parametro de busqueda
    const id_report = req.query.id;

    try {

        const denunciaPublicado = await Report.findByIdAndUpdate(id_report, req.body, { new: true });
        if(!denunciaPublicado){
            return res.json({
                mensaje:"La denuncia no existe"
            })
        }

        res.json({
            aviso:denunciaPublicado,
            mensaje:"Denuncia actualizada exitosamente"
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