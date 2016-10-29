(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService",UserService);

    function UserService($http) {

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

        function generateRandomId() {
            return parseInt(Math.floor(Math.random()*900) + 100);
        }

        function createUser(user) {
            //TODO : Check if the ID generated is Unique
            //
            // var userId = generateRandomId();
            //
            // user._id = userId.toString();
            //
            // users.push(user);
            //
            // return user;

            var user = {
                username : user.username,
                password: user.password
            }

            $http.post("/api/user",user);
        }

        function findUserById(userId) {
            var url = "/api/user/"+userId;

            console.log(url);

            return $http.get(url);
        }

        function findUserByUsername(username) {
            for(var u in users) {
                user = users[u];
                if(user.username === username) {
                    return JSON.parse(JSON.stringify(user));
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            var url = '/api/user?username='+username+'&password='+password;

            return $http.get(url);
        }

        function updateUser(userId, user) {

            // for(var u in users) {
            //     var existingUser = users[u];
            //     if(existingUser._id === userId) {
            //         existingUser.username = user.username;
            //         existingUser.email = user.email;
            //         existingUser.firstName = user.firstName;
            //         existingUser.lastName = user.lastName;
            //
            //         return existingUser;
            //     }
            // }
            // return null;

            var url = "/api/user/"+userId;

            $http.put(url,user);

        }


        function deleteUser(userId) {

            var url = "/api/user/"+userId;

             return $http.delete(url);

            // for(var u in users) {
            //     var user = users[u];
            //
            //     if(user._id === userId) {
            //         console.log("User "+ user.username+" deleted");
            //         users.splice(u,1);
            //     }
            // }
        }
    }
})();
