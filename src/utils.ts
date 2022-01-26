import multer from 'multer'
import { Request, Response, NextFunction } from 'express'
export const currentDate = () => {
  let today = new Date()
  let date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
  let time =
    today.getHours() + '-' + today.getMinutes() + ':' + today.getSeconds()
  return date + ' ' + time
}

//return true if char is a number
const isNumber = (text: any) => {
  if (text) {
    var reg = new RegExp('[0-9]+$')
    return reg.test(text)
  }
  return false
}

export const removeSpecial = (text: any) => {
  if (text) {
    var lower = text.toLowerCase()
    var upper = text.toUpperCase()
    var result = ''
    for (var i = 0; i < lower.length; ++i) {
      if (isNumber(text[i]) || lower[i] != upper[i] || lower[i].trim() === '') {
        result += text[i]
      }
    }
    return result
  }
  return ''
}

const multerStorage = multer.diskStorage({
  destination: (req, files, cb) => {
    cb(null, 'public/deptDues')
  },
  filename: (req, files, cb) => {
    const ext = files.mimetype.split('/')[1]
    cb(null, files.originalname)
  }
})

const schoolFeesStorage = multer.diskStorage({
  destination: (req, files, cb) => {
    cb(null, 'public/deptDues')
  },
  filename: (req, files, cb) => {
    const ext = files.mimetype.split('/')[1]
    cb(null, files.originalname)
  }
})

const multerFilter = (req: any, files: any, cb: any) => {
  if (
    files.mimetype.split('/')[1] === 'jpg' ||
    files.mimetype.split('/')[1] === 'png' ||
    files.mimetype.split('/')[1] === 'jpeg'
  ) {
    cb(null, true)
  } else {
    cb(new Error('Not a supported file'), false)
  }
}
//dept fees
export const uploadDeptDues = multer({
  storage: multerStorage,
  fileFilter: multerFilter
})
//school fees
export const uploadSchFees = multer({
  storage: schoolFeesStorage,
  fileFilter: multerFilter
})

//error checking
export const ErrorMulterChecking = (multerUploadFunction: any) => {
  return (req: any, res: any, next: any) =>
    multerUploadFunction(req, res, (err: any) => {
      // handle Multer error
      if (err && err.name && err.name === 'MulterError') {
        return res.status(500).send({
          error: err.name,
          message: `File upload error: ${err.message}`
        })
      }
      // handle other errors
      if (err) {
        return res.status(500).send({
          error: 'FILE UPLOAD ERROR',
          message: `Something wrong ocurred when trying to upload the file`
        })
      }

      next()
    })
}
