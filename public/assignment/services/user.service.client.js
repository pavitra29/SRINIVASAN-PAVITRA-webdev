(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService",UserService);

    function UserService($http) {

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findCurrentUser: findCurrentUser,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            checkLogin: checkLogin,
            checkAdmin: checkAdmin,
            logout: logout,
            register: register
        };
        return api;

        function register(user) {
            return $http.post("/api/register", user);
        }

        function logout() {
            return $http.post("/api/logout");
        }

        function checkLogin() {
            return $http.post("/api/checkLogin");
        }

        function checkAdmin() {
            return $http.post("/api/checkAdmin");
        }

        function login(username, password) {
            var user = {
                username: username,
                password: password
            };

            return $http.post("/api/login", user);
        }

        function createUser(user) {
            var user = {
                username : user.username,
                password: user.password
            };
            return $http.post("/api/user",user);
        }

        function findCurrentUser() {
            // var url = "/api/admin/user";      //this might be link for getting all users when admin logs in
            var url = "/api/user";
            return $http.get(url);
        }

        function findUserById(userId) {
            var url = "/api/user/"+userId;
            return $http.get(url);
        }

        function findUserByUsername(username) {
            var url = "/api/user?username="+username;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = '/api/user?username='+username+'&password='+password;
            return $http.get(url);
        }

        function updateUser(user) {
            var url = "/api/user/" + user._id;
            return $http.put(url,user);
        }

        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url);
        }
    }
})();
