import express from "express";

const router = express.Router()

router.get('/', (req, res) => {
  res.send('GET api/usuarios')
})

export default router