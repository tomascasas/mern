const mongoose = require('mongoose')
const config = require('config')

const db = config.get('mongoURI')
mongoose.set('useFindAndModify', false)

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'mern'
    })
    console.log('MongoDB Connected')
  }
  catch (e) {
    console.error(e.message)
    process.exit(1)
  }
}

module.exports = connectDB