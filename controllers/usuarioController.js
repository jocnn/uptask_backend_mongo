import Usuario from "../models/usuarioModel.js"
import generarId from "../helpers/generarId.js"

const registrarUsuario = async (req, res) => {
  
  const { email } = req.body
  const existeUsuario = await Usuario.findOne({ email })
  
  /**
   * Evitando duplicado de email
   */
  if (existeUsuario) {
    const error = new Error("Usuario ya registrado")
    return res.status(400).json({ msj: error.message })
  }

  try {
    const usuario = new Usuario(req.body)
    usuario.token = generarId()
    // console.info(usuario)

    const usuarioAlmacenado = await usuario.save()
    res.json(usuarioAlmacenado)

  } catch (error) {
    console.error(error)
  }
  
}

const autenticarUsuario = async (req, res) => {
  
}

export {
  registrarUsuario,
  autenticarUsuario
}