const axios = require('axios')

const baseURL = 'https://sv443.net/jokeapi/v2/joke'

/**
 * Makes URL from category and limit parameters
 * @param {{category: string|string[], [limit=1]}} - Object containing URL parameters
 * @returns {{url: string, limit: number}} - calling URL, times to call
 */
const getURL = (rawData, isGUI) => {
  let url = baseURL
  let LIMIT = 1
  // Any category
  if (!isGUI) {
    // rawData = { category: 'Programming,Dark' | undef, limit: '7'|undef }
    const { category = '/Any', limit = 2 } = rawData
    LIMIT = limit
    url += `/${category}`
  } else {
    // rawData = {category:['Dark', 'Prgo'], limit=[1]}
    const { category = 'Any', limit = 2 } = rawData
    url += '/'
    if (typeof category === 'object') url += category.join(',')
    else url += category
    LIMIT = limit
  }
  return { url, limit: LIMIT }
}

/**
 * Formats Data
 * @param {Object} modResponse - {jokes:[Object], noOfJokes:number}
 * @returns{Object} - {tldr:{jokes:Array}, full:{jokes:Array, noOfJokes:number}}
 */
const formatData = (modResponse) => {
  const formattedData = { tldr: { jokes: [] } }

  if (!modResponse.Error) {
    formattedData.full = { ...modResponse }
    const removeKeys = ['flags', 'id', 'error']
    // removes unwanted data
    for (const joke of modResponse.jokes) {
      const shortInfo = {}
      for (const prop in joke) {
        if (!removeKeys.includes(prop)) {
          shortInfo[prop] = joke[prop]
        }
      }
      formattedData.tldr.jokes.push(shortInfo)
    }
    return formattedData
  }

  delete formattedData.tldr
  formattedData.Error = {}
  const removeKeys = ['error', 'code', 'timestamp']
  // removes unwanted data
  for (const prop in modResponse.Error) {
    if (!removeKeys.includes(prop)) {
      formattedData.Error[prop] = modResponse.Error[prop]
    }
  }
  return formattedData
}

/**
 * Calls API # of times
 * @param {{url: string, limit: number}} - calling URL, times to call
 * @returns {Object} - JSON Object
 */
const callAPI = async ({ url, limit }) => {
  // modified Response
  const modResponse = { jokes: [], noOfJokes: 0 }
  try {
    limit = parseInt(limit)
    if (limit <= 0) limit = 1 // for gui version
    if (limit > 5) limit = 5
    while (limit--) {
      const { data: response } = await axios.get(url)
      if (response.error) {
        modResponse.Error = response
        delete modResponse.jokes
        delete modResponse.noOfJokes
      } else {
        modResponse.jokes.push(response)
        modResponse.noOfJokes++
      }
    }
  } catch (err) {
    formatData.Error = 'Server Error. Try restarting it :/'
    console.error(err)
  }
  return modResponse
}

/**
 * controls Parsing Of User Data,  API calls and Data Formatting
 * @param {{category: string|string[], [limit=1]}} - Object containing URL parameters
 * @returns {Object} - JSON Response for Client Side
 */
const jokesController = async (rawClientData = {}, isGUI = false) => {
  const parsedData = getURL(rawClientData, isGUI)
  const modifiedResp = await callAPI(parsedData)
  const formattedData = formatData(modifiedResp)
  return JSON.stringify(formattedData)
}

module.exports = jokesController
