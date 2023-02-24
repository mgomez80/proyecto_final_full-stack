const express = require('express') //require es una función que permite cargar módulos de Node
const app = express() //Se inicializa express en una variable llamada app
const port = 5000 //Se setea el puerto en donde correrá localmente la aplicación


const routes = require('./src/routes/index')

//HABILITAR INTERCAMBIO DE CONTENIDO DE SERVIDORES EXTERNOS (CORS: Cross-Origin Resource Sharing (intercambio de recursos de origen cruzado.))
const cors = require('cors');
app.use(cors({
origin: ['http://localhost:3000']
}));
//

app.use(routes)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})