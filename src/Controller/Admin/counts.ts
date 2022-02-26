import { Request, Response, NextFunction } from 'express'
import db from '../../db'

const getAdmins = (req: Request, res: Response, next: NextFunction) => {
  db.query(
    'Select ifnull(((select COUNT(`id`) from `user` )),0) AS total_admins',
    (err, results) => {
      if (!err) {
        return res.send(results)
      } else {
        return err
      }
    }
  )
}
const getDepts = (req: Request, res: Response, next: NextFunction) => {
  db.query(
    'Select ifnull(((select COUNT(`id`) from `department` )),0) AS total_dept',
    (err, results) => {
      if (!err) {
        return res.send(results)
      } else {
        return err
      }
    }
  )
}
const getStudents = (req: Request, res: Response, next: NextFunction) => {
  db.query(
    'Select ifnull(((select COUNT(`id`) from `students` )),0) AS total_students',
    (err, results) => {
      if (!err) {
        return res.send(results)
      } else {
        return err
      }
    }
  )
}

export default {
  getAdmins,
  getDepts,
  getStudents
}
