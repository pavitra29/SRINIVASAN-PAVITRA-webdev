(function () {

    angular
        .module("SpotTunesApp")
        .controller("MusicSearchController", MusicSearchController);

    function MusicSearchController($routeParams, MusicService, $location) {

        var vm = this;

        vm.searchMusicByTitle = searchMusicByTitle;

        vm.searchByKeyPress = searchByKeyPress;

        vm.title = $routeParams.title;

        function init() {
            if(vm.title) {
                searchMusicByTitle(vm.title);
            }
        }
        init();

        function searchMusicByTitle(title) {

            vm.error = "";

            MusicService
                .searchMusicByTitle(title)
                .success(function (result) {

                    if(result.albums.items.length > 0) {
                        vm.music = result.albums.items;
                        $location.url("/search/" + title);
                    }
                    else {
                        vm.error = "No Search Results returned for this title!"
                    }
                });

        }

        function searchByKeyPress(event, title) {
            if (event.keyCode === 13) {
                searchMusicByTitle(title);
            }
        }

    }

})();
