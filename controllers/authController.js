const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const crypto = require('crypto');
const promisify = require('es6-promisify');
//const mail = require('../handlers/mail')

exports.login = passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Failed Login!',
    successRedirect: '/',
    successFlash: 'You are logged'
})

exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'You are now logged out');
    res.redirect('/');
}

exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) return next(); //User logged in can pass
    //User not logged in is redirect to login page
    req.flash('error', 'You need to be  logged in');
    res.redirect('/login');
}

exports.forgotPass = async (req,res) =>{/*
    const user = await User.findOne({ email: req.body.email});
    if(!user){
        req.flash('error', 'This email is incorrect');
        return res.redirect('/login');
    }
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordExpire = Date.now() + 3600000;
    await user.save();
    const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
    mail.send({
        user,
        subject: 'Password Reset',
        resetURL,
        filename: 'password-reset'
    })
    req.flash('success', `Email send with url`);
    res.redirect('/login');
    */
}

exports.resetPassword = async (req,res) =>{/*
    const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpire: { $gt: Date.now() } //Plus grand que 
    });
    if(!user){
        req.flash('error', 'Password reset is invalid or has expired');
        return res.redirect('/login');
    }
    res.render('reset', { title: 'Reset password'});*/
}

exports.confirmedPassword = (req, res, next) =>{
    if(req.body.password === req.body['password-confirm']) return next();

    req.flash('error','Passwords do not match');
    res.redirect('back');
}

exports.updatePassword = async (req, res) =>{
    const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpire: { $gt: Date.now() } //Plus grand que 
    });
    if(!user){
        req.flash('error', 'Password reset is invalid or has expired');
        return res.redirect('/login');
    }

    const setPassword = promisify(user.setPassword, user); //Update le new pwd
    await setPassword(req.body.password);
    user.resetPasswordToken = undefined; //Suppr les infos de la BD
    user.resetPasswordExpire = undefined;
    const updatedUser = await user.save();
    await req.login(updatedUser);
    req.flash('success', 'Password has been reset');
    res.redirect('/');
}

exports.userIsAdmin = async (req, res, next) => {
    const user = await User.findById(req.user._id);

    if(user.role.indexOf("ADMIN") > -1){
        console.log("IS ADMIN");
        return next();
    }

    else{
        console.log("IS NOT ADMIN");
        req.flash('error', 'Il faut être administrateur');
        res.redirect('/account');
    }
}