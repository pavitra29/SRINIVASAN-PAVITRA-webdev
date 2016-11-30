(function () {
    angular
        .module("WebAppMaker")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/admin", {
                templateUrl: "views/admin/user-list.view.client.html",
                resolve: {
                    checkAdmin: checkAdmin
                }
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
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
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                    //, isMyFriend = isMyFriend
                    // can have multiple functions here to be resolved
                    // resolved will be true once all of them are complete
                }
            })
            .when("/user/:uid/website", {
                templateUrl: "views/website/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/new", {
                templateUrl: "views/website/website-new.view.client.html",
                controller: "NewWebsiteController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid", {
                templateUrl: "views/website/website-edit.view.client.html",
                controller: "EditWebsiteController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page", {
                templateUrl: "views/page/page-list.view.client.html",
                controller: "PageListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: "views/page/page-new.view.client.html",
                controller: "NewPageController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: "views/page/page-edit.view.client.html",
                controller: "EditPageController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: "views/widget/widget-list.view.client.html",
                controller: "WidgetListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: "views/widget/widget-chooser.view.client.html",
                controller: "NewWidgetController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: "views/widget/widget-edit.view.client.html",
                controller: "EditWidgetController",
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



