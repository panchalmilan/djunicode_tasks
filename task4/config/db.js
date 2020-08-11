const colors = require('colors')
const mongoose = require('mongoose')

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}

//process.env.MONGO="mongodb://localhost/unicode_task4"
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO, options)
  console.log(
    `\n MongoDB connected: ${conn.connection.host}`.bgBrightCyan.black
  )
}

module.exports = connectDB
