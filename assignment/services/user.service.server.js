module.exports = function(app, model) {

    // var users = [
    //     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice@gmail.com" },
    //     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bob@gmail.com" },
    //     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "charly@gmail.com" },
    //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jose@gmail.com" }
    // ];

    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.post('/api/user',createUser);
    app.put('/api/user/:uid',updateUser);
    app.delete('/api/user/:uid',deleteUser);


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

        // for(var u in users) {
        //     if(users[u]._id == uid) {
        //         users.splice(u,1);
        //     }
        // }
        //
        // res.sendStatus(200);

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

        // for(var u in users) {
        //     if(users[u]._id == uid) {
        //         users[u] = user;
        //         break;
        //     }
        // }
        //
        // res.sendStatus(200);

    }

    function createUser(req, res) {
        var user = req.body;
        // user._id = (new Date()).getTime();
        // users.push(user);

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
        
        // for(var u in users) {
        //     if(users[u].username === username) {
        //         res.send(users[u]);
        //         return;
        //     }
        // }
        //
        // res.send('0');
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

        // for(var u in users) {
        //     if(users[u]._id == userId) {
        //         res.send(users[u]);
        //         return;
        //     }
        // }

        // res.send('0');
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        model
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function (users) {
                    if(users) {
                        res.json(users[0]);
                    }
                    else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

        // for(var u in users) {
        //     if(users[u].username === username &&
        //         users[u].password === password) {
        //         res.send(users[u]);
        //         return;
        //     }
        // }
        //
        // res.send('0');
    }
};
