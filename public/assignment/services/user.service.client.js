(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService",UserService);
    
    function UserService() {

        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice@gmail.com" },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bob@gmail.com" },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "charly@gmail.com" },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jose@gmail.com" }
        ];


        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        function createUser(user) {

            console.log([user._id, user.username, user.password, user.firstName, user.lastName, user.email]);

            var userId = parseInt(Math.floor(Math.random()*900) + 100);

            console.log(userId);

            user._id = userId;

            console.log([user._id, user.username, user.password, user.firstName, user.lastName, user.email]);

            users.push(user);

            return user;
        }

        function findUserById(userId) {
            for(var u in users) {
                user = users[u];
                if(user._id == userId) {
                    return user;
                }
            }
            return null;
        }
        
        function findUserByUsername(username) {
            for(var u in users) {
                user = users[u];
                if(user.username === username) {
                    return user;
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                user = users[u];
                if(user.username === username && user.password === password) {
                    return user;
                }
            }
            return null;
        }

        function updateUser(userId, user) {

            console.log([userId, user.username, user.email, user.firstName, user.lastName]);

            for(var u in users) {
                var existingUser = users[u];
                if(existingUser._id === userId) {
                    existingUser.username = user.username;
                    existingUser.email = user.email;
                    existingUser.firstName = user.firstName;
                    existingUser.lastName = user.lastName;

                    return existingUser;
                }
            }
            return null;
        }

        
        function deleteUser(userId) {
            for(var u in users) {
                var user = users[u];

                if(user._id === userId) {
                    console.log("User "+ user.username+" deleted");
                    users.splice(u,1);
                }
            }
        }
    }
})();
