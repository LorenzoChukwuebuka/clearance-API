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
        (err, rows: any) => {
            if (err) return err

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
        (err, rows: any) => {
            if (err) return err

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
        (err, rows: any) => {
            if (err) return err
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
        (err, rows: any) => {
            if (err) return err

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

const getpendingform = (req: Request, res: Response, next: NextFunction) => {
    db.query("SELECT * FROM students WHERE status = 'Not approved' ", (err, rows) => {
        if (err) return err
        return res.send(rows)
    })
}

const approveform = (req: Request, res: Response, next: NextFunction) => {
    let id = req.params.id

    let status = "Approved"

    db.query("UPDATE students SET status = ? WHERE id = ? ", [status, id], (err, rows) => {
        if (err) return err
        return res.json({ message: "form approved" })
    })
}


const getPendinglibrary = (req: Request, res: Response, next: NextFunction) => {
    db.query(
        'SELECT  library_clearance.*,students.name,students.reg_number FROM  library_clearance JOIN students ON students.id =  library_clearance.student_id WHERE  library_clearance.status = "Not Approved" ',
        (err, rows: any) => {
            if (err) return err

            res.send(rows)
        }
    )
}
const getPendingMedical = (req: Request, res: Response, next: NextFunction) => {
    db.query(
        'SELECT medical_clearance.*,students.name,students.reg_number FROM medical_clearance JOIN students ON students.id = medical_clearance.student_id WHERE medical_clearance.status = "Not Approved" ',
        (err, rows: any) => {
            if (err) return err

            res.send(rows)
        }
    )
}
const getApprovedlibrary = (req: Request, res: Response, next: NextFunction) => {
    db.query(
        'SELECT  library_clearance.*,students.name,students.reg_number FROM  library_clearance JOIN students ON students.id =  library_clearance.student_id WHERE  library_clearance.status = "Approved" ',
        (err, rows: any) => {
            if (err) return err

            res.send(rows)
        }
    )
}
const getApprovedMedical = (req: Request, res: Response, next: NextFunction) => {
    db.query(
        'SELECT  library_clearance.*,students.name,students.reg_number FROM  library_clearance JOIN students ON students.id =  library_clearance.student_id WHERE  library_clearance.status = "Approved" ',
        (err, rows: any) => {
            if (err) return err

            res.send(rows)
        }
    )
}

const approveLibrary = (req: Request, res: Response, next: NextFunction) => {
    let id = req.params.id
    let status = 'Approved'
    db.query(
        'UPDATE library_clearance SET status = ? WHERE id = ? ',
        [status, id],
        (err, result) => {
            if (err) return err
            return res.json({ message: 'updated successfully' })
        }
    )
}

const approveMedical = (req: Request, res: Response, next: NextFunction) => {
    let id = req.params.id
    let status = 'Approved'
    db.query(
        'UPDATE medical_clearance SET status = ? WHERE id = ? ',
        [status, id],
        (err, result) => {
            if (err) return err
            return res.json({ message: 'updated successfully' })
        }
    )
}


const deansClearance = (req: Request, res: Response, next: NextFunction) => {
    let id = req.body.student_id

    

    
}






export default {
    getAllPendingSchFees,
    getAllApprovedSchFees,
    approveSchFees,
    getAllPendingDeptDues,
    getAllApprovedDeptdues,
    approveDeptDues,
    approveform,
    getpendingform,
    getPendingMedical,
    getPendinglibrary,
    getApprovedMedical,
    getApprovedlibrary,
    approveMedical,
    approveLibrary,
    deansClearance


}
