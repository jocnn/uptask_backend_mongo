import express from "express";
import { 
  registrarUsuario, 
  autenticarUsuario, 
  confirmar, 
  olvidePassword 
} from "../controllers/usuarioController.js";

const router = express.Router()

router.post('/', registrarUsuario)
router.post('/login', autenticarUsuario)
router.get('/confirmar/:token', confirmar)
router.post('/olvide-password', olvidePassword)

export default router
