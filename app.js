//jshint esversion:6
require('dotenv').config()

const express=require('express');
const bodyParser=require('body-parser');
const ejs=require('ejs');
const encrypt=require('mongoose-encryption');

const app=express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');



//console.log(process.env.API_KEY); // to print the content in .env file






const mongoose = require('mongoose');

main().catch(err => console.log(err));                        // this entire code use to connect with database

async function main() {
 // await mongoose.connect('mongodb+srv://manish828132:Manish896@cluster0.9rnyuaf.mongodb.net/todolistDB');

  await mongoose.connect('mongodb://127.0.0.1:27017/userDB');

  
} 

const userSchema=new mongoose.Schema({  // we need to add new when we are going to use schema
    email:String,
    password:String

});
// const secret="thisisourlittlesecrete";  //this is our secret for level2 security

userSchema.plugin(encrypt,{secret:process.env.SECRET,encryptedFields: ['password']})

const User=new mongoose.model('userData',userSchema);



app.get("/",function(req,res){
    res.render("home");
});


app.get("/login",function(req,res){
    res.render("login");
});


app.get("/register",function(req,res){
    res.render("register");
});


app.post("/register",function(req,res){
    let newuser=new User({
        email:req.body.userName,
        password:req.body.password
    })

    //console.log(req.body.userName,req.body.password);

    newuser.save().then(()=>{
        res.render("secrets");
    }).catch((err)=>{
        console.log(err);
    })

})

app.post("/login",function(req,res){
    let email=req.body.username;
    let password=req.body.password;
    User.findOne({email:email} )
  .then((docs)=>{
   
      if((docs.password===password))
      {
            
        res.render("secrets");
      
      }

      else{
        console.log("error");
      }
  })
  .catch((err)=>{
      console.log(err);
  });
})





























app.listen(3000,function(){
    console.log("server started on port 3000");
});

