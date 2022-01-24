import { Request, Response, NextFunction } from 'express'
import db from '../db'
import bcrypt from 'bcryptjs'

const adminlogin = (req: Request, res: Response, next: NextFunction) => {
  let username: string = req.body.username
  let password: string = req.body.password

  if (username && password) {
    db.query(
      'SELECT * FROM user WHERE name = ?',
      [username],
      (err, rows, fields) => {
        if (err) throw err
        let hashedPass = rows[0]['password']
        //compare passwords
        if (bcrypt.compareSync(password, hashedPass)) {
          res.send(rows)
        } else {
          res.send('Incorrect Email and/or Password!')
        }
      }
    )
  } else {
    res.json({ message: 'Invalid data' })
  }
  next()
}

const createAdmin_1 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let name: string = req.body.name
  let password: string = req.body.password
  let type: number = 1

  if (name && password) {
    let salt: number = 10
    bcrypt.hash(password, salt, (err, hashed) => {
      let sql = 'INSERT INTO user (name,password,type)VALUES(?,?,?)'
    })
  } else {
    return res.json({ message: 'Invalid Data' })
  }
}

const registerStudent = (req: Request, res: Response, next: NextFunction) => {
  let name: string = req.body.name
  let regnum: number = req.body.regnum
}
const studentLogin = (req: Request, res: Response, next: NextFunction) => {}
export default { adminlogin, registerStudent, studentLogin, createAdmin_1 }
