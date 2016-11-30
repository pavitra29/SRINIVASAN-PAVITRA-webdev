module.exports = function(app, model) {

    var passport      = require('passport');
    var LocalStrategy    = require('passport-local').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;

    var cookieParser  = require('cookie-parser');
    var session       = require('express-session');

    var bcrypt = require("bcrypt-nodejs");

    // first configure raw session
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true
    }));

    // console.log(process.env.SESSION_SECRET);

    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session()); // then configure passport session

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.post('/api/login', passport.authenticate('local'), login);
    app.post ('/api/register', register);
    app.post('/api/checkLogin', checkLogin);
    app.post('/api/checkAdmin', checkAdmin);
    app.post('/api/logout', logout);
    app.get('/api/user', findUser);
    // app.get('/api/admin/user', admin ,findAllUser);
    app.get('/api/user/:uid', findUserById);
    app.post('/api/user',createUser);
    app.put('/api/user/:uid', loggedInAndSelf, updateUser);
    app.delete('/api/user/:uid', loggedInAndSelf, deleteUser);

    app.get('/api/google/callback',
        passport.authenticate('google', {
            successRedirect: '/assignment/index.html#/user',
            failureRedirect: '/assignment/index.html#/login'
        }));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/index.html#/user',
            failureRedirect: '/assignment/index.html#/login'
        }));

    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };


    if (process.env.GOOGLE_CLIENT_ID) {
        passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    }

    if (process.env.FACEBOOK_CLIENT_ID) {
        passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    }

    function loggedInAndSelf(req, res, next) {
        var loggedIn = req.isAuthenticated();
        var userId = req.params.uid;

        var self = userId == req.user._id;

        if(self && loggedIn) {
            next();
        } else {
            res.sendStatus(400).send("You are not the same person");
        }

    }

    function googleStrategy(token, refreshToken, profile, done) {
        console.log(profile);
        model
            .userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return model.userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        console.log(profile);
        model
            .userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        // var email = profile.emails[0].value;
                        // var emailParts = email.split("@");
                        var newFacebookUser = {
                            username:  profile.displayName.split(" ")[0].toLowerCase(),
                            firstName: profile.displayName.split(" ")[0],
                            lastName:  profile.displayName.split(" ")[1],
                            // email:     email,
                            facebook: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return model.userModel.createUser(newFacebookUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }


    function register (req, res) {
        var user = req.body;

        // user.password = bcrypt.hashSync(user.password);
        model
            .userModel
            .createUser(user)
            .then(
            function(user){
                if(user){
                    req.login(user, function(err) {
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            }
        );
    }


    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function checkLogin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function checkAdmin(req, res) {

        var loggedIn = req.isAuthenticated() ;
        var isAdmin = req.user.role == "ADMIN";

        if(loggedIn && isAdmin) {
            res.json(req.user);
        } else {
            res.send('0');
        }
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model
            .userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(error){
                    done(error, null);
                }
            );
    }

    function localStrategy(username, password, done) {  // parameter in this function can be called with any name
                                                        // like userNm, pass, someFunction
                                                        // but the sequence means first is username, second is password
                                                        // and third is a function
        // password = bcrypt.hashSync(password);

        model
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    // if (user && bcrypt.compareSync(password, user.password)) {
                    if(user) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false);
                    }
                },
                function (error) {
                    return done(error);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function deleteUser(req,res) {
        var uid = req.params['uid'];

        model
            .userModel
            .deleteUser(uid)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

    }

    function updateUser(req, res) {
        var user = req.body;

        var uid = req.params['uid'];

        model
            .userModel
            .updateUser(uid, user)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

    }

    function createUser(req, res) {
        var user = req.body;

        model
            .userModel
            .createUser(user)
            .then(
                function (newUser) {
                    res.send(newUser);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    //Important concept about types of parameters
    //path parameters = /user/:uid

    //query parameters = /user?username=alice

    function findUser(req, res) {

        var params = req.params; // path params

        var query = req.query; //query params


        if(query.password && query.username) {
            findUserByCredentials(req, res);
        }
        else if(query.username) {
            findUserByUsername(req, res);
        }
        else {
            res.json(req.user);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;

        model
            .userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user) {
                        res.json(user);
                    }
                    else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

    }

    function findUserById(req, res) {
        var userId = req.params.uid;


        model
            .userModel
            .findUserById(userId)
            .then(
                function (user) {
                    if(user) {
                        res.send(user);
                    }
                    else {
                        res.send('0');
                    }

                },
                function (error) {
                    res.sendStatus(400).send(error);
                }


            );

    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        model
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    if(user) {
                        res.json(user);
                    }
                    else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

    }
};
