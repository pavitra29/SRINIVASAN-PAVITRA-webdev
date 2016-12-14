(function () {
    angular
        .module("SpotTunesApp")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/admin", {
                templateUrl: "views/admin/user-list.view.client.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {
                    checkAdmin: checkAdmin
                }
            })
            .when("/login", {
                templateUrl: "views/user/login/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/", {
                templateUrl: "views/user/login/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "views/user/profile/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                    //, isMyFriend = isMyFriend
                    // can have multiple functions here to be resolved
                    // resolved will be true once all of them are complete
                }
            })
            .when("/user", {
                templateUrl: "views/user/profile/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                    //, isMyFriend = isMyFriend
                    // can have multiple functions here to be resolved
                    // resolved will be true once all of them are complete
                }
            })
            .when("/reviews/:userId", {
                templateUrl: "views/user/profile/review/review.view.client.html",
                controller: "ReviewsController",
                controllerAs: "model"
            })
            .when("/followers/:userId", {
                templateUrl: "views/user/profile/follow/follower.view.client.html",
                controller: "FollowersController",
                controllerAs: "model"
            })
            .when("/following/:userId", {
                templateUrl: "views/user/profile/follow/following.view.client.html",
                controller: "FollowingController",
                controllerAs: "model"
            })
            .when("/favorites/:userId", {
                templateUrl: "views/user/profile/favorite/favorite.view.client.html",
                controller: "FavoritesController",
                controllerAs: "model"
            })
            .when("/search", {
                templateUrl: "views/music/search/music-search.view.client.html",
                controller: "MusicSearchController",
                controllerAs: "model"
            })
            .when("/search/:title", {
                templateUrl: "views/music/search/music-search.view.client.html",
                controller: "MusicSearchController",
                controllerAs: "model"
            })
            .when("/details/:albumId/:title", {
                templateUrl: "views/music/details/music-details.view.client.html",
                controller: "MusicDetailsController",
                controllerAs: "model"
            })
            .when("/details/:albumId/:title/:userId", {
                templateUrl: "views/music/details/music-details.view.client.html",
                controller: "MusicDetailsController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/login"
            });


        // angular $q library allows things to be synchronous which are usually asynchronous
        function checkLogin($q, UserService, $location, $rootScope) {

            var deferred = $q.defer();

            UserService
                .checkLogin()
                .success(
                    function (user) {
                        if(user != '0') {
                            deferred.resolve();
                            $rootScope.currentUser = user;
                        }
                        else {
                            deferred.reject();
                            $location.url("/login");
                        }
                    }
                );

            return deferred.promise;
        }

        function checkAdmin($q, UserService, $location) {

            var deferred = $q.defer();

            UserService
                .checkAdmin()
                .success(
                    function (user) {
                        if(user != '0') {
                            deferred.resolve();
                        }
                        else {
                            deferred.reject();
                            $location.url("/login");
                        }
                    }
                );

            return deferred.promise;
        }

    }
})();



