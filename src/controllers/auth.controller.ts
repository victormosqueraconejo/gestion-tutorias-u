import bcrypt from 'bcrypt'
import type { RequestHandler } from 'express'
import User from '../models/user.model'

export const login: RequestHandler = async (req, res) => {
  const { correo, contrasena } = req.body as {
    correo?: unknown
    contrasena?: unknown
  }

  if (
    typeof correo !== 'string' ||
    typeof contrasena !== 'string' ||
    !correo.trim() ||
    !contrasena
  ) {
    res.status(400).json({ error: 'El correo y la contraseña son obligatorios' })
    return
  }

  try {
    const user = await User.findOne({ correo: correo.trim().toLowerCase() })

    if (!user || user.estado !== 'activo') {
      res.status(401).json({ error: 'Credenciales invalidas' })
      return
    }

    const passwordMatches = await bcrypt.compare(contrasena, user.contrasena_hash)

    if (!passwordMatches) {
      res.status(401).json({ error: 'Credenciales invalidas' })
      return
    }

    const userData = user.toObject()
    const { contrasena_hash: _passwordHash, ...safeUser } = userData

    res.status(200).json({ usuario: safeUser })
  } catch (error) {
    console.error('Error al iniciar sesion:', error)
    res.status(500).json({ error: 'Error al iniciar sesion' })
  }
}
