const { AuthModel } = require('../models');
var ObjectID = require('mongodb').ObjectID;


const userController = {


    /*
     :::: ADD USERS ::::
    */
     add(req, res, next){ 
        const user = new AuthModel(req.body);
        console.log(req.body);
        user.save(function(err, data){
            if (err) {
                res.json({msg : 'Failed!'});
            } else {
                res.json({msg : 'Created Successfully!', data : data});
            }
        })
    },

    /*
     :::: AUTHENTICATE USER ::::
    */
    async login(req, res){
        var email = req.body.email;
        var password = req.body.password;
        const users = await AuthModel.find({ 'email' : email }).exec((err, data)=>{
            if(!data[0]) {
                res.json({msg : 'Failed!'});
                console.log(data);
            } else {
                // res.send(data);
                
                if(data[0].password === password){
                    res.send(data);
                    console.log(data);
                } else {
                    res.json({msg : 'Incorrect Password!!!'});
                }
            }
        });
    },


    /*
     :::: READ USER ::::
    */
     async index(req, res){
        const users = await AuthModel.find((err, data)=>{
            if(err) {
                res.json({msg : 'Failed!'});
            } else {
                res.send(data);
            }
        });
    },


    /*
     :::: READ USER ::::
    */
     async getProfile(req, res){

        const users = await AuthModel.find({ '_id' : req.params.id }).exec((err, data)=>{
            if(err) {
                res.json({msg : 'Failed!'});
            } else {
                res.send(data);
            }
        });
    },

    /*
     :::: SEARCH USER ::::
    */
     async search(req, res){
        var string = req.params.string;
        const users = await AuthModel.find({"$or": [ { "username" : { $regex: string }}, { "email" : { $regex: string }}]},(err, data)=>{
            if(err) {
                res.json({msg : 'Failed!'});
            } else {
                res.send(data);
            }
        });
    },

    /*
     :::: UPDATE USER ::::
    */
     async update(req, res){
         var record = {
             id : req.body[0]._id,
             email : req.body[0].email,
             username : req.body[0].username,
             password : req.body[0].password

         }
         console.log(record);
        const users = await AuthModel.updateOne({"_id": ObjectID(record.id)},
            {$set:{
                email: record.email,
                username : record.username,
                password : record.password
            }},(err, data)=>{
            if(err) {
                res.json({msg : 'Failed!'});
            } else {
                res.send(data);
            }
        });
    },

    /*
     :::: DELETE USER ::::
    */
     async delete(req, res){
        const users = await AuthModel.deleteOne({"_id": ObjectID(req.params.id)},(err, data)=>{
            if(data.deletedCount <1 ) {
                console.log(data);
                res.json({msg : 'Failed!'});
            } else {
                res.send(data);
            }
        });
    }

}


module.exports = userController;