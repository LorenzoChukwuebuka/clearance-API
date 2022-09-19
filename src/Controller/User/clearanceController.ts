import { Request, Response, NextFunction } from 'express'
import db from '../../db'
import { currentDate } from '../../utils'

const libraryClearance = (req: Request, res: Response, next: NextFunction) => {
    db.query("")
}

const medicalClearnce = (req: Request, res: Response, next: NextFunction) => {

}


export default {
    libraryClearance,
    medicalClearnce
}