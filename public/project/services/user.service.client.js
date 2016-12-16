(function () {
    angular
        .module("SpotTunesApp")
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
            register: register,
            favoriteMusic: favoriteMusic,
            undoFavoriteMusic: undoFavoriteMusic,
            isMusicFavorite: isMusicFavorite,
            follow: follow,
            unfollow: unfollow,
            isAlreadyFollowing: isAlreadyFollowing,
            findAllFollowingUsers: findAllFollowingUsers,
            findAllFollowersUsers: findAllFollowersUsers,
            findAllFavoriteMusic: findAllFavoriteMusic,
            findAllUsers: findAllUsers,
            adminDeleteUser: adminDeleteUser
        };
        return api;

        function findAllUsers() {
            return $http.get("/api/admin/user");
        }

        function favoriteMusic(userId, albumId) {
            return $http.put("/api/user/" + userId + "/music/" + albumId + "/favorite");
        }

        function undoFavoriteMusic(userId, albumId) {
            return $http.put("/api/user/" + userId + "/music/" + albumId + "/undofavorite");
        }

        function isMusicFavorite(userId, albumId) {
            return $http.get("/api/user/" + userId + "/music/" + albumId + "/ismusicfavorite");
        }

        function follow(followerId, followingId) {
            return $http.put("/api/user/" + followerId + "/follows/" + followingId);
        }

        function unfollow(followerId, followingId) {
            return $http.put("/api/user/" + followerId + "/unfollows/" + followingId);
        }

        function isAlreadyFollowing(followerId, followingId) {
            return $http.get("/api/user/" + followerId + "/isalreadyfollowing/" + followingId);
        }

        function findAllFollowingUsers(userId) {
            return $http.get("/api/user/" + userId + "/following");
        }

        function findAllFollowersUsers(userId) {
            return $http.get("/api/user/" + userId + "/followers");
        }

        function findAllFavoriteMusic(userId) {
            return $http.get("/api/user/" + userId + "/favorites");
        }

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

        function adminDeleteUser(userId) {
            var url = "/api/admin/user/" + userId;
            return $http.delete(url);
        }
    }
})();
