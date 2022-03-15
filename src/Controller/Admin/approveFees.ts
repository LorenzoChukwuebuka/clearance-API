import { Request, Response, NextFunction } from 'express'
import db from '../../db'
import { currentDate } from '../../utils'

const getAllPendingSchFees = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  db.query(
    'SELECT schoolfees.*,students.name,students.reg_number FROM schoolfees JOIN students ON students.id = schoolfees.student_id WHERE schoolfees.status = "Not Approved" ',
    (err, rows) => {
      if (err) return err
      if (rows.length === 0) return res.json({ message: 'No uploads yet' })
      res.send(rows)
    }
  )
}

const getAllApprovedSchFees = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  db.query(
    'SELECT schoolfees.*,students.name,students.reg_number FROM schoolfees JOIN students ON students.id = schoolfees.student_id WHERE schoolfees.status = "Approved" ',
    (err, rows) => {
      if (err) return err
      if (rows.length === 0) return res.json({ message: 'No uploads yet' })
      return res.send(rows)
    }
  )
}

const approveSchFees = (req: Request, res: Response, next: NextFunction) => {
  let id = req.params.id
  let status = 'Approved'
  db.query(
    'UPDATE schoolfees SET status = ? WHERE id = ? ',
    [status, id],
    (err, result) => {
      if (err) return err
      return res.json({ message: 'updated successfully' })
    }
  )
}

const getAllPendingDeptDues = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  db.query(
    'SELECT departmentaldues.*,students.name,students.reg_number FROM departmentaldues JOIN students ON students.id = departmentaldues.student_id WHERE departmentaldues.status = "Not Approved" ',
    (err, rows) => {
      if (err) return err
      if (rows.length === 0) return res.json({ message: 'No uploads yet' })
      res.send(rows)
    }
  )
}

const getAllApprovedDeptdues = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  db.query(
    'SELECT departmentaldues.*,students.name,students.reg_number FROM departmentaldues JOIN students ON students.id = departmentaldues.student_id WHERE departmentaldues.status = "Approved" ',
    (err, rows) => {
      if (err) return err
      if (rows.length === 0) return res.json({ message: 'No uploads yet' })
      return res.send(rows)
    }
  )
}

const approveDeptDues = (req: Request, res: Response, next: NextFunction) => {
  let id = req.params.id
  let status = 'Approved'
  db.query(
    'UPDATE departmentaldues SET status = ? WHERE id = ? ',
    [status, id],
    (err, result) => {
      if (err) return err
      return res.json({ message: 'updated successfully' })
    }
  )
}

export default {
  getAllPendingSchFees,
  getAllApprovedSchFees,
  approveSchFees,
  getAllPendingDeptDues,
  getAllApprovedDeptdues,
  approveDeptDues
}
