//UTILIZO EL METODO ROUTER DE EXPRESS
const { Router } = require("express")
const router = Router()
//IMPORTAR DB FIRESTORE
const { db } = require('../firebase')

//USO DE METODO GET
router.get('/peliculas',async (req,res)=>{
    try{
        
        const peliculas = await db.collection('Peliculas').get()
        const cant_elementos = await db.collection('Peliculas').count().get()
        const datos = peliculas.docs.map((peli)=>{
            return{
                id : peli.id,
                cant : cant_elementos.data().count,
                //nombre : peli.data().Nombre, 
                //director : peli.data().Director,
                ...peli.data(), //Esto se llama desestructuracion y es equivalente a lo de arriba
                
            }
           })
        console.log(cant_elementos.data().count)   
        res.send(datos)

    }catch (err){
        res.status(500)
        res.send("Ocurrio un Error en el Servidor...")

    }
    
    /*
    console.log("peliculas",peliculas.docs)
    peliculas.docs.forEach((pelicula)=>{
        console.log(pelicula.data())
    })
    */   
 })

 //METODO GET PARA ACCEDER A UN REGISTRO ESPECIFICO PARA PUT O DELETE
 router.get('/peliculas/:id', async (req,res)=>{
    try{
        const id = req.params.id
        const doc = await db.collection('Peliculas').doc(id).get()
        if (doc.exists) {          
            result = doc.data();
            //console.log(result);
            //return result;
            
        }
        console.log(doc.data())
        res.send(doc.data())
    }catch (err){
        res.status(500)
        res.send("Ocurrio un Error en el Servidor...")

    }
   
 })

 router.get('/actor/:id', async (req,res)=>{
    try{
        const id = req.params.id
        console.log(id)
        const doc = await db.collection('Actor').doc(id).get()
        if (doc.exists) {          
            result = doc.data();
            //console.log(result);
            //return result;
            
        }
        console.log(doc.data())
        res.send(doc.data())
    }catch (err){
        res.status(500)
        res.send("Ocurrio un Error en el Servidor...")

    }
   
 })

 //USO DEL METODO POST
 router.post('/peliculas', async (req,res)=>{
    const body = req.body
    await db.collection('peliculas').add({
        Nombre : body.nombre,
        Director : body.director
    })
    res.send('Se Guardo Correctamente...')

 })

 
/*
 //METODO PUT PARA MODIFICAR LOS DATOS
 router.put('/peliculas/:id', async (req,res)=>{
    const id = req.params.id
    await db.collection('peliculas').doc(id).update(req.body)
    res.send('Se Modifico correctamente....')
 })

 //METODO DELETE 
 router.delete('/peliculas/:id', async (req,res)=>{
    const id = req.params.id
    await db.collection('peliculas').doc(id).delete()
    res.send('Se Elimino correctamente....')
 })
*/

module.exports = router 