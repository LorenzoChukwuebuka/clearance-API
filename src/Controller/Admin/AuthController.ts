import { Request, Response, NextFunction } from 'express'
import db from '../../db'
import bcrypt from 'bcryptjs'

const adminlogin = (req: Request, res: Response, next: NextFunction) => {
  let username: string = req.body.username
  let password: string = req.body.password

  try {
    if (username && password) {
      db.query(
        'SELECT * FROM user WHERE name = ? LIMIT 1',
        [username],
        (error, rows) => {
          if (!error) {
            //check if username exists
            if (rows.length === 0) {
              return res.json({ message: 'user not found' })
            }

            //check password
            let hashedPass = rows[0]['password']

            if (bcrypt.compareSync(password, hashedPass)) {
              return res.json({
                message: 'login successful',
                id: rows[0]['id'],
                type: rows[0]['type'],
                name: username
              })
            } else {
              res.json({ message: 'Password do not match' })
            }
          }
        }
      )
    } else {
      res.json({ message: 'Invalid data' })
    }
  } catch (inException) {
    console.log(`${inException}`)
  }
}

const createAdmin = (req: Request, res: Response, next: NextFunction) => {
  let name: string = req.body.name
  let password: string = req.body.password
  let type: number = req.body.type

  if (name && password) {
    let salt: number = 10

    db.query('SELECT * FROM user WHERE name = ?', [name], (err, results) => {
      if (results.length > 0) {
        return res.json({ message: 'user exists' })
      } else {
        bcrypt.hash(password, salt, (error, hashed) => {
          if (!error) {
            let sql = 'INSERT INTO user (name,password,type)VALUES(?,?,?)'
            db.query(sql, [name, hashed, type], (err, result) => {
              if (!err) {
                return res.json({ message: 'Inserted succesfully' })
              } else {
                return err
              }
            })
          } else {
            console.log(error)
          }
        })
      }
    })
  } else {
    return res.json({ message: 'Invalid Data' }).status(401)
  }
}

const studentLogin = (req: Request, res: Response, next: NextFunction) => {
  let regNum: any = req.body.regNum
  let password: any = req.body.password

  if (regNum && password) {
    let sql = 'SELECT * FROM students WHERE reg_number = ? LIMIT 1 '
    db.query(sql, [regNum], (err, rows) => {
      if (!err) {
        //check if user exists
        if (rows.length === 0) {
          return res.json({ message: 'user not found' })
        }

        //compare passwords

        let hashedPass = rows[0]['password']
        if (bcrypt.compareSync(password, hashedPass)) {
          return res.json({
            message: 'login successful',
            id: rows[0]['id'],
            name: rows[0]['name']
          })
        } else {
          return res.json({ message: 'Password does not match' })
        }
      }
    })
  } else {
    return res.json({ message: 'Invalid data' })
  }
}

const fetchAdmin = (req: Request, res: Response, next: NextFunction) => {
  db.query(
    'SELECT user.id,user.name,user.type FROM user WHERE type != 0',
    (err, results) => {
      if (!err) {
        if (results.length > 0) {
          res.send(results)
        }
      } else {
        return err
      }
    }
  )
}

const deleteAdmin = (req: Request, res: Response, next: NextFunction) => {
  let id: any = req.params.id
  db.query(`DELETE FROM user WHERE id=${id}`, (err, rows) => {
    if (!err) {
      return res.json({ message: 'Deleted!' })
    } else {
      return err
    }
  })
}

const updateAdmin = (req: Request, res: Response, next: NextFunction) => {
  let name: string = req.body.name
  // let password: string = req.body.password
  let type: number = req.body.type
  let id: any = req.params.id

  if (name && type) {
    db.query(
      `UPDATE user SET name = '${name}', type = ${type}  WHERE id = ${id} `,
      (err, rows) => {
        if (!err) {
          return res.json({ message: 'updated' })
        } else {
          return err
        }
      }
    )
  } else {
    return res.json({ message: 'Incorrect Input' })
  }
}
export default {
  adminlogin,
  studentLogin,
  createAdmin,
  fetchAdmin,
  updateAdmin,
  deleteAdmin
}
