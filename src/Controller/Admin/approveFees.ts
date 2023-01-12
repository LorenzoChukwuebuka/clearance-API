import { Request, Response, NextFunction } from 'express'
import db from '../../db'
import { currentDate } from '../../utils'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

const schoolFeesPath = path.join(__dirname, "./../../public");


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



    db.query("SELECT * FROM schoolfees WHERE id = ?", [id], (err: any, result: any) => {

        if (result[0].status == status) {
            return res.json({
                code: 3,
                message: "User has been approved"
            })
        }
        let image1 = result[0].first_yr
        let image2 = result[0].second_yr
        let image3 = result[0].third_yr
        let image4 = result[0].fourth_yr
        let image5 = result[0].fifth_yr

        if (!fs.existsSync(schoolFeesPath)) {
            return res.json({ code: 3, message: "Invalid file path" })
        }

        const image = sharp(`${schoolFeesPath}/${image1}`);
        const image_2 = sharp(`${schoolFeesPath}/${image2}`)
        const image_3 = sharp(`${schoolFeesPath}/${image3}`)

        const image_4 = sharp(`${schoolFeesPath}/${image4}`)
        const image_5 = sharp(`${schoolFeesPath}/${image5}`)

        let im = schoolFeesPath + "/" + "schFees" + "/" + 'approvedSchFees' + Date.now() + ".png"
        let im2 = schoolFeesPath + "/" + "schFees" + 'approvedSchFees' + Date.now() + ".png"
        let im3 = schoolFeesPath + "/" + "schFees" + 'approvedSchFees' + Date.now() + ".png"
        let im4 = schoolFeesPath + "/" + "schFees" + 'approvedSchFees' + Date.now() + ".png"
        let im5 = schoolFeesPath + "/" + "schFees" + 'approvedSchFees' + Date.now() + ".png"

        image
            .composite([{
                input: `${schoolFeesPath}/approvedImage.png
                `,
                gravity: sharp.gravity.southeast
            }])


            .toFile(im, (err, info) => {
                if (err) {
                    throw err;
                }
                db.query(
                    'UPDATE schoolfees SET first_yr = ? WHERE id = ? ',
                    [im.split('/').slice(8).join('/'), id],
                    (err, result) => {
                        if (err) return err

                    }
                )
                // console.log('Watermarked image saved', info);
            });

        image_2.composite([{
            input: `${schoolFeesPath}/approvedImage.png
            `,
            gravity: sharp.gravity.southeast
        }])


            .toFile(im2, (err, info) => {
                if (err) {
                    throw err;
                }
                db.query(
                    'UPDATE schoolfees SET second_yr = ? WHERE id = ? ',
                    [im2.split('/').slice(8).join('/'), id],
                    (err, result) => {
                        if (err) return err

                    }
                )
                // console.log('Watermarked image saved', info);
            })

        image_3.composite([{
            input: `${schoolFeesPath}/approvedImage.png
            `,
            gravity: sharp.gravity.southeast
        }])

            .toFile(im3, (err, info) => {
                if (err) {
                    throw err;
                }
                db.query(
                    'UPDATE schoolfees SET third_yr = ? WHERE id = ? ',
                    [im3.split('/').slice(8).join('/'), id],
                    (err, result) => {
                        if (err) return err

                    }
                )
                // console.log('Watermarked image saved', info);
            })



        image_4.composite([{
            input: `${schoolFeesPath}/approvedImage.png
            `,
            gravity: sharp.gravity.southeast
        }])
            .toFile(im4, (err, info) => {
                if (err) {
                    throw err;
                }
                db.query(
                    'UPDATE schoolfees SET fourth_yr = ? WHERE id = ? ',
                    [im4.split('/').slice(8).join('/'), id],
                    (err, result) => {
                        if (err) return err

                    }
                )
                //console.log('Watermarked image saved', info);
            })

        image_5.composite([{
            input: `${schoolFeesPath}/approvedImage.png
            `,
            gravity: sharp.gravity.southeast
        }])
            .toFile(im5, (err, info) => {
                if (err) {
                    throw err;
                }

                db.query(
                    'UPDATE schoolfees SET fifth_yr = ? WHERE id = ? ',
                    [im5.split('/').slice(8).join('/'), id],
                    (err, result) => {
                        if (err) return err

                    }
                )
                //console.log('Watermarked image saved', info);
            })

        //update the status
        db.query(
            'UPDATE schoolfees SET status = ? WHERE id = ? ',
            [status, id],
            (err, result) => {
                if (err) return err
                return res.json({ message: 'updated successfully' })
            }
        )


    })

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

    db.query('SELECT * FROM departmentaldues WHERE id = ?', [id], (err: any, result: any) => {

        if (result[0].status == status) {
            return res.json({
                code: 3,
                message: "User has been approved"
            })
        }
        let image1 = result[0].first_yr
        let image2 = result[0].second_yr
        let image3 = result[0].third_yr
        let image4 = result[0].fourth_yr
        let image5 = result[0].fifth_yr

        if (!fs.existsSync(schoolFeesPath)) {
            return res.json({ code: 3, message: "Invalid file path" })
        }


        let im = schoolFeesPath + "/" + "deptDues" + "/" + 'approveddeptDues' + Date.now() + ".png"
        let im2 = schoolFeesPath + "/" + "deptDues" + 'approveddeptDues' + Date.now() + ".png"
        let im3 = schoolFeesPath + "/" + "deptDues" + 'approveddeptDues' + Date.now() + ".png"
        let im4 = schoolFeesPath + "/" + "deptDues" + 'approveddeptDues' + Date.now() + ".png"
        let im5 = schoolFeesPath + "/" + "deptDues" + 'approveddeptDues' + Date.now() + ".png"


        const image = sharp(`${schoolFeesPath}/${image1}`);
        const image_2 = sharp(`${schoolFeesPath}/${image2}`)
        const image_3 = sharp(`${schoolFeesPath}/${image3}`)

        const image_4 = sharp(`${schoolFeesPath}/${image4}`)
        const image_5 = sharp(`${schoolFeesPath}/${image5}`)




        image
            .composite([{
                input: `${schoolFeesPath}/approvedImage.png`,
                gravity: sharp.gravity.southeast
            }])


            .toFile(im, (err, info) => {
                if (err) {
                    throw err;
                }
                db.query(
                    'UPDATE departmentaldues SET first_yr = ? WHERE id = ? ',
                    [im.split('/').slice(8).join('/'), id],
                    (err, result) => {
                        if (err) return err

                    }
                )
                 console.log('Watermarked image saved', info);
            });

        image_2.composite([{
            input: `${schoolFeesPath}/approvedImage.png`,
            gravity: sharp.gravity.southeast
        }])


            .toFile(im2, (err, info) => {
                if (err) {
                    throw err;
                }
                db.query(
                    'UPDATE departmentaldues SET second_yr = ? WHERE id = ? ',
                    [im2.split('/').slice(8).join('/'), id],
                    (err, result) => {
                        if (err) return err

                    }
                )
                 console.log('Watermarked image saved', info);
            })

        image_3.composite([{
            input: `${schoolFeesPath}/approvedImage.png`,
            gravity: sharp.gravity.southeast
        }])

            .toFile(im3, (err, info) => {
                if (err) {
                    throw err;
                }
                db.query(
                    'UPDATE departmentaldues SET third_yr = ? WHERE id = ? ',
                    [im3.split('/').slice(8).join('/'), id],
                    (err, result) => {
                        if (err) return err

                    }
                )
                 console.log('Watermarked image saved', info);
            })



        image_4.composite([{
            input: `${schoolFeesPath}/approvedImage.png`,
            gravity: sharp.gravity.southeast
        }])
            .toFile(im4, (err, info) => {
                if (err) {
                    throw err;
                }
                db.query(
                    'UPDATE departmentaldues SET fourth_yr = ? WHERE id = ? ',
                    [im4.split('/').slice(8).join('/'), id],
                    (err, result) => {
                        if (err) return err

                    }
                )
                //console.log('Watermarked image saved', info);
            })

        image_5.composite([{
            input: `${schoolFeesPath}/approvedImage.png`,
            gravity: sharp.gravity.southeast
        }])
            .toFile(im5, (err, info) => {
                if (err) {
                    throw err;
                }

                db.query(
                    'UPDATE departmentaldues SET fifth_yr = ? WHERE id = ? ',
                    [im5.split('/').slice(8).join('/'), id],
                    (err, result) => {
                        if (err) return err

                    }
                )
                //console.log('Watermarked image saved', info);
            })


        db.query(
            'UPDATE departmentaldues SET status = ? WHERE id = ? ',
            [status, id],
            (err, result) => {
                if (err) return err
                return res.json({ message: 'updated successfully' })
            }
        )
    })

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
        'SELECT medical_clearance.*,students.name,students.reg_number FROM medical_clearance JOIN students ON students.id = medical_clearance.student_id WHERE  medical_clearance.status = "Approved" ',
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
    const { id, admin } = req.body

    db.query("SELECT * FROM dean_clearance WHERE user_id = ?", [id], (err, rows: any) => {
        if (err) throw err

        if (rows.length > 0) {
            return res.json({ code: 3, message: "student has already been cleared" })
        }

        db.query("INSERT INTO `dean_clearance`( `user_id`, `signed_by`, `status`) VALUES (?,?,?)", [id, admin, 'approved'], (err, row: any) => {
            if (err) throw err

            return res.json({ code: 1, message: "Student have been cleared" })
        })
    })



}


const studenAffairsClearance = (req: Request, res: Response, next: NextFunction) => {
    const { id, admin } = req.body

    db.query("SELECT * FROM dean_clearance WHERE user_id = ?", [id], (err, rows: any) => {
        if (err) throw err

        if (rows.length > 0) {
            return res.json({ code: 3, message: "student has been cleared" })
        }

        db.query("INSERT INTO `dean_clearance`( `user_id`, `signed_by`, `status`) VALUES (?,?,?)", [id, admin, 'approved'], (err, row: any) => {
            if (err) throw err

            return res.json({ code: 1, message: "Student have been cleared" })
        })
    })



}

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

const getAllDeancleared = (req: Request, res: Response, next: NextFunction) => {
    db.query("SELECT  dean_clearance.*,students.name,students.reg_number FROM  dean_clearance JOIN students ON students.id =  dean_clearance.user_id  ")

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
    deansClearance,
    getAllStudents


}
