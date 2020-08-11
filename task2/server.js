const express = require('express')
const colors = require('colors')
const bodyParser = require('body-parser')
const path = require('path')

const jokesController = require('./utils/getJoke')

const app = express()

// Parse HTML files
const viewDirPath = path.join(__dirname, '/views')
app.use(express.static(viewDirPath))

// Parse CSS files and images
const publicDirPath = path.join(__dirname, '/public')
app.use(express.static(publicDirPath))

// Parse URL encoded data
app.use(bodyParser.urlencoded({ extended: false }))

// Parse JSON data
app.use(express.json())

app.get('/home', (req, res) => {
  res.sendFile(path.join(viewDirPath, 'index.html'))
})

app.get('/home/gui', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/jokes_gui_v.html'))
})

app.post('/home/gui', async (req, res) => {
  // req.body = { category: ['Programming', 'Dark', ...], limit: '5' }
  const jokes_JSON = await jokesController(req.body, true)
  res.send(jokes_JSON)
})

app.get('/home/jokes', async (req, res) => {
  // req.query = { category: 'Programming,Dark,...', [limit]: '5' }
  const jokes_JSON = await jokesController(req.query, false)
  res.send(jokes_JSON)
})

const port = 5000
app.listen(
  port,
  console.log(` Server running at port ${port} `.bgBrightGreen.black)
)
