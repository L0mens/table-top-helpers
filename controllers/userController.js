const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');


exports.loginForm = (req,res) =>{
    res.render('login', {title: 'Login'})
}

exports.registerForm = (req,res) =>{
    res.render('register', {title: 'Register'})
};

exports.validateRegister = (req,res,next) => {
    req.sanitizeBody('name');
    req.checkBody('name', 'You must supply a name').notEmpty();
    req.checkBody('email', 'That Email is not valid!').isEmail();
    req.sanitizeBody('email').normalizeEmail({
        remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress: false
    });
    req.checkBody('password', 'Password Cannot be Blank!').notEmpty();
    req.checkBody('password-confirm', 'Confirm Password Cannot be Blank!').notEmpty();

    req.checkBody('password-confirm', 'oops Password is not the same !').equals(req.body.password);

    const errors = req.validationErrors();
    console.log(errors);
    if(errors) {
        req.flash('error', errors.map(err => err.msg));
        res.render('register', {title: 'Register', body: req.body, flashes : req.flash()});
    }
    next();
};

exports.register = async (req,res,next) => {
    const user = new User({ email: req.body.email, name: req.body.name});
    const registerWithPromise = promisify(User.register, User);
    await registerWithPromise(user, req.body.password);
    next();
}

exports.account = (req,res) => {
    res.render('account',  {title : 'Account Management'});
}
exports.updateAccount = async (req,res) => {
    const updates = {
        name: req.body.name,
        email: req.body.email
    };

    const user = await User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: updates },
        { new: true, runValidators: true, context: 'query'}
    );
    req.flash('success', 'Update the profile');
    res.redirect('back'); //Redirect to url before caming here
}

exports.adminPanel = async (req,res,next) => {
    console.log("a");
    res.redirect('/');
}