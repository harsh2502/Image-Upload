const express=require('express');
const app=express();
const path=require('path');
const bodyParser=require('body-parser');

//Specific to this
const multer = require('multer')
const {storage}= require('../Image Upload/Cloudinary/cloud')
const upload=multer({storage })

//.env
require('dotenv').config();

//Setting Up Body Parsers
app.use(bodyParser.urlencoded({
  extended:true
}))
app.use(bodyParser.json());

//View Engine EJS
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//Routes

//@desc GET Home Page
//@path /
app.get('/',(req,res)=>
  res.render('home'))

//Specific to this
//@desc POST Home Page(To add a New Image)
//@path /
//Add upload.single('image') middleware for multer to parse the file and then Cloudinary will take care of it
app.post('/',(upload.single('image')),(req,res)=>{
  res.send(req.file)
})


//Server is listening on Port 5000
app.listen(5000,()=>console.log("Server Up and Running"));