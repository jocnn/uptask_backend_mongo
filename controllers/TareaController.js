import Proyecto from '../models/ProyectoModel.js'
import Tarea from '../models/TareaModel.js'

const agregarTarea = async (req, res) => {
  const { proyecto } = req.body
  const existeProyecto = await Proyecto.findById(proyecto)

  if (!existeProyecto) {
    const error = new Error('El proyecto no existe')
    return res.status(404).json({ msg: error.message })
  }

  if (existeProyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error('No tienes los permisos para añadir tarea')
    return res.status(403).json({ msg: error.message })
  }

  try {
    const tareaAlmacenada = await Tarea.create(req.body)
    res.json(tareaAlmacenada)
  } catch (error) {
    console.log("🚀 ~ file: TareaController.js ~ line 20 ~ agregarTarea ~ error", error)
  }
}

const obtenerTarea = async (req, res) => {
  const { id } = req.params
  const tarea = await Tarea.findById(id).populate("proyecto")
  
  if (!tarea) {
    const error = new Error("Tarea no encontrada")
    return res.status(404).json({ msg: error.message })
  }

  if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Accion no válida")
    return res.status(403).json({ msg: error.message })
  }

  res.json(tarea)

}

const actualizarTarea = async (req, res) => {
  const { id } = req.params
  const tarea = await Tarea.findById(id).populate("proyecto")
  
  if (!tarea) {
    const error = new Error("Tarea no encontrada")
    return res.status(404).json({ msg: error.message })
  }

  if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Accion no válida")
    return res.status(403).json({ msg: error.message })
  }

  tarea.nombre = req.body.nombre || tarea.nombre
  tarea.descripcion = req.body.descripcion || tarea.descripcion
  tarea.prioridad = req.body.prioridad || tarea.prioridad
  tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega

  try {
    const tareaAlmacenada = await tarea.save()
    res.json(tareaAlmacenada)
  } catch (error) {
    console.log("🚀 ~ file: TareaController.js ~ line 66 ~ actualizarTarea ~ error", error)
  }
}

const eliminarTarea = async (req, res) => {
  const { id } = req.params
  const tarea = await Tarea.findById(id).populate("proyecto")
  
  if (!tarea) {
    const error = new Error("Tarea no encontrada")
    return res.status(404).json({ msg: error.message })
  }

  if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Accion no válida")
    return res.status(403).json({ msg: error.message })
  }

  try {
    await tarea.deleteOne()
    res.json({ msg: "Tarea eliminada" })
  } catch (error) {
    console.log("🚀 ~ file: TareaController.js ~ line 88 ~ eliminarTarea ~ error", error)
  }
}

const cambiarEstado = async (req, res) => {}

export {
  agregarTarea,
  obtenerTarea,
  actualizarTarea,
  eliminarTarea,
  cambiarEstado
}
