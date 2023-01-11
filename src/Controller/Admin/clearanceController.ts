import { Request, Response, NextFunction } from 'express'
import db from '../../db'


//select all approved fees
const getAllStudents = (req: Request, res: Response, next: NextFunction) => {

    db.query('SELECT *,NULL AS `password`  FROM students WHERE status = "Approved"', (err: any, result: any) => {
        if (err) throw err
        res.status(200).json({
            message: 'All Students',
            data: result
        })
    }
    )
}

const libraryClearance = (req: Request, res: Response, next: NextFunction) => {
    const { user_id, admin_id, status } = req.body

    //check if student has been cleared 

    db.query("SELECT * FROM library_clearance WHERE user_id = ?", [user_id], (err: any, results: any) => {
        if (err) throw err

        if (results.length > 0) {
            return res.status(200).json({
                message: "student already cleared"
            })
        }

        db.query('INSERT INTO library_clearance (user_id,signed_by,status) VALUES (?,?,?)', [user_id, admin_id, status], (err: any, result: any) => {
            if (err) throw err
            res.status(200).json({
                message: 'Library Clearance',
                data: result
            })
        }
        )
    })

}

const getClearedLibrary = (req: Request, res: Response, next: NextFunction) => {
    db.query("SELECT library_clearance.*,b.* FROM library_clearance JOIN students b ON library_clearance.student_id = b.id", (err, row) => {
        if (err) throw err
        res.status(200).json({
            message: 'cleared students',
            data: row
        })
    })
}

const medicalClearance = (req: Request, res: Response, next: NextFunction) => {


    const { user_id, admin_id, status } = req.body
    db.query("SELECT * FROM medical_clearance WHERE user_id = ?", [user_id], (err: any, results: any) => {
        if (err) throw err

        if (results.length > 0) {
            return res.status(200).json({
                message: "student already cleared"
            })
        }

        db.query('INSERT INTO medical_clearance (user_id,signed_by,status) VALUES (?,?,?)', [user_id, admin_id, status], (err: any, result: any) => {
            if (err) throw err
            res.status(200).json({
                message: 'medical Clearance',
                data: result
            })
        }
        )

    })




}

const getMedicalClearance = (req: Request, res: Response, next: NextFunction) => {
    db.query("SELECT library_clearance.*,b.* FROM medical_clearance JOIN students b ON medical_clearance.user_id = b.id", (err, row) => {
        if (err) throw err
        res.status(200).json({
            message: 'cleared students',
            data: row
        })
    })
}




export default {
    getAllStudents,
    libraryClearance,
    getClearedLibrary,
    getMedicalClearance,
    medicalClearance,

}
