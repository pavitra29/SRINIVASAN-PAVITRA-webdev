(function () {

    angular
        .module("MyAngularApp")
        .factory("MusicService", MusicService);

    function MusicService($http) {

        var api = {
            "searchMusicByTitle": searchMusicByTitle,
            "searchMusicByID": searchMusicByID
        };
        return api;

        function searchMusicByTitle(title) {
            var url = "https://api.spotify.com/v1/search?q="+title+"&type=artist&limit=10";

            return $http.get(url);


        }

        function searchMusicByID(id) {
            var url = "https://api.spotify.com/v1/artists/" + id;

            return $http.get(url)
        }



    }

})();
