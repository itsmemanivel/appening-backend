var express = require('express');
var router = express.Router();
var { AuthController, PostController } = require('./controllers');



module.exports = (app) =>{


// users
    router.post('/auth/add', AuthController.add);
    router.post('/auth/login', AuthController.login);
    router.get('/auth/read', AuthController.index);
    router.get('/auth/profile/:id', AuthController.getProfile);
    router.post('/auth/update', AuthController.update);
    router.delete('/auth/delete/:id', AuthController.delete);
    router.get('/auth/search/:string', AuthController.search);


// posts
    router.post('/posts/add', PostController.add);
    router.get('/posts/read', PostController.index);
    router.delete('/posts/delete/:id', PostController.delete);
    router.get('/posts/search/:string', PostController.search);


    app.use('/api_v1', router);
    app.use('/',(req, res, next) =>{
        res.json({
            app: 'Appening',
            database : 'mongoDB',
            backend : "Nodejs",
            frontend : "Angular8",
            github : 'https://github.com/veluvj/appening'
        })
    })

}

