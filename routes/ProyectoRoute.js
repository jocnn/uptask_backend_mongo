import express from "express";
import checkAuth from "../middleware/checkAuth.js";

import {
  obtenerProyectos,
  obtenerProyecto,
  nuevoProyecto,
  editarProyecto,
  eliminarProyecto,
  agregarColaboradorProyecto,
  eliminarColaboradorProyecto
} from '../controllers/ProyectoController.js'

const router = express.Router()

router
  .route('/')
  .get(checkAuth, obtenerProyectos)
  .post(checkAuth, nuevoProyecto)

router
  .route('/:id')
  .get(checkAuth, obtenerProyecto)
  .put(checkAuth, editarProyecto)
  .delete(checkAuth, eliminarProyecto)

router.post('/agregar-colaborador/:id', checkAuth, agregarColaboradorProyecto)
router.post('/eliminar-colaborador/:id', checkAuth, eliminarColaboradorProyecto)

export default router
