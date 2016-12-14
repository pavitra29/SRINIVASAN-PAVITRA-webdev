(function () {

    angular
        .module("SpotTunesApp")
        .factory("MusicService", MusicService);

    function MusicService($http) {

        var relatedArtists = "https://api.spotify.com/v1/artists/ARTISTID/related-artists";

        var api = {
            "searchMusicByTitle": searchMusicByTitle,
            "searchMusicByAlbumID": searchMusicByAlbumID,
            "searchMusicByArtistID": searchMusicByArtistID,
            "findSimilarMusic": findSimilarMusic,
            "addMusic": addMusic
        };
        return api;

        function addMusic(music) {
            return $http.post("/api/music", music);
        }

        function findSimilarMusic(artistId) {
            var url = relatedArtists
                .replace("ARTISTID", artistId);

            return $http.get(url);
        }

        function searchMusicByTitle(title) {
            var url = "https://api.spotify.com/v1/search?q="+title+"&type=album&limit=50";

            return $http.get(url);

        }

        function searchMusicByArtistID(id) {
            var url = "https://api.spotify.com/v1/artists/"+id;

            return $http.get(url);
        }

        function searchMusicByAlbumID(id) {
            var url = "https://api.spotify.com/v1/albums/" + id;

            return $http.get(url)
        }



    }

})();
