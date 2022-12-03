import { Request, Response, NextFunction } from 'express'
import db from '../../db'

const getAdmins = (req: Request, res: Response, next: NextFunction) => {
    db.query(
        'Select ifnull(((select COUNT(`id`) from `user` )),0) AS total_admins',
        (err, results) => {
            if (err) return res.json({ message: "An error occured" }).status(500)

            return res.send(results)

        }
    )
}
const getDepts = (req: Request, res: Response, next: NextFunction) => {
    db.query(
        'Select ifnull(((select COUNT(`id`) from `department` )),0) AS total_depts',
        (err, results) => {
            if (err) return res.json({ message: "An error occured" }).status(500)
            return res.send(results)

        }
    )
}
const getStudents = (req: Request, res: Response, next: NextFunction) => {
    db.query(
        'Select ifnull(((select COUNT(`id`) from `students` )),0) AS total_students',
        (err, results) => {
            if (!err) {
                return res.send(results)
            } else {
                return err
            }
        }
    )
}

const pendingSchFees = (req: Request, res: Response, next: NextFunction) => {
    db.query('Select ifnull(((select COUNT(`id`) from `schoolfees` where `status` = "Not Approved" )),0) AS pending_schoolfees', (err, rows) => {
        if (err) return res.json({ message: "An error occured" }).status(500)
        res.send(rows)
    })
}

const approvedschfees = (req: Request, res: Response, next: NextFunction) => {
    db.query('Select ifnull(((select COUNT(`id`) from `schoolfees` where `status` = "Approved" )),0) AS approved_schoolfees', (err, rows) => {
        if (err) return res.json({ message: "An error occured" }).status(500)
        res.send(rows)
    })
}

const pendingDeptDues = (req: Request, res: Response, next: NextFunction) => {
    db.query('Select ifnull(((select COUNT(`id`) from `departmentaldues` where `status` = "Not Approved" )),0) AS pending_deptdues', (err, rows) => {
        if (err) return res.json({ message: "An error occured" }).status(500)
        res.send(rows)
    })
}

const approveddeptdues = (req: Request, res: Response, next: NextFunction) => {
    db.query('Select ifnull(((select COUNT(`id`) from `departmentaldues` where `status` = "Approved" )),0) AS approved_deptdues', (err, rows) => {
        if (err) return res.json({ message: "An error occured" }).status(500)
        res.send(rows)
    })
}

const pendingclearanceforms = (req: Request, res: Response, next: NextFunction) => {
    db.query('SELECT ifnull((select count(`id`) from `students` where `status`="Not Approved"),0) as pending_forms', (err, rows) => {
        if (err) return res.json({ message: "An error occured" }).status(500)
        res.send(rows)

    })
}

const approvedclearanceforms = (req: Request, res: Response, next: NextFunction) => {
    db.query('SELECT ifnull((select count(`id`) from `students` where `status`="Approved"),0) as pending_forms', (err, rows) => {
        if (err) return res.json({ message: "An error occured" }).status(500)
        res.send(rows)

    })
}

const pendinglibrary = (req: Request, res: Response, next: NextFunction) => {
    db.query('SELECT ifnull((select count(`id`) from `library_clearance` where `status`="Not Approved"),0) as pending_library', (err, rows) => {
        if (err) return res.json({ message: "An error occured" }).status(500)
        res.send(rows)

    })
}

const approvedlibrary = (req: Request, res: Response, next: NextFunction) => {
    db.query('SELECT ifnull((select count(`id`) from `library_clearance` where `status`="Approved"),0) as approved_library', (err, rows) => {
        if (err) return res.json({ message: "An error occured" }).status(500)
        res.send(rows)

    })
}

const approveddeans = (req: Request, res: Response, next: NextFunction) => {
    db.query('SELECT ifnull((select count(`id`) from `dean_clearance` ),0) as dean', (err, rows) => {
        if (err) return res.json({ message: "An error occured" }).status(500)
        res.send(rows)

    })
}



export default {
    getAdmins,
    getDepts,
    getStudents,
    pendingSchFees,
    pendingDeptDues,
    pendingclearanceforms,
    approveddeans,
    approvedlibrary,
    pendinglibrary,
    approvedclearanceforms,
    approveddeptdues,
    approvedschfees
}
