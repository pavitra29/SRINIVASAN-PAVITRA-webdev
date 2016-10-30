module.exports = function(app) {

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice@gmail.com" },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bob@gmail.com" },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "charly@gmail.com" },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jose@gmail.com" }
    ];

    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.post('/api/user',createUser);
    app.put('/api/user/:uid',updateUser);
    app.delete('/api/user/:uid',deleteUser);


    function deleteUser(req,res) {
        var uid = req.params['uid'];

        for(var u in users) {
            if(users[u]._id == uid) {
                users.splice(u,1);
            }
        }

        res.sendStatus(200);

    }

    function updateUser(req, res) {
        var user = req.body;

        var uid = req.params['uid'];

        for(var u in users) {
            if(users[u]._id == uid) {
                users[u] = user;
                break;
            }
        }

        res.sendStatus(200);

    }

    function createUser(req, res) {
        var user = req.body;
        user._id = (new Date()).getTime();
        users.push(user);
        res.send(user);
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

        for(var u in users) {
            if(users[u].username === username) {
                res.send(users[u]);
                return;
            }
        }

        res.send('0');
    }

    function findUserById(req, res) {
        var userId = req.params.uid;

        for(var u in users) {
            if(users[u]._id == userId) {
                res.send(users[u]);
                return;
            }
        }

        res.send('0');
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        for(var u in users) {
            if(users[u].username === username &&
                users[u].password === password) {
                res.send(users[u]);
                return;
            }
        }

        res.send('0');
    }
};
