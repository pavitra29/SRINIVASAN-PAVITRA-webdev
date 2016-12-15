module.exports = function(app, model) {

    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/project/upload' });
    var passport      = require('passport');
    var LocalStrategy    = require('passport-local').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var InstaStrategy = require('passport-instagram').Strategy;
    var SpotifyStrategy = require('passport-spotify').Strategy;

    var cookieParser  = require('cookie-parser');
    var session       = require('express-session');

    var bcrypt = require("bcrypt-nodejs");

    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true
    }));

    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/instagram', passport.authenticate('instagram'));
    app.get('/auth/spotify', passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private'] } ));

    app.post('/api/login', passport.authenticate('local'), login);
    app.post ('/api/register', register);
    app.post('/api/checkLogin', checkLogin);
    app.post('/api/checkAdmin', checkAdmin);
    app.post('/api/logout', logout);
    app.get('/api/user', findUser);
    app.get('/api/admin/user', findAllUsers);
    app.get('/api/user/:uid', findUserById);
    app.post('/api/user',createUser);
    app.put('/api/user/:uid', loggedInAndSelf, updateUser);
    app.delete('/api/user/:uid', loggedInAndSelf, deleteUser);

    app.put("/api/user/:userId/music/:musicId/favorite", favoriteMusic);
    app.put("/api/user/:userId/music/:musicId/undofavorite", undoFavoriteMusic);
    app.get("/api/user/:userId/music/:musicId/ismusicfavorite", isMusicFavorite);
    app.put("/api/user/:followerId/follows/:followingId", follow);
    app.put("/api/user/:followerId/unfollows/:followingId", unfollow);
    app.get("/api/user/:followerId/isalreadyfollowing/:followingId", isAlreadyFollowing);
    app.get("/api/user/:userId/following", findAllFollowingUsers);
    app.get("/api/user/:userId/followers", findAllFollowersUsers);
    app.get("/api/user/:userId/favorites", findAllFavoriteMusic);
    app.post("/api/profile/upload", upload.single('profileImg'), uploadImage);

    app.get('/api/google/callback',
        passport.authenticate('google', {
            successRedirect: '/project/index.html#/user',
            failureRedirect: '/project/index.html#/login'
        }));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project/index.html#/user',
            failureRedirect: '/project/index.html#/login'
        }));

    app.get('/auth/instagram/callback',
        passport.authenticate('instagram', {
            successRedirect: '/project/index.html#/user',
            failureRedirect: '/project/index.html#/login'
        }));

    app.get('/auth/spotify/callback',
        passport.authenticate('spotify', {
            successRedirect: '/project/index.html#/user',
            failureRedirect: '/project/index.html#/login'
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

    var instaConfig = {
        clientID     : process.env.INSTAGRAM_CLIENT_ID,
        clientSecret : process.env.INSTAGRAM_CLIENT_SECRET,
        callbackURL  : process.env.INSTAGRAM_CALLBACK_URL
    };

    var spotifyConfig = {
        clientID     : process.env.SPOTIFY_CLIENT_ID,
        clientSecret : process.env.SPOTIFY_CLIENT_SECRET,
        callbackURL  : process.env.SPOTIFY_CALLBACK_URL
    };

    if (process.env.SPOTIFY_CLIENT_ID) {
        passport.use(new SpotifyStrategy(spotifyConfig, spotifyStrategy));
    }

    if (process.env.INSTAGRAM_CLIENT_ID) {
        passport.use(new InstaStrategy(instaConfig, instaStrategy));
    }

    if (process.env.GOOGLE_CLIENT_ID) {
        passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    }

    if (process.env.FACEBOOK_CLIENT_ID) {
        passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    }

    function findAllUsers(req, res) {
        model
            .userModel
            .findAllUsers()
            .then(function (users) {
                res.json(users)
            },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            )
    }
    
    function favoriteMusic(req, res) {
        var reqMusicId = req.params.musicId;
        var reqUserId = req.params.userId;
        model
            .userModel
            .favoriteMusic(reqUserId, reqMusicId)
            .then(
                function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function undoFavoriteMusic(req, res) {
        var reqMusicId = req.params.musicId;
        var reqUserId = req.params.userId;
        model
            .userModel
            .undoFavoriteMusic(reqUserId, reqMusicId)
            .then(
                function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function isMusicFavorite(req, res) {
        var reqMusicId = req.params.musicId;
        var reqUserId = req.params.userId;
        model
            .userModel
            .findMusicByFavorite(reqUserId, reqMusicId)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function follow(req, res) {
        var followerId = req.params.followerId;
        var followingId = req.params.followingId;

        model
            .userModel
            .addFollowingUser(followerId, followingId)
            .then(
                function (response) {
                    return model
                        .userModel
                        .addFollowerUser(followerId, followingId);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function unfollow(req, res) {
        var followerId = req.params.followerId;
        var followingId = req.params.followingId;
        model
            .userModel
            .removeFollowingUser(followerId, followingId)
            .then(
                function (response) {
                    return model
                        .userModel
                        .removeFollowerUser(followerId, followingId);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function isAlreadyFollowing(req, res) {
        var followerId = req.params.followerId;
        var followingId = req.params.followingId;
        model
            .userModel
            .isAlreadyFollowing(followerId, followingId)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllFollowingUsers(req, res) {
        var reqUserId = req.params.userId;
        model.userModel
            .findUserById(reqUserId)
            .then(
                function (user) {
                    return model.userModel.findAllFollowingUsers(user.following);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (users) {
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllFollowersUsers(req, res) {
        var reqUserId = req.params.userId;
        model.userModel
            .findUserById(reqUserId)
            .then(
                function (user) {
                    return model.userModel.findAllFollowersUsers(user.follower);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (users) {
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllFavoriteMusic(req, res) {
        var reqUserId = req.params.userId;
        model
            .userModel
            .findUserById(reqUserId)
            .then(
                function (user) {
                    return model
                        .musicModel
                        .findAllFavoriteMusic(user.favorites);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (music) {
                    res.json(music);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;
        var userId        = req.body.userId;

        var originalname  = myFile.originalname;
        var filename      = myFile.filename;
        var path          = myFile.path;
        var destination   = myFile.destination;
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        model.userModel.findUserById(userId)
            .then(function(user){
                    user.imageUrl = "/project/upload/" + filename;
                    model.userModel.updateUser(userId,user)
                        .then(function(status){
                                res.redirect("/project/#/user/" + userId);
                            },
                            function(error){
                                res.statusCode(400).send(error);
                            });

                },
                function(error){
                    res.statusCode(400).send(error);
                });

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


    function spotifyStrategy(token, refreshToken, profile, done) {

        model
            .userModel
            .findUserBySpotifyId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var newSpotifyUser = {
                            email: profile.email,
                            username:  profile.username,
                            firstName: profile.displayName.split(" ")[0],
                            lastName:  profile.displayName.split(" ")[1],
                            spotify: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return model.userModel.createUser(newSpotifyUser);
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

    function instaStrategy(token, refreshToken, profile, done) {

        model
            .userModel
            .findUserByInstagramId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var newInstaUser = {
                            username:  profile.username,
                            firstName: profile.displayName.split(" ")[0],
                            lastName:  profile.displayName.split(" ")[1],
                            insta: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return model.userModel.createUser(newInstaUser);
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

    function googleStrategy(token, refreshToken, profile, done) {

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

        model
            .userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var newFacebookUser = {
                            username:  profile.displayName.split(" ")[0].toLowerCase(),
                            firstName: profile.displayName.split(" ")[0],
                            lastName:  profile.displayName.split(" ")[1],
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

        user.password = bcrypt.hashSync(user.password);
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

    function localStrategy(username, password, done) {
        model
            .userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false);
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
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

    function findUser(req, res) {

        var query = req.query;


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
