const express= require("express");
const app=express();

const request= require("request");
const bodyParser= require("body-parser");
const dateDay= require(__dirname+"/date.js");

console.log(dateDay.getDate());
var items= [];
// const ejs= require("ejs");

//using  ejs

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("view engine", "ejs");
 

//rendering list

app.get("/", function(req, res){
    // res.sendFile(__dirname+"/index.html");
    let getDay=dateDay.getDate();
    console.log(getDay)
    // if (today.getDay() ===5||today.getDay() ===0){
    //     res.send("Yay it's the weekend");
    // } else{
    //     res.write("<p>line1</p>");
    //     res.write("<p>line1</p>");
    //     res.send("bro! I have to work");
    // }

    /// ejs render list

    const days_of_the_week= ['Sunday','Monday','Tuesday','Wednesday', 'Thursday', 'Friday', 'Saturday'];
    res.render('list',{kindOfDay:getDay, newListItems:items});
});

app.get("/stagging", function(req, res){
    res.sendFile(__dirname+"/index.html");
    var today= new Date();
    console.log(today.getDay());
    // if (today.getDay() ===5||today.getDay() ===0){
    //     res.send("Yay it's the weekend");
    // } else{
    //     res.write("<p>line1</p>");
    //     res.write("<p>line1</p>");
    //     res.send("bro! I have to work");
    // }
    

});

app.get("/ping",function(req,res){
    res.json("{'Name':'Swathy R'}");
});

app.post("/", function(req,res){
    console.log(req.body);
    
    var item= req.body.newListItem;
    console.log(item);
    items.push(item);
    console.log(items);

    res.redirect("/")


});

app.listen(3000,function(){
    console.log("Server started at 3000 press ctrl+c to quit....");
});