import { Request, Response, NextFunction } from 'express'
import db from '../../db'
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
    bcrypt.hash(password, salt, (error, hashed) => {
      if (!error) {
        let sql = 'INSERT INTO user (name,password,type)VALUES(?,?,?)'
        db.query(sql, [name, hashed, type], (err, result) => {
          if (!err) {
            return res.json({ message: 'Inserted succesfully' })
          } else {
            console.log(err)
          }
        })
      } else {
        console.log(error)
      }
    })
  } else {
    return res.json({ message: 'Invalid Data' }).status(401)
  }
  next()
}

const studentLogin = (req: Request, res: Response, next: NextFunction) => {
  let regNum: any = req.body.regNum
  let password: any = req.body.password

  if (regNum && password) {
    let sql = 'SELECT * FROM students WHERE reg_number = ? '
    db.query(sql, [regNum], (err, rows) => {
      if (!err) {
        let hashedPass = rows[0]['password']
        //compare the password
        if (bcrypt.compareSync(hashedPass, password)) {
          return res.send(rows)
        } else {
          return res.json({ message: 'Invalid Password/Details' })
        }
      }
    })
  } else {
    return res.json({ message: 'Invalid data' })
  }
}

export default { adminlogin, studentLogin, createAdmin_1 }
