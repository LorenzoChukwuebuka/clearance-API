import { Request, Response, NextFunction } from 'express'
import db from '../../db'
import bcrypt from 'bcryptjs'
import { currentDate } from '../../utils'
import console from 'console'

const createStudent = (req: Request, res: Response, next: NextFunction) => {
  let name: string = req.body.name
  let regnum: any = req.body.regnum
  let dept: number = req.body.deptId
  let salt: number = 10

  //function to generate current date

  if (name && regnum && dept) {
    //check if user already exists
    let userExists = 'SELECT * FROM students WHERE reg_number = ?'
    db.query(userExists, [regnum], (err, rows) => {
      if (!err) {
        if (rows.length === 0) {
          bcrypt.hash(regnum, salt, (error, hashed) => {
            if (!error) {
              //insert into the db
              let sql =
                'INSERT INTO students( name, reg_number, department, password, date_created) VALUES (?,?,?,?,?)'
              db.query(
                sql,
                [name, regnum, dept, hashed, currentDate()],
                (errs, results) => {
                  if (!errs) {
                    res.json({ message: 'successfull' })
                  } else {
                    console.log(errs)
                  }
                }
              )
            } else {
              console.log(error)
            }
          })
        } else {
          return res.json({ message: 'User already exists' })
        }
      }
    })
  } else {
    return res.json({ message: 'Invalid details' }).status(401)
  }
}

const fetchStudents = (req: Request, res: Response, next: NextFunction) => {
  //fetch all students
  let sql =
    'SELECT students.name,students.reg_number,students.department,students.date_created,department.department FROM students JOIN department ON department.id = students.department'
  db.query(sql, (err, result) => {
    if (!err) {
      return res.send(result)
    } else {
      return res.json({ message: err })
    }
  })
}

const updateStudent = (req: Request, res: Response, next: NextFunction) => {
  let Id: any = req.params.Id
  let name: string = req.body.name
  let regnum: number = req.body.regnum
  let dept: any = req.body.deptId

  if (name && regnum && dept) {
    let sql =
      'UPDATE students SET name = ?, reg_number = ?,department=? WHERE id = ?'
    db.query(sql, [name, regnum, dept, Id], (err, rows) => {
      if (!err) {
        return res.send(rows)
      } else {
        return res.send(err)
      }
    })
  } else {
    return res.json({ message: 'invalid details' }).status(401)
  }
}

const fetchDepts = (req: Request, res: Response, next: NextFunction) => {
  let sql = 'SELECT * FROM department'
  db.query(sql, (err, rows) => {
    if (!err) {
      return res.send(rows)
    } else {
      return res.json({ message: err })
    }
  })
}

export default { createStudent, fetchStudents, updateStudent, fetchDepts }
