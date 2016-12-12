(function() {
    angular
        .module('WebAppMaker')
        .factory("FlickrService", FlickrService);

    function FlickrService($http) {
        var key = "228d37ff7e9b319fd067f8e1c86f7957";
        var secret = "01c04942c62e9c9a";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        var api = {
            searchPhotos    : searchPhotos
        };
        return api;

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();
