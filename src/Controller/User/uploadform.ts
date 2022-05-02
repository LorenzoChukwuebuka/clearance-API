import { Request, Response, NextFunction } from 'express'
import db from '../../db'
import bcrypt from 'bcryptjs'
import { currentDate } from '../../utils'
import console from 'console'

const createStudent = (req: Request, res: Response, next: NextFunction) => {
    const { user, regnum, gradYear, supervisor, courseadviser, deptadmin, dept } = req.body
 

    let status = "Not approved"

    //check if student already exists 
    db.query("SELECT * FROM students WHERE reg_number = ?", [regnum], (err, rows) => {
        if (err) return err

        if (rows.length > 0) {
            return res.json({ message: "Student already exists!" })
        }

        let password = bcrypt.hashSync(regnum, 10);

        let sql = "INSERT INTO students(name,reg_number,course_adviser,project_supervisor,grad_year,dept_admin,department,password,status,date_created) Values(?,?,?,?,?,?,?,?,?,?)  "
        db.query(sql, [user, regnum, courseadviser, supervisor, gradYear, dept, deptadmin, password, status, currentDate], (err, result) => {
            if (err) return err
            return res.json({ message: "submission successful" })
        })


    })
}





export default { createStudent }
