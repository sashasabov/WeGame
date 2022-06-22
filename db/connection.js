const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
//process.env.DATABASE_URL
const db = mongoose.connection

db.on('connected', () => {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`)
})