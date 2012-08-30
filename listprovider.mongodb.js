var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

ListProvider = function(host, port) {
    this.db = new Db('everylist', new Server(host, port, {auto_reconnect: true}, {}));
    this.db.open(function(){});
};

ListProvider.prototype.getCollection = function(callback) {
    this.db.collection('list', function(error, colList) {
        if (error) 
            callback(error);
        else 
            callback(null, colList);
    });
};

ListProvider.prototype.GetOwners = function (callback) {
    this.getCollection(function(error, colList) {
        if (error) 
            callback (error);
        else {
            colList.distinct("owner", function(error, result) {
                if (error)
                    callback (error);
                else {
                    callback (null, result);
                }
            });
        }
    });
};

ListProvider.prototype.GetLists = function (owner, callback) {
    this.getCollection(function(error, colList) {
        if (error) 
            callback (error);
        else {
            colList.find({"owner" : owner}, {"title" : 1}).toArray(function(error, results) {
              if (error) 
                  callback(error);
              else 
                  callback(null, results);
            });
        }
    });
};

ListProvider.prototype.GetList = function (owner, title, callback) {
    this.getCollection(function(error, colList) {
        if (error) 
            callback (error);
        else {
            colList.find({"owner" : owner, "title" : title}).toArray(function(error, results) {
              if (error) 
                  callback(error);
              else 
                  callback(null, results);
            });
        }
    });
};



/*
ListProvider.prototype.addCommentToArticle = function(articleId, comment, callback) {
  this.getCollection(function(error, article_collection) {
    if( error ) callback( error );
    else {
      article_collection.update(
        {_id: article_collection.db.bson_serializer.ObjectID.createFromHexString(articleId)},
        {"$push": {comments: comment}},
        function(error, article){
          if( error ) callback(error);
          else callback(null, article)
        });
    }
  });
};

//getCollection


//findAll
ListProvider.prototype.findAll = function(callback) {
    this.getCollection(function(error, article_collection) {
      if( error ) callback(error)
      else {
        article_collection.find().toArray(function(error, results) {
          if( error ) callback(error)
          else callback(null, results)
        });
      }
    });
};

//findById

ListProvider.prototype.findById = function(id, callback) {
    this.getCollection(function(error, article_collection) {
      if( error ) callback(error)
      else {
        article_collection.findOne({_id: article_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result) {
          if( error ) callback(error)
          else callback(null, result)
        });
      }
    });
};

//save
ListProvider.prototype.save = function(articles, callback) {
    this.getCollection(function(error, article_collection) {
      if( error ) callback(error)
      else {
        if( typeof(articles.length)=="undefined")
          articles = [articles];

        for( var i =0;i< articles.length;i++ ) {
          article = articles[i];
          article.created_at = new Date();
          if( article.comments === undefined ) article.comments = [];
          for(var j =0;j< article.comments.length; j++) {
            article.comments[j].created_at = new Date();
          }
        }

        article_collection.insert(articles, function() {
          callback(null, articles);
        });
      }
    });
};

*/

exports.ListProvider = ListProvider;
