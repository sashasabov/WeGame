
const router = require('express').Router();
const passport = require('passport')
const bcrypt = require('bcrypt')
const User = require('../models/users')


router.get('/', (req, res) => {
    res.render('login')
})


router.post('/signup',  async (req, res) => {       
    req.body.password = await bcrypt.hash(req.body.password,10)
           let user = new User(req.body)
        let userCheck = await User.findOne({ email: req.body.email });
        if (userCheck) {
            res.render('signup', {message: "This user already exist"})
        return
        } else if (user.email==='' || user.password===''|| user.name===''){      
        res.render('signup', {message: "Please complete all fields"})
        return
        }  
        else {
           res.locals.user = req.user;
           user.save((err)=>{
                if(err){
            return res.redirect('/signup')
                }
            });
            res.redirect('/');
        }
        });    


router.post('/', passport.authenticate('local', {
        successRedirect:'/games',
        failureRedirect: '/',
        failureFlash: true
      }));


router.get('/auth/google', passport.authenticate(
    'google',
    {scope: ['profile', 'email']}
));


router.get('/oauth2callback', passport.authenticate(
    'google',
    {
        successRedirect : '/games', 
        failureRedirect : '/', 
    }
));


router.get('/games/logout', (req, res, next) => {
    req.logout((err)=>{
        if(err){ return next(err)}
        res.redirect('/')
    });
});


router.get('/signup', (req, res) =>{
    res.render('signup',{message:''})
} )


module.exports = router;
