const { PostModel } = require('../models');
var ObjectID = require('mongodb').ObjectID;


const postController = {


    /*
     :::: ADD post ::::
    */
     add(req, res, next){ 
        const post = new PostModel(req.body);
        console.log(req.body);
        post.save(function(err, data){
            if (err) {
                res.json({msg : 'Failed!'});
            } else {
                res.json({msg : 'Created Successfully!', data : data});
            }
        })
    },

    /*
     :::: READ post ::::
    */
    async index(req, res){
        const posts = await PostModel.find((err, data)=>{
            if(err) {
                res.json({msg : 'Failed!'});
            } else {
                res.send(data);
            }
        });
    },

    /*
     :::: SEARCH post ::::
    */
     async search(req, res){
        var string = req.params.string;
        const posts = await PostModel.find({"$or": [ { "title" : { $regex: string }}, { "content" : { $regex: string }}]},(err, data)=>{
            if(err) {
                res.json({msg : 'Failed!'});
            } else {
                res.send(data);
            }
        });
    },

    /*
     :::: update post ::::
    */
     async update(req, res){
         const record = {
             id : req.body.id,
             email : req.body.email,
             postname : req.body.postname,
             password : req.body.password

         }
        const posts = await PostModel.updateOne({"_id": ObjectID(record.id)},
            {$set:{
                title: record.title,
                imageURL : record.imageURL,
                content : record.content
            }},(err, data)=>{
            if(err) {
                res.json({msg : 'Failed!'});
            } else {
                res.send(data);
            }
        });
    },

    /*
     :::: DELETE post ::::
    */
     async delete(req, res){
        const posts = await PostModel.deleteOne({"_id": ObjectID(req.params.id)},(err, data)=>{
            if(data.deletedCount <1 ) {
                res.json({msg : 'Failed!'});
            } else {
                res.send(data);
            }
        });
    }

}



module.exports = postController;

