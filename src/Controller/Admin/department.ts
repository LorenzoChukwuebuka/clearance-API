import { Request, Response, NextFunction } from 'express'
import db from '../../db'
import { currentDate } from '../../utils'

const getSchool = (req: Request, res: Response, next: NextFunction) => {
  db.query('SELECT * FROM school', (err, rows) => {
    if (!err) {
      return res.send(rows)
    } else {
      return err
    }
  })
}

const addDepartment = (req: Request, res: Response, next: NextFunction) => {
  let dept: string = req.body.dept
  let schId: number = req.body.schId

  if (dept && schId) {
    //check if dept already exists
    db.query(
      'SELECT * FROM department WHERE department = ?',
      [dept],
      (errors, result:any) => {
        if (!errors) {
          if (result.length > 0) {
            return res.json({ message: 'department already exist' })
          } else {
            db.query(
              'INSERT INTO department( department, school_id, date_created) VALUES (?,?,?)',
              [dept, schId, currentDate()],
              (err, rows) => {
                if (!err) {
                  return res.json({ message: 'inserted successfully' })
                } else {
                  return err
                }
              }
            )
          }
        }
      }
    )
  } else {
    return res.json({ message: 'Invalid data' }).status(400)
  }
}

const fetchDept = (req: Request, res: Response, next: NextFunction) => {
  let sql =
    'SELECT department.*,school.school FROM department JOIN school ON school.id = department.school_id'
  db.query(sql, (err, rows) => {
    if (!err) {
      return res.send(rows)
    } else {
      return err
    }
  })
}
const deleteDept = (req: Request, res: Response, next: NextFunction) => {
  let id = req.params.id

  db.query(`DELETE from department WHERE id =${id}`, (err, rows) => {
    if (!err) {
      return res.json({ message: 'Deleted  successfully' })
    }
  })
}

const updateDept = (req: Request, res: Response, next: NextFunction) => {
  let id = req.params.id
  let dept: string = req.body.dept
  let schId: number = req.body.schId

  if (schId && dept) {
    db.query(
      `UPDATE department SET department= '${dept}' , school_id = ${schId} WHERE id = ${id}  `,
      (err, rows) => {
        if (!err) {
          return res.json({ message: 'updated' })
        } else {
          return err
        }
      }
    )
  } else {
    return res.json({ message: 'invalid input' })
  }
}
export default { getSchool, addDepartment, fetchDept, deleteDept, updateDept }
