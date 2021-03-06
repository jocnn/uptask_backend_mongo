import Usuario from "../models/UsuarioModel.js"
import generarId from "../helpers/generarId.js"
import generarJWT from "../helpers/generarJWT.js"
import { emailRegistro, emailOlvidePassword } from "../helpers/email.js"

const registrarUsuario = async (req, res) => {
  
  const { email } = req.body
  const existeUsuario = await Usuario.findOne({ email })
  
  /**
   * Evitando duplicado de email
   */
  if (existeUsuario) {
    const error = new Error("Usuario ya registrado")
    return res.status(400).json({ msg: error.message })
  }

  try {
    const usuario = new Usuario(req.body)
    usuario.token = generarId()
    // console.info(usuario)

    emailRegistro({
      nombre: usuario.nombre,
      email: usuario.email,
      token: usuario.token
    })

    await usuario.save()
    res.json({ 
      msg: "Usuario Creado Correctamente, revisa tu email para confirmar tu cuenta"
    })

  } catch (error) {
    console.error(error)
  }
  
}

const autenticarUsuario = async (req, res) => {
  const { email, password } = req.body

  // comprobar si esta registrado
  const usuario = await Usuario.findOne({email})
  //console.info(usuario)
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
      email: usuario.email,
      token: generarJWT(usuario._id)
    })
  } else {
    const error = new Error("El password es incorrecto")
    return res.status(403).json({ msg: error.message })
  }
}

const confirmar = async (req, res) => {
  const { token } = req.params
  const usuarioConfirmar = await Usuario.findOne({ token })

  if (!usuarioConfirmar) {
    const error = new Error("Token no v??lido")
    return res.status(403).json({ msg: error.message })
  }

  try {
    usuarioConfirmar.confirmado = true
    usuarioConfirmar.token = ''

    await usuarioConfirmar.save()
    res.json({ msg: 'Usuario Confirmado Correctamente' })

  } catch (error) {
    console.error(error)
  }
}

const olvidePassword = async (req, res) => {
  const { email } = req.body

  // comprobar si esta registrado
  const usuario = await Usuario.findOne({ email })
  if (!usuario) {
    const error = new Error("El usuario no existe")
    return res.status(404).json({ msg: error.message })
  } 

  try {
    usuario.token = generarId()
    await usuario.save()

    emailOlvidePassword({
      nombre: usuario.nombre,
      email: usuario.email,
      token: usuario.token
    })

    res.json({ msg: 'Se env??o un email con las instrucciones de recuperaci??n' })
  } catch (error) {
    console.error(error)
  }
}

const comprobarToken = async (req, res) => {
  const { token } = req.params
  const tokenValido = await Usuario.findOne({ token })

  if (tokenValido) {
    res.json({ msg: 'Token v??lido y el usuario ex??ste' })
  } else {
    const error = new Error("Token no v??lido")
    return res.status(404).json({ msg: error.message })
  }
}

const nuevoPassword = async (req, res) => {
  const { token } = req.params
  const { password } = req.body

  const usuario = await Usuario.findOne({ token })
  if (usuario) {
    usuario.password = password
    usuario.token = ''
    try {
      await usuario.save()
      res.json({ msg: 'Password Modificado Correctamente' })
    } catch (error) {
      console.log(error)
    }
  } else {
    const error = new Error("Token no v??lido")
    return res.status(404).json({ msg: error.message })
  }
}

const perfil = async (req, res) => {
  const { usuario } = req

  res.json(usuario)
}

export {
  registrarUsuario,
  autenticarUsuario,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil
}