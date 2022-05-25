import express from "express";
import { 
  registrarUsuario, 
  autenticarUsuario, 
  confirmar, 
  olvidePassword,
  comprobarToken,
  nuevoPassword
} from "../controllers/usuarioController.js";

const router = express.Router()

router.post('/', registrarUsuario)
router.post('/login', autenticarUsuario)
router.get('/confirmar/:token', confirmar)
router.post('/olvide-password', olvidePassword)
router.route('/olvide-password/:token')
  .get(comprobarToken)
  .post(nuevoPassword)

export default router
