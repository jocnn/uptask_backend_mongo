import Usuario from "../models/usuarioModel.js"

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
    // console.info(usuario)

    const usuarioAlmacenado = await usuario.save()
    res.json(usuarioAlmacenado)

  } catch (error) {
    console.error(error)
  }
  
}

export {
  registrarUsuario
}