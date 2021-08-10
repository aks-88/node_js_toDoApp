const express= require("express");
const app=express();

const request= require("request");
const bodyParser= require("body-parser");

app.get("/", function(req, res){
    res.send("hello");
});

app.listen(3000,function(){
    console.log("Server started at 3000 press ctrl+c to quit....");
});