import { Request, Response, NextFunction } from 'express'
import db from '../../db'
import { currentDate } from '../../utils'

const uploadDeptDues = (req: Request, res: Response, next: NextFunction) => {
  //looping to get the filename of the given array of immages
  const files = (req.files as Array<Express.Multer.File>).map(function (file) {
    return file.filename // or file.originalname
  })

  if (files.length >= 5) {
    let studentId: any = req.body.studentId
    let firstYear: any = files[0]
    let secondYear: any = files[1]
    let thirdYear: any = files[2]
    let fourthYear: any = files[3]
    let fifthYear: any = files[4]

    let sql =
      'INSERT INTO departmentaldues(student_id, first_yr, second_yr, third_yr, fourth_yr,fifth_yr, status, date_created) VALUES (?,?,?,?,?,?,?,?)'
    db.query(
      sql,
      [
        studentId,
        firstYear,
        secondYear,
        thirdYear,
        fourthYear,
        fifthYear,
        'Not Approved',
        currentDate()
      ],
      (err, results) => {
        if (!err) {
          res.json({ message: 'Inserted Successfully' })
        } else {
          console.log(err)
        }
      }
    )
  } else {
    res.json({ message: 'files should be up to 5' })
  }
}

const uploadSchFees = (req: Request, res: Response, next: NextFunction) => {
  //looping to get the filename of the given array of immages
  const files = (req.files as Array<Express.Multer.File>).map(function (file) {
    return file.filename // or file.originalname
  })

  if (files.length >= 5) {
    let studentId: any = req.body.studentId
    let firstYear: any = files[0]
    let secondYear: any = files[1]
    let thirdYear: any = files[2]
    let fourthYear: any = files[3]
    let fifthYear: any = files[4]

    let sql =
      'INSERT INTO schoolfees(student_id, first_yr, second_yr, third_yr, fourth_yr,fifth_yr, status, date_created) VALUES (?,?,?,?,?,?,?,?)'
    db.query(
      sql,
      [
        studentId,
        firstYear,
        secondYear,
        thirdYear,
        fourthYear,
        fifthYear,
        'Not Approved',
        currentDate()
      ],
      (err, results) => {
        if (!err) {
          res.json({ message: 'Inserted Successfully' })
        } else {
          console.log(err)
        }
      }
    )
  } else {
    res.json({ message: 'files should be up to 5' })
  }
}

export default {
  uploadDeptDues,
  uploadSchFees
}
