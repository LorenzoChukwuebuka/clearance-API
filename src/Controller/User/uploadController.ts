import { Request, Response, NextFunction } from 'express'
import db from '../../db'
 import formidable from 'formidable'
 

const uploadDeptDues = (req: Request, res: Response, next: NextFunction) => {
  let form = new formidable.IncomingForm()
  let data: any = new Object()
  let error: number = 0

  form.on('field', (field, value) => {
    if (field === 'studentId') {
      data.title = value
    } else {
      error = 1
    }
  })
  form.on('fileBegin', (name: any, file: any) => {
    if (file.name.match(/\.(jpg|jpeg|png)$/)) {
      file.path = 'public/deptDues/' + file.name
    } else {
      error = 2
    }
  })
  form.on('file', (name: any, file: any) => {
    let filetype = file.type.split('/').pop()
    data.filename = file.name
    data.filetype = filetype
  })
  form.on('error', err => {
    if (err) throw err
  })

  form.on('end', (): void => {
    if (error === 0) {
      console.log('No error')
    } else {
      console.log(error)
    }
  })
}

export default {
  uploadDeptDues
}
