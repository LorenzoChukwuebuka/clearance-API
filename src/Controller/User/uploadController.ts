import { Request, Response, NextFunction } from 'express'
import db from '../../db'

const uploadDeptDues = (req: Request, res: Response, next: NextFunction) => {
  //looping to get the filename of the given array of immages
  const files = (req.files as Array<Express.Multer.File>).map(function (file) {
    return file.filename // or file.originalname
  })

  console.log(files)
}

export default {
  uploadDeptDues
}
