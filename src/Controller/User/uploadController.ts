import { Request, Response, NextFunction } from 'express'
import db from '../../db'
import { currentDate } from '../../utils'

const uploadDeptDues = (req: Request, res: Response, next: NextFunction) => {
    //looping to get the filename of the given array of immages
    const files = (req.files as Array<Express.Multer.File>).map(function(file) {
        return file.filename // or file.originalname
    })

    if (files.length >= 5) {
        let studentId: number = req.body.studentId
        let firstYear: any = files[0]
        let secondYear: any = files[1]
        let thirdYear: any = files[2]
        let fourthYear: any = files[3]
        let fifthYear: any = files[4]

        //check if student data already exists

        let userExists = 'SELECT * FROM departmentaldues WHERE id = ?'

        db.query(userExists, [studentId], (err, rows: any) => {
            if (!err) {
                if (rows.length > 0) {
                    return res.json({ message: 'user already Exists' })
                } else {
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
                }
            } else {
                console.log(err)
            }
        })
    } else {
        res.json({ message: 'files should be up to 5' })
    }
}

const uploadSchFees = (req: Request, res: Response, next: NextFunction) => {
    //looping to get the filename of the given array of immages
    const files = (req.files as Array<Express.Multer.File>).map(function(file) {
        return file.filename // or file.originalname
    })

    if (files.length >= 5) {
        let studentId: number = req.body.studentId
        let firstYear: any = files[0]
        let secondYear: any = files[1]
        let thirdYear: any = files[2]
        let fourthYear: any = files[3]
        let fifthYear: any = files[4]

        //check if student data already exists

        let userExists = 'SELECT * FROM schoolfees WHERE id = ?'
        db.query(userExists, [studentId], (err, rows: any) => {
            if (!err) {
                if (rows.length > 0) {
                    res.json({ message: 'User already exists' })
                } else {
                    //run insert query
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
                }
            } else {
                console.log(err)
            }
        })
    } else {
        res.json({ message: 'files should be up to 5' })
    }
}

const fetchSchoolFees = (req: Request, res: Response, next: NextFunction) => {
    db.query(
        'SELECT schoolfees.*,students.name,students.reg_number FROM schoolfees JOIN students ON students.id = schoolfees.student_id',
        (err, rows: any) => {
            if (err) return err
            if (!err) {
                if (rows.length === 0)
                    return res.json({ message: 'No school fees has been uploaded' })
                return res.send(rows)
            }
        }
    )
}

const fetchDepDues = (req: Request, res: Response, next: NextFunction) => {
    db.query(
        'SELECT departmentaldues.*,students.name,students.reg_number FROM departmentaldues JOIN students ON students.id = departmentaldues.student_id',
        (err, rows: any) => {
            if (err) return err
            if (!err) {
                if (rows.length === 0)
                    return res.json({
                        message: 'No department dues fees has been uploaded'
                    })
                return res.send(rows)
            }
        }
    )
}

const getfetchSingleschfees = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let id: any = req.params.id

    db.query(
        `SELECT schoolfees.*,students.name,students.reg_number FROM schoolfees JOIN students ON students.id = schoolfees.student_id WHERE student_id = ${id}`,
        (err, rows: any) => {
            if (err) return err
            if (!err) {

                return res.send(rows)
            }
        }
    )
}

const getfetchSingledeptdues = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let id: any = req.params.id

    db.query(
        `SELECT departmentaldues.*,students.name,students.reg_number FROM departmentaldues JOIN students ON students.id = departmentaldues.student_id WHERE student_id = ${id}`,
        (err, rows: any) => {
            if (err) return err
            if (!err) {

                return res.send(rows)
            }
        }
    )
}
export default {
    uploadDeptDues,
    uploadSchFees,
    fetchSchoolFees,
    fetchDepDues,
    getfetchSingledeptdues,
    getfetchSingleschfees
}
