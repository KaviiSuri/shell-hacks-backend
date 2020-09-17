const mongoose = require('mongoose')

function connectDB () {
  var url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.sndxq.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  switch (process.env.NODE_ENV) {
    case 'dev':
      url = 'mongodb://localhost:27017/amiGo'
      break
  }
  mongoose.connect(
    url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    (err) => {
      if (err) console.log(err)
      else console.log('Database Connected!')
    }
  )
}

module.exports = connectDB
