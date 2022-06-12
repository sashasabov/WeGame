
const router = require('express').Router();
// const req = require('express/lib/request');
// const res = require('express/lib/response');
const passport = require('passport')

router.get('/', (req, res) => {
    res.render('login')
})

router.get('/auth/google', passport.authenticate(
    'google',
    { scope: ['profile', 'email']}
));


router.get('/oauth2callback', passport.authenticate(
    'google',
    {
        successRedirect : '/games',
        failureRedirect : '/'
    }
));

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/')
});

module.exports = router;
