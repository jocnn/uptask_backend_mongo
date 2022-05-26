import Proyecto from "../models/ProyectoModel.js"

const obtenerProyectos = async (req, res) => {}

const obtenerProyecto = async (req, res) => {}

const nuevoProyecto = async (req, res) => {
  const proyecto = new Proyecto(req.body)
  proyecto.creador = req.usuario._id

  try {
    const proyectoAlmacenado = await proyecto.save()
    res.json(proyectoAlmacenado)
  } catch (error) {
    console.log("🚀 ~ file: ProyectoController.js ~ line 14 ~ nuevoProyecto ~ error", error)
  }
}

const editarProyecto = async (req, res) => {}

const eliminarProyecto = async (req, res) => {}

const agregarColaboradorProyecto = async (req, res) => {}

const eliminarColaboradorProyecto = async (req, res) => {}

const obtenerTareasProyecto = async (req, res) => {}

export {
  obtenerProyectos,
  obtenerProyecto,
  nuevoProyecto,
  editarProyecto,
  eliminarProyecto,
  agregarColaboradorProyecto,
  eliminarColaboradorProyecto,
  obtenerTareasProyecto
}