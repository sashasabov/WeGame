const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://sashasabov:mongodbsashas0808@sei.wc6ksrk.mongodb.net/wegame-project2?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
//process.env.DATABASE_URL
const db = mongoose.connection

db.on('connected', () => {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`)
})