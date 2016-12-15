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

            MusicService
                .searchMusicByTitle(title)
                .success(function (result) {
                    vm.music = result.albums.items;
                    $location.url("/search/"+title);
                });

        }

        function searchByKeyPress(event, title) {
            if (event.keyCode === 13) {
                searchMusicByTitle(title);
            }
        }

    }

})();
