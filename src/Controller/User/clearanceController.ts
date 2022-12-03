import { Request, Response, NextFunction } from 'express'
import db from '../../db'
import { currentDate } from '../../utils'

const UploadlibraryClearance = (req: Request, res: Response, next: NextFunction) => {

    const files = (req.files as Array<Express.Multer.File>).map(function(file) {
        return file.filename // or file.originalname
    })

    let studentId: number = req.body.studentId
    let firstYear: any = files[0]
    let secondYear: any = files[1]
    let thirdYear: any = files[2]
    let fourthYear: any = files[3]
    let fifthYear: any = files[4]

    if (files.length != 5) return res.json({ code: 3, message: 'files should be up to 5' })
    let student_exists = "SELECT * FROM library_clearance WHERE student_id = ? "

    db.query(student_exists, [studentId], (err: any, rows: any) => {
        if (err) throw new Error(err) //res.json({ code: 3, error: err.message })
        if (rows.length > 0) {
            return res.json({ code: 3, message: 'Already submitted' })
        }

        let sql =
            'INSERT INTO `library_clearance`( `student_id`, `first_yr`, `second_yr`, `third_yr`, `fourth_yr`, `fifth_yr`, `status`, `date_created`) VALUES (?,?,?,?,?,?,?,?)'
        db.query(sql, [
            studentId,
            "library/" + firstYear,
            "library/" + secondYear,
            "library/" + thirdYear,
            "library/" + fourthYear,
            "library/" + fifthYear,
            'Not Approved',
            currentDate()
        ], (err: any, rows: any) => {
            if (err) return res.json({ code: 3, error: err.message })
            res.json({ code: 1, message: 'Inserted Successfully' })
        })
    })



}

const UploadmedicalClearance = (req: Request, res: Response, next: NextFunction) => {
    const files = (req.files as Array<Express.Multer.File>).map(function(file) {
        return file.filename // or file.originalname
    })
    if (files.length != 5) return res.json({ code: 3, message: 'files should be up to 5' })

    let studentId: number = req.body.studentId
    let firstYear: any = files[0]
    let secondYear: any = files[1]
    let thirdYear: any = null
    let fourthYear: any = null
    let fifthYear: any = null
    let student_exists = "SELECT * FROM medical_clearance WHERE student_id = ? "

    db.query(student_exists, [studentId], (err: any, rows: any) => {
        if (err) return res.json({ code: 3, error: err.message })
        if (rows.length > 0) {
            return res.json({ code: 3, message: 'Already submitted' })
        }

        let sql =
            'INSERT INTO medical_clearance(student_id, first_yr, second_yr, third_yr, fourth_yr,fifth_yr, status, date_created) VALUES (?,?,?,?,?,?,?,?)'

        db.query(sql, [
            studentId,
            "medical/" + firstYear,
            "medical/" + secondYear,
            thirdYear,
            fourthYear,
            fifthYear,
            'Not Approved',
            currentDate()
        ], (err: any, rows: any) => {
            if (err) return res.json({ code: 3, error: err.message })
            res.json({ code: 1, message: 'Inserted Successfully' })
        })
    })
}

const getLibraryClearance = (req: Request, res: Response, next: NextFunction) => {
    db.query(
        'SELECT  library_clearance.*,students.name,students.reg_number FROM  library_clearance JOIN students ON students.id =  library_clearance.student_id',
        (err, rows: any) => {
            if (err) return res.json({ code: 3, error: err.message })
            if (!err) {
                if (rows.length === 0)
                    return res.json({ message: 'No library fees  has been uploaded' })
                return res.send(rows)
            }
        }
    )
}

const getMedicalClearance = (req: Request, res: Response, next: NextFunction) => {
    db.query(
        'SELECT medical_clearance.*,students.name,students.reg_number FROM medical_clearance JOIN students ON students.id = medical_clearance.student_id',
        (err, rows: any) => {
            if (err) return res.json({ code: 3, error: err.message })
            if (!err) {
                if (rows.length === 0)
                    return res.json({ message: 'No medical fees  has been uploaded' })
                return res.send(rows)
            }
        }
    )
}

const getfetchSinglelibrary = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let id: any = req.params.id




    db.query(
        `SELECT  library_clearance.*,students.name,students.reg_number FROM  library_clearance JOIN students ON students.id =  library_clearance.student_id WHERE student_id = ${id}`,
        (err, rows: any) => {
            if (err) return err
            if (!err) {
                return res.send(rows)
            }
        }
    )
}

const getfetchSinglemedical = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let id: any = req.params.id

    db.query(
        `SELECT  medical_clearance.*,students.name,students.reg_number FROM  medical_clearance JOIN students ON students.id =  medical_clearance.student_id WHERE student_id = ${id}`,
        (err, rows: any) => {
            if (err) return err
            if (!err) {

                return res.send(rows)
            }
        }
    )
}

const uploadStudentAffairs = (req: Request,
    res: Response,
    next: NextFunction) => { }

const getSingleStudentAffairs = (req: Request,
    res: Response,
    next: NextFunction) => { }


export default {
    UploadlibraryClearance,
    UploadmedicalClearance,
    getLibraryClearance,
    getMedicalClearance,
    getfetchSinglelibrary,
    getfetchSinglemedical
}