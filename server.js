const express = require('express');
const PORT = normalizePort(process.env.PORT || '3000');
const path = require('path');
const loginRoutes = require('./routes/loginRoutes')
const gamesRoutes = require('./routes/gamesRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes')
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts')
const flash = require('express-flash')
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();

require('./db/connection');
require('./db/passport')

app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(flash());
app.use(session({
  secret: 'SEIRocks!',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
  });

app.use('/',loginRoutes)
app.use('/games', gamesRoutes);
app.use('/',reviewsRoutes)

function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {return val;}
    if (port >= 0) {return port;}
    return false;
  }

app.listen(PORT, () =>{
    console.log(`✅ PORT: ${PORT} 🌟`)
})