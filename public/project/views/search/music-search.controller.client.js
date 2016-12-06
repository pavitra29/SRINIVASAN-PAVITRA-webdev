(function () {

    angular
        .module("MyAngularApp")
        .controller("MusicSearchController", MusicSearchController);

    function MusicSearchController($routeParams, MusicService) {

        var vm = this;

        vm.searchMusicByTitle = searchMusicByTitle;

        vm.title = $routeParams.title;

        function init() {
            if(vm.title) {
                searchMusicByTitle(vm.title)
            }
        }
        init();

        function searchMusicByTitle(title) {

            MusicService
                .searchMusicByTitle(title)
                .success(function (result) {
                    vm.music = result.artists.items;
                });

        }

    }

})();
