import Proyecto from "../models/ProyectoModel.js"

const obtenerProyectos = async (req, res) => {
  const proyectos = await Proyecto.find().where("creador").equals(req.usuario)

  res.json(proyectos)
}

const obtenerProyecto = async (req, res) => {
  const { id } = req.params

  // evitando que la server se cuelge por un intento de acceso no autorizado 
  if (id.length > 24 || id.length < 24) {
    const error = new Error("Acceso no autorizado")
    return res.status(404).json({ msg: error.message })
  }

  const proyecto = await Proyecto.findById(id)

  if (!proyecto) {
    const error = new Error("Proyecto no encontrado")
    return res.status(404).json({ msg: error.message })
  }

  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Acción no válida")
    return res.status(401).json({ msg: error.message })
  }

  res.json(proyecto)
}

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