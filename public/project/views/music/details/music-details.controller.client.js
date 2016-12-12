(function () {
    angular
        .module("SpotTunesApp")
        .controller("MusicDetailsController", MusicDetailsController);


    function MusicDetailsController($routeParams, MusicService, UserService, $rootScope, ReviewService) {

        var vm = this;
        vm.albumId = $routeParams.id;
        vm.title = $routeParams.title;

        vm.addReview = addReview;
        vm.selectReview = selectReview;
        vm.updateReview = updateReview;
        vm.deleteReview = deleteReview;
        vm.cancelReview = cancelReview;
        vm.favoriteMusic = favoriteMusic;
        vm.undoFavoriteMusic = undoFavoriteMusic;

        function init() {

            UserService
            // .findUserById(userId)
                .findCurrentUser() //returning the current user from session which is stored in req.user on server
                .success(function (user) {
                    if(user != '0') {
                        $rootScope.currentUser = user;
                        vm.user = user;
                    }
                })
                .error(function () {

                });

            MusicService
                .searchMusicByAlbumID(vm.albumId)
                .success(function (response) {
                    vm.music = response;

                    if(vm.music.artists[0].id) {

                        var artistID = vm.music.artists[0].id;

                        MusicService
                            .searchMusicByArtistID(artistID)
                            .success(function (artist) {
                                vm.artist = artist;
                            });

                        MusicService
                            .findSimilarMusic(artistID)
                            .success(function (response) {
                                vm.similar = response;

                            });
                    }
                });

            findAllReviewsByMusicId(vm.albumId);

        }
        init();

        function musicAvgRatingByMusicId(reviews) {
            var avgRating = 0;
            for (var i = 0; i < reviews.length; i++) {
                avgRating += parseInt(reviews[i].rating);
            }
            vm.avgRating = (avgRating / reviews.length);
            if (isNaN(vm.avgRating)) {
                vm.avgRating = 0;
            }
        }

        function findAllReviewsByMusicId(albumId) {
            ReviewService
                .findAllReviewsByMusicId(albumId)
                .then(function (response) {
                    if (response.data) {
                        vm.reviews = response.data;

                        console.log("reviews");
                        console.log(vm.reviews);

                        findUserByReviewUserId(vm.reviews);
                        musicAvgRatingByMusicId(vm.reviews);
                        isMusicFavorite();
                    }
                });
        }

        function findUserByReviewUserId(reviews) {
            reviews.forEach(function (element, index, array) {
                UserService.findUserById(reviews[index].userId)
                    .then(function (response) {

                        console.log("find reviews");
                        console.log(response);

                        if (response.data) {
                            reviews[index].userFirstName = response.data.firstName;
                            reviews[index].imgUrl = response.data.imgUrl;
                        }
                    });
            });
        }

        function addReview(review) {

            vm.music.imageUrl = vm.music.images[0].url;

            ReviewService
                .addReview(vm.user._id, vm.albumId, review)
                .then(function (response) {
                    if (response.data) {
                        vm.selectedIndex = -1;
                        vm.review = {};
                        vm.reviews.push(response.data);

                        console.log(vm.reviews);

                        findUserByReviewUserId(vm.reviews);
                        musicAvgRatingByMusicId(vm.reviews);

                        console.log(vm.music);

                        return MusicService.addMusic(vm.music);
                    }
                })
                .then(function (response) {
                    console.log(response);
                    console.log("Music Inserted !");
                });
        }

        function selectReview(index) {
            vm.selectedIndex = index;
            var editReview = {
                "_id": vm.reviews[index]["_id"],
                "title": vm.reviews[index]["title"],
                "description": vm.reviews[index]["description"],
                "timestamp": vm.reviews[index]["timestamp"],
                "musicId": vm.reviews[index]["albumId"],
                "userId": vm.reviews[index]["userId"],
                "rating": vm.reviews[index]["rating"]
            };
            vm.editReview = editReview;
        }

        function updateReview(review) {
            ReviewService
                .updateReview(vm.albumId, review._id, review)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    if ((status.n == 1 || status.nModified == 1) && status.ok == 1) {
                        vm.reviews[vm.selectedIndex] = review;
                        vm.selectedIndex = -1;
                        vm.review = {};
                        findUserByReviewUserId(vm.reviews);
                        musicAvgRatingByMusicId(vm.reviews);
                    }
                });
        }

        function deleteReview(index) {
            var reviewId = vm.reviews[index]._id;
            ReviewService
                .deleteReview(vm.albumId, reviewId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    if (status.n == 1 && status.ok == 1) {
                        vm.reviews.splice(index, 1);
                        vm.selectedIndex = -1;
                        vm.review = {};
                        findUserByReviewUserId(vm.reviews);
                        musicAvgRatingByMusicId(vm.reviews);
                    }
                });
        }

        function cancelReview() {
            vm.selectedIndex = -1;
        }



        function favoriteMusic() {
            vm.music.imageUrl = vm.music.images[0].url;
            
            console.log(vm.user._id);
            console.log(vm.music);

            console.log(vm.albumId);
            
            UserService
                .favoriteMusic(vm.user._id, vm.albumId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    if ((status.n == 1 || status.nModified == 1) && status.ok == 1) {
                        vm.isFavorite = true;
                        return MusicService.addMusic(vm.music);
                    }
                })
                .then(function (response) {
                    console.log("Music Inserted !");
                });
        }

        function undoFavoriteMusic() {
            UserService
                .undoFavoriteMusic(vm.user._id, vm.albumId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    if ((status.n == 1 || status.nModified == 1) && status.ok == 1) {
                        vm.isFavorite = false;
                    }
                });
        }

        function isMusicFavorite() {
            UserService
                .isMusicFavorite(vm.user._id, vm.albumId)
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        console.log(user);
                        vm.isFavorite = true;
                    }
                    else {
                        vm.isFavorite = false;
                    }
                });
        }
    }
})();
