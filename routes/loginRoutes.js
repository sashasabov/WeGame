
const router = require('express').Router();
// const req = require('express/lib/request');
// const res = require('express/lib/response');
const passport = require('passport')
const bcrypt = require('bcrypt')
const User = require('../models/users')


router.get('/', (req, res) => {
    res.render('login')
})


router.post('/signup', async (req, res) => {       
    req.body.password = await bcrypt.hash(req.body.password,10)
           let user = new User(req.body)
           res.locals.user = req.user;
           user.save((err)=>{
                if(err){
            return res.redirect('/signup')
                }
                // else if(user === User.findOne({email: user.email})){
                //     console.log('this user already exist');
                //     return
                // }
            });
            console.log(user)
            res.redirect('/');
        });    


<<<<<<< HEAD
=======
// router.post('/', 
//  passport.authenticate('local', {failureRedirect: '/', failureMessage: true}),
//     (req, res) => {
//         res.redirect('/games')

     
        // User.findOne({email: req.body.email}, (err,user)=>{
        //         if (err){
        //             res.status(400).json(err)
        //             return
        //         } 
        //         if(user === null){
        //             console.log('there is no such user')
        //         return res.redirect('/')
        //     }
        //        if(bcrypt.compare(req.body.password, user.password)){
        //             console.log(user)
        //          return res.redirect('/games')} 
        //     })  
    // })
>>>>>>> 38f8a73 (login set up)

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
    res.render('signup')
} )



module.exports = router;
