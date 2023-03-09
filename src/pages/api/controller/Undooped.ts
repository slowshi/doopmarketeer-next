import { Request, Response } from 'express'
import { getUndoopedDooplicator, getUndoopedDoodles } from '../models/Undooped'

const doopFloor = async (req: Request, res: Response) => {
  let rarity: number = Number(req.query['rarity']) || 0

  if (rarity < 0) {
    rarity = 0
  } else if (rarity > 2) {
    rarity = 2
  }
  const undooped = await getUndoopedDooplicator(rarity)
  res.json(undooped)
}

const doodleFloor = async (req: Request, res: Response) => {
  const limit: number = Number(req.query['limit']) || 20
  let page: number = Number(req.query['page']) || 1
  if (page < 1) {
    page = 1
  }
  const undooped = await getUndoopedDoodles(page, limit)
  res.json(undooped)
}

export { doodleFloor, doopFloor }
