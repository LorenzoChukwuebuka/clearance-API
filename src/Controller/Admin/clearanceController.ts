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
    db.query('INSERT INTO library_clearance (user_id,admin_id,status) VALUES (?,?,?)', [user_id, admin_id, status], (err: any, result: any) => {
        if (err) throw err
        res.status(200).json({
            message: 'Library Clearance',
            data: result
        })
    }
    )
}





export default { getAllStudents,libraryClearance }
