import express from "express";
import { 
  registrarUsuario, 
  autenticarUsuario, 
  confirmar, 
  olvidePassword,
  comprobarToken
} from "../controllers/usuarioController.js";

const router = express.Router()

router.post('/', registrarUsuario)
router.post('/login', autenticarUsuario)
router.get('/confirmar/:token', confirmar)
router.post('/olvide-password', olvidePassword)
router.get('/olvide-password/:token', comprobarToken)

export default router
