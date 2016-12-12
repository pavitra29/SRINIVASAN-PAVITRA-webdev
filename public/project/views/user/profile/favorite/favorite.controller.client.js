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
            UserService
                .findCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;
                        $rootScope.currentUser = user;

                        console.log(user);

                        vm.loggedInUserId = user._id;
                        return UserService.findAllFavoriteMusic(vm.navigateUserId);
                    }
                })
                .then(function (response) {

                    console.log(response);
                    var music = response.data;
                    if (music) {
                        isMusicFavorite(music);

                        UserService
                            .findUserById(vm.navigateUserId)
                            .then(function (response) {
                                var user = response.data;
                                if (user) {
                                    vm.navigatedUser = user;
                                }
                            });
                    }
                });

            ReviewService.findAllReviewsByUserId(vm.navigateUserId)
                .then(function (response) {
                        vm.reviews = response.data;
                    },
                    function (err) {
                        console.log(err);
                    });
        }

        init();

        function favoriteMusic(index) {
            var musicId = vm.music[index]._id;
            UserService
                .favoriteMusic(vm.loggedInUserId, musicId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    if ((status.n == 1 || status.nModified == 1) && status.ok == 1) {
                        vm.music[index].isFavorite = true;
                    }
                });
        }

        function undoFavoriteMusic(index) {
            var musicId = vm.music[index]._id;
            UserService
                .undoFavoriteMusic(vm.loggedInUserId, musicId)
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
