import jwt from 'jsonwebtoken'
import Usuario from '../models/UsuarioModel.js'

const checkAuth = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.usuario = await Usuario.findById(decoded.id).select("-password -confirmado -token -createdAt -updatedAt -__v")
      //console.log("🚀 ~ file: checkAuth.js ~ line 16 ~ checkAuth ~ req.usuario", req.usuario)

      return next()
    } catch (error) {
      return res.status(404).json({ msg: 'Hubo un error' })
    }
  }

  if (!token) {
    const error = new Error("Token no válido")
    return res.status(401).json({ msg: error.message })
  }

  return next()
}

export default checkAuth