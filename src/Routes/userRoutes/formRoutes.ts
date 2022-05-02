
import express, { Request, Response, NextFunction } from 'express'
import controller from '../../Controller/User/uploadform'

const router = express.Router()

router.post('/form',controller.createStudent)


export = router