const { OPENING_CURLY, CLOSING_CURLY, SPACE, EMPTY_STRING, COLON } = require('./constants')
/**
 * This is a function that is used to tokenize the query string
 * @param {string} qlString The query string to tokenize
 * 
 */
const tokenize = (qlString) => {
  let key = EMPTY_STRING
  let stack = []
  for (let i = 0; i < qlString.length; ++i) {
    const char = qlString[i]
    if (!(isBreakPoint(char) && qlString[i - 1] !== COLON)) {
      key += char
    } else {
      if (key) stack = [...stack, key]
      key = EMPTY_STRING
      if (char === OPENING_CURLY || char === CLOSING_CURLY) stack = [...stack, char]
    }
  }
  return stack
}


/**
 * This function returns true if the character being parsed is a breakpoint character
 * @param {string} char 
 */
function isBreakPoint(char) {
  if(typeof char !== 'string' || char.length > 1) return false
  const match = char.match(/|[{} \n^$]/)
  return match ? true : false
}

module.exports = {
  tokenize, isBreakPoint
}
