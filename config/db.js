import mongoose from 'mongoose'
import 'dotenv/config'

const connectDB = async () => {
  try {
    const cn = await mongoose.connect(`mongodb://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.DOMINIO_DB}:${process.env.PORT_DB}/?authMechanism=DEFAULT`)
    const url = `conexion en mongodb: ${cn.connection.host}:${cn.connection.port}`
    console.info(url)
    
  } catch (error) {
    console.error(`Error de conexión a mongo: ${error}`)
    process.exit(1)
  }
}

export default connectDB