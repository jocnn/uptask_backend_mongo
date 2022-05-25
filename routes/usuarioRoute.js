import express from "express";
import { registrarUsuario, autenticarUsuario, confirmar } from "../controllers/usuarioController.js";

const router = express.Router()

router.post('/', registrarUsuario)
router.post('/login', autenticarUsuario)
router.get('/confirmar/:token', confirmar)

export default router