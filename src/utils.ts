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
 
 
 