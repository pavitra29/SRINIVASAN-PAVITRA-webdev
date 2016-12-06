(function () {
    angular
        .module("MyAngularApp")
        .controller("MusicDetailsController", MusicDetailsController);


    function MusicDetailsController($routeParams, MusicService) {

        var vm = this;
        var id = $routeParams.id;
        vm.title = $routeParams.title;

        function init() {

            MusicService
                .searchMusicByID(id)
                .success(function (response) {
                    vm.music = response
                });
        }
        init();
    }
})();
