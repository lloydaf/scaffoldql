const { parse } = require('./src/parser')
const { tokenize } = require('./src/tokenizer')
const { isValidQl } = require('./src/validator')

const isBrowser = new Function("try { return this===window }catch(e){ return false }")



const Registry = {

  /**
   * Returns a scaffolded object based on the schema name from the registry
   * @param {string} schemaName The name of the schema to scaffold
   * @returns {Object} The scaffolded object
   */
  scaffold: (schemaName) => {
    if(!isBrowser()) throw new Error('The registry can only work in the browser!')
    const data = localStorage.getItem(schemaName)
    return data ? JSON.parse(data) : {}
  },

  /**
   * Used to register schemas in the registry
   * @param {qlString} qlString 
   */
  register: (qlString) => {
    if(!isBrowser()) throw new Error('The registry can only work in the browser!')
    if (!isValidQl(qlString)) throw new Error('Invalid QL String')
    const tokenizedArr = tokenize(qlString)
    const [parsed, typeMap] = parse(tokenizedArr)
    Object.keys(typeMap).forEach(key => localStorage.setItem(key, parsed[key]))
  },

  /**
   * Used to deregister schemas from the registry
   * @param {string} schemaName The name of the schema to deregister
   */
  deregister: (schemaName) => {
    if(!isBrowser()) throw new Error('The registry can only work in the browser!')
    localStorage.removeItem(schemaName)
  }

}

/**
 * Returns a scaffolded object based on the query string
 * @param {string} qlString The query string to scaffold
 * @returns {Object} The scaffolded object
 */
const scaffold = (qlString) => {
  if (!isValidQl(qlString)) throw new Error('Invalid QL String')
  const [parsed] = parse(tokenize(qlString))
  return parsed
}


module.exports = {
  Registry, scaffold
}
