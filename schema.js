var mongoose = require("mongoose");
var schema = require ('./schema');
var Article = mongoose.model('Article', schema, 'article');

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

module.exports = new mongoose.Schema(
    {
        title: {
            type: String,
            requiered: true
        },
        author: {
            type: String,
            required:true
        },
        body: {
            type: String,
            requiered: true
        },
        comments: [{body: String, date: Date}],
        date: {type: Date, default: Date.now},
        hidden: {type: Boolean, default: false},
        meta: {
            votes: Number,
            favs: Number 
        }
    }
);

function find (auth) {
    Article.find({author:auth}, (error, doc) => {
        if (error) {
            console.log(error);
            process.exit(1);
        }
        console.log("<----------Consulta Por autor--------->");
        console.log(doc);
        process.exit(0);
    });
}
module.exports.find = find;

function insert (tit, aut, bod, combody, comdat, date, vot, fav) {
    var article = new Article({
        title: tit,
        author: aut,
        body: bod,
        comments: [ {Body:combody, date:comdat}],
        date: date,
        meta: {votes:vot, favs:fav}
    });

    article.save((error) => {
        if (error) {
            console.log(error);
            process.exit(1);
        }
        console.log("Saved!!");
        process.exit(0);
    });
}
module.exports.insert = insert;

function update (id) {
    Article.findByIdAndUpdate({_id:id}, {$set:{hidden:'true'}}, (error,docs) => {
        if (error) {
            console.log(error);
            process.exit(1);
        }
        console.log("<--------Actualización--------->");
        console.log(docs);
        process.exit(0);
    });
}
module.exports.update = update;

function remove (id) {
    Article.findByIdAndRemove ({_id:id}, (error,docs) => {
        if (error){
            console.log(error);
            process.exit(1);
        }
        console.log(docs);
        process.exit(0);
    });
}
module.exports.remove = remove;