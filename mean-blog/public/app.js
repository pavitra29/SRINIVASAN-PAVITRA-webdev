(function () {
    angular
        .module("BlogApp",[])
        .controller("BlogController", BlogController);

    function BlogController($scope, $http) {

        $scope.createPost = createPost;
        $scope.deletePost = deletePost;
        $scope.editPost = editPost;
        $scope.updatePost = updatePost;

        function init() {
            getAllPosts();
        }
        init();

        function updatePost(post) {
            console.log(post);
            
            $http
                .put("/api/blogpost/"+post._id, post)
                .success(getAllPosts)
                .error(function () {
                    
                });
        }

        function editPost(postId) {
            $http
                .get("/api/blogpost/"+postId)
                .success(function (post) {
                    $scope.post = post;
                })
                .error(function () {

                });
        }

        function deletePost(postId) {
            $http
                .delete("/api/blogpost/"+postId)
                .success(getAllPosts);
        }


        function getAllPosts() {
            $http
                .get("/api/blogpost")
                .success(function (posts) {
                    $scope.posts = posts;
                })
                .error(function () {

                });
        }

        function createPost(post) {
            console.log(post);

            $http
                .post("/api/blogpost",post)
                .success(getAllPosts);

        }

    }


})();
