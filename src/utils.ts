import multer from 'multer'
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
    cb(null, `dues-${files.originalname}${Date.now()}.${ext}`)
  }
})

const multerFilter = (req: any, files: any, cb: any) => {
  if (
    files.mimetype.split('/')[1] === 'jpg' ||
    files.mimetype.split('/')[1] === 'png' ||
    files.mimetype.split('/')[1] === 'jpg'
  ) {
    cb(null, true)
  } else {
    cb(new Error('Not a PDF File!!'), false)
  }
}

export const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
})
