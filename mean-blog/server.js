var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blogfall2016');

var PostSchema = mongoose.Schema({
    title: {type: String, required: true},
    body: String,
    tag: {type: String, enum: ['POLITICS', 'ECONOMY', 'EDUCATION']},
    posted: {type: Date, default: Date.now()}
}, {collection: 'post'});

var PostModel = mongoose.model("PostModel", PostSchema);



app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post("/api/blogpost",createPost);
app.get("/api/blogpost", getAllPosts);
app.get("/api/blogpost/:id", getPostById);
app.delete("/api/blogpost/:id", deletePost);
app.put("/api/blogpost/:id", updatePostById);

//delete and update send the status

function updatePostById(req, res) {
    var postId = req.params.id;
    var post = req.body;

    PostModel
        .update({_id: postId}, {
            title: post.title,
            body: post.body
        })
        .then(
            function (status) {
                res.sendStatus(200);
            },
            function () {
                res.sendStatus(400);
            }
        );
}

function getPostById(req, res) {
    var postId = req.params.id;

    PostModel
        .findById(postId)
        .then(
            function (post) {
                res.json(post);
            },
            function () {
                res.sendStatus(400);
            }
        );
}

function deletePost(req, res) {
    var postId = req.params.id;

    PostModel
        .remove({_id: postId})
        .then(
            function (status) {
                res.sendStatus(200);
            },
            function () {
                res.sendStatus(400);
            }
        );
}

function getAllPosts(req, res) {

    PostModel
        .find()
        .then(
            function (posts) {
                res.json(posts);
            },
            function (error) {
                res.sendStatus(400);
            }
        );

}

function createPost(req, res) {
    var post = req.body;

    console.log(post);
    // console.log("hello from server");

    PostModel
        .create(post)
        .then(
            function (postObj) {
                res.sendStatus(200);
            },
            function (error) {
                res.sendStatus(400);
            }
        );


}

app.listen(3000);
