import Usuario from "../models/usuarioModel.js"

const registrarUsuario = async (req, res) => {
  
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