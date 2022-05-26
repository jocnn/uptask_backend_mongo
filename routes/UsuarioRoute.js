import express from "express";
import checkAuth from "../middleware/checkAuth.js";

import { 
  registrarUsuario, 
  autenticarUsuario, 
  confirmar, 
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil
} from "../controllers/UsuarioController.js";

const router = express.Router()

router.post('/', registrarUsuario)
router.post('/login', autenticarUsuario)
router.get('/confirmar/:token', confirmar)
router.post('/olvide-password', olvidePassword)
router.route('/olvide-password/:token')
  .get(comprobarToken)
  .post(nuevoPassword)

router.get('/perfil', checkAuth, perfil)

export default router
