import express from 'express'
import 'dotenv/config'

import connectDB from './config/db.js'

const app = express()

connectDB()

app.listen(process.env.PORT_SERVER, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT_SERVER}`)
})