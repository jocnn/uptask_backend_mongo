import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/db.js'
import usuarioRouter from './routes/UsuarioRoute.js'
import proyectoRouter from './routes/ProyectoRoute.js'
import tareaRouter from './routes/TareaRoute.js'

const app = express()
app.use(express.json())

connectDB()

// configurando cors
const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    console.log(origin)
    if (whitelist.includes(origin)) {
      // puede consultar la api
      callback(null, true)
    } else {
      // no esta permitido
      callback(new Error("Error de Cors"))
    }
  }
}
app.use(cors(corsOptions))

/**
 * ROUTING
 */
app.use('/api/usuarios', usuarioRouter)
app.use('/api/proyectos', proyectoRouter)
app.use('/api/tareas', tareaRouter)

const PORT_SERV = process.env.PORT_SERVER || 4000

app.listen(PORT_SERV, () => {
  console.log(`Servidor corriendo en el puerto ${PORT_SERV}`)
})