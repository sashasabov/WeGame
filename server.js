const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const gamesRoutes = require('./routes/gamesRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes')
const methodOverride = require('method-override');
require('./db/connection');

app.get('/', (req, res) => {
    res.render('login')
})

app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/',reviewsRoutes)
app.use('/games', gamesRoutes);

app.listen(PORT, () =>{
    console.log(`✅ PORT: ${PORT} 🌟`)
})