(function () {

    angular
        .module("SpotTunesApp")
        .controller("FavoritesController", FavoritesController);

    function FavoritesController($routeParams, UserService, $rootScope, ReviewService) {
        var vm = this;

        vm.favoriteMusic = favoriteMusic;
        vm.undoFavoriteMusic = undoFavoriteMusic;

        vm.navigateUserId = $routeParams.userId;

        function init() {

            if(!vm.navigateUserId) {
                UserService
                    .findCurrentUser()
                    .then(function (response) {
                        var user = response.data;
                        if (user) {
                            vm.user = user;
                            $rootScope.currentUser = user;
                            vm.loggedInUserId = user._id;

                            ReviewService.findAllReviewsByUserId(vm.user._id)
                                .then(function (response) {
                                        vm.reviews = response.data;
                                    },
                                    function (err) {
                                        console.log(err);
                                    });

                            return UserService.findAllFavoriteMusic(vm.user._id);
                        }
                    })
                    .then(function (response) {

                        var music = response.data;
                        if (music) {
                            isMusicFavorite(music);
                        }
                    });
            }
            else {
                UserService
                    .findCurrentUser()
                    .then(function (response) {
                        var user = response.data;
                        if (user) {
                            $rootScope.currentUser = user;
                            vm.loggedInUserId = user._id;

                            ReviewService.findAllReviewsByUserId(vm.navigateUserId)
                                .then(function (response) {
                                        vm.reviews = response.data;
                                    },
                                    function (err) {
                                        console.log(err);
                                    });

                            UserService
                                .findUserById(vm.navigateUserId)
                                .then(function (response) {
                                    var user = response.data;
                                    if (user) {
                                        vm.navigatedUser = user;
                                        vm.user = user;
                                    }
                                });

                            return UserService.findAllFavoriteMusic(vm.navigateUserId);
                        }
                    })
                    .then(function (response) {

                        var music = response.data;
                        if (music) {
                            isMusicFavorite(music);
                        }
                    });
            }

        }

        init();

        function favoriteMusic(index) {
            var albumId = vm.music[index]._id;
            UserService
                .favoriteMusic(vm.loggedInUserId, albumId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    if ((status.n == 1 || status.nModified == 1) && status.ok == 1) {
                        vm.music[index].isFavorite = true;
                    }
                });
        }

        function undoFavoriteMusic(index) {
            var albumId = vm.music[index]._id;
            UserService
                .undoFavoriteMusic(vm.loggedInUserId, albumId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    if ((status.n == 1 || status.nModified == 1) && status.ok == 1) {
                        vm.music[index].isFavorite = false;
                    }
                });
        }

        function isMusicFavorite(music) {
            UserService
                .findUserById(vm.user._id)
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;

                        music.forEach(function (element, index, array) {
                            if (vm.user.favorites.indexOf(element._id) > -1) {
                                element.isFavorite = true;
                            }
                            else {
                                element.isFavorite = false;
                            }
                        });

                        vm.music = music;
                    }
                });
        }
    }

})();
