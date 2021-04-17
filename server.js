const express = require('express');
const app = express();
const mongoose = require('mongoose');


const methodOverride = require('method-override');
const cors = require('cors');
const port = process.env.PORT ||5000;

const db = require('./config/db');


// Database cnnection
mongoose.connect(db.URI, {useNewUrlParser:true, useUnifiedTopology:true})
.then((res)=>{
    console.log(`:::::::::: Connected to MONGODB :::::::::::`);
})
.catch((err)=>{
    console.log(err);
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(methodOverride());


//Headers
app.use( (req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();

});


require('./routes')(app);


app.listen(port, '0.0.0.0', ()=>{
    console.log(` Server on Port ${port}`);
});