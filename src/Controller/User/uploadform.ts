import { Request, Response, NextFunction } from 'express'
import db from '../../db'
import bcrypt from 'bcryptjs'
import { currentDate } from '../../utils'
import department from '../Admin/department'


const createStudent = (req: Request, res: Response, next: NextFunction) => {

    let user: string = req.body.user
    let regnum: any = req.body.regnum
    let gradYear: Date = req.body.gradYear
    let supervisor: string = req.body.supervisor
    let courseadviser: string = req.body.course_adviser
    let deptadmin: string = req.body.deptadmin
    let dept: string = req.body.dept
    let status = "Not approved"

    if (regnum && supervisor && gradYear) {
        //check if student already exists 
        db.query("SELECT * FROM students WHERE reg_number = ?", [regnum], (err, rows: any) => {
            if (err) return err

            if (rows.length > 0) {
                return res.json({ message: "Student already exists!" })
            }

            let password = bcrypt.hashSync(regnum, 10);


            let sql = "INSERT INTO students(name,reg_number,course_adviser,project_supervisor,grad_year,dept_admin,department,password,date_created,status) Values(?,?,?,?,?,?,?,?,?,?)  "
            db.query(sql, [user, regnum, courseadviser, supervisor, gradYear, deptadmin, dept, password, currentDate(), status], (err, result) => {
                if (err) console.dir(err)
                return res.json({ message: "submission successful" })
            })


        })

    } else { return res.json({ message: "Invalid Inputs" }) }

}


const createSchclearanceForm = (req: Request, res: Response, next: NextFunction) => {
    const { } = req.body
}





export default { createStudent }
