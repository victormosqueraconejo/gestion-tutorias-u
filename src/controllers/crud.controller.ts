import type { RequestHandler, Response } from 'express'
import type { Model } from 'mongoose'
import { isValidObjectId } from 'mongoose'

type CrudController = {
  list: RequestHandler
  getById: RequestHandler
  create: RequestHandler
  update: RequestHandler
  remove: RequestHandler
}

export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(message)
    this.name = 'AppError'
  }
}

const handleError = (res: Response, error: unknown, action: string) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ error: error.message })
    return
  }

  if (error instanceof Error && error.name === 'ValidationError') {
    res.status(400).json({ error: `Datos invalidos al ${action}` })
    return
  }

  res.status(500).json({ error: `Error al ${action}` })
}

export const createCrudController = <T>(
  entity: Model<T>,
  resourceName: string,
  options: { beforeRemove?: (id: string) => Promise<void> } = {},
): CrudController => ({
  list: async (_req, res) => {
    try {
      const entities = await entity.find()
      res.status(200).json(entities)
    } catch (error) {
      handleError(res, error, `listar ${resourceName}`)
    }
  },

  getById: async (req, res) => {
    const { id } = req.params

    if (!id || !isValidObjectId(id)) {
      res.status(400).json({ error: 'El identificador no es valido' })
      return
    }

    try {
      const entityFound = await entity.findById(id)

      if (!entityFound) {
        res.status(404).json({ error: `${resourceName} no encontrado` })
        return
      }

      res.status(200).json(entityFound)
    } catch (error) {
      handleError(res, error, `obtener ${resourceName}`)
    }
  },

  create: async (req, res) => {
    try {
      const entityCreated = await entity.create(req.body)
      res.status(201).json(entityCreated)
    } catch (error) {
      handleError(res, error, `crear ${resourceName}`)
    }
  },

  update: async (req, res) => {
    const { id } = req.params

    if (!id || !isValidObjectId(id)) {
      res.status(400).json({ error: 'El identificador no es valido' })
      return
    }

    try {
      const entityUpdated = await entity.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      })

      if (!entityUpdated) {
        res.status(404).json({ error: `${resourceName} no encontrado` })
        return
      }

      res.status(200).json(entityUpdated)
    } catch (error) {
      handleError(res, error, `actualizar ${resourceName}`)
    }
  },

  remove: async (req, res) => {
    const { id } = req.params

    if (!id || !isValidObjectId(id)) {
      res.status(400).json({ error: 'El identificador no es valido' })
      return
    }

    try {
      const entityId = typeof id === 'string' ? id : id[0]
      if (!entityId) {
        res.status(400).json({ error: 'El identificador no es valido' })
        return
      }
      await options.beforeRemove?.(entityId)
      const entityDeleted = await entity.findByIdAndDelete(entityId)

      if (!entityDeleted) {
        res.status(404).json({ error: `${resourceName} no encontrado` })
        return
      }

      res.status(204).send()
    } catch (error) {
      handleError(res, error, `eliminar ${resourceName}`)
    }
  },
})
