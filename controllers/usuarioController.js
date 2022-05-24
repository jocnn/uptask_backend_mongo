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
  const { email, password } = req.body

  // comprobar si esta registrado
  const usuario = await Usuario.findOne({email})
  console.info(usuario)
  if (!usuario) {
    const error = new Error("El usuario no existe")
    return res.status(404).json({ msg: error.message })
  }
  
  // comprobar si confirmo el email
  if (!usuario.confirmado) {
    const error = new Error("Tu cuenta no ha sido confirmada")
    return res.status(403).json({ msg: error.message })
  }

  // comprobar el password
  if (await usuario.comprobarPassword(password)) {
    // console.info("Su password es correcto")
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email
    })
  } else {
    const error = new Error("El password es incorrecto")
    return res.status(403).json({ msg: error.message })
  }
}

export {
  registrarUsuario,
  autenticarUsuario
}