//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose= require("mongoose");
const _ = require("lodash");

const app = express();
const viewItems = [];

app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb+srv://admin-akshay:Test-123@cluster0.yr2s9.mongodb.net/todolistDB?retryWrites=true&w=majority", {useNewUrlParser: true});

const itemsSchema= {
  name: String
};

const Item= mongoose.model("item",itemsSchema);


const item1 = new Item({
  name:"Welcome to do your todo list"
});

const item2 = new Item({
  name:"Welcome to do your second  list"
});


const item3 = new Item({
  name:"Welcome to do your smart  list"
});

const defaultNames= [item1, item2, item3];

const listSchema ={
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

// Item.insertMany(defaultNames, function(err){
//   if(err){
//     console.log(err);
//   }
//   else{
//     console.log("added successfully");
//   }
// });

app.get("/", function(req, res) {
  
  Item.find({}, function (err, results){
    if(err){
      console.log(err);
    }
    else{      
      if(results.length===0){
          Item.insertMany(defaultNames, function(err){
            if(err){
              console.log(err);
            }
            else{
              console.log("added successfully");
            }
          });
          res.redirect("/");
        }
      else{
        res.render("list", {listTitle: "Today", newListItems: results});
      }  
    }
  });
});


app.get("/:customListname", function(req, res){
  
  const listName= _.capitalize(req.params.customListname);

  List.findOne({name:listName},function (err, foundListname){
    if(!err){
      if(!foundListname){
        const list = new List({
          name:listName,
          items:defaultNames
        });

        list.save();
        res.redirect("/"+listName);
      }
      else{
        res.render("list", {listTitle: foundListname.name, newListItems: foundListname.items});
      }
      
    }
  });



  
})

app.post("/", function(req, res){
  const itemName = req.body.newItem;
  const listName = req.body.list;

  console.log(req.body);
  const itemDocument= new Item({
    name: itemName
  });
  
  if(listName==="Today"){
    itemDocument.save();
    res.redirect("/");

  }
  else{
    List.findOne({name: listName}, function(err, foundList){
      foundList.items.push(itemDocument);
      foundList.save();
      res.redirect("/"+listName);
    });
  } 
});

app.post("/delete", function (req,res){
  
  const checkeditem= req.body.checkbox;
  const listName= req.body.listName;

  if(listName=== "Today"){
    Item.findByIdAndDelete(checkeditem, function(err){
      if(err){
        console.log("error while deleting"+checkeditem);
      }
      else{
        console.log("Deleted id:"+checkeditem);
      }
    });
    res.redirect("/");

  }
  else{
    console.log("listname befor:"+listName);
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkeditem}}}, function (err, foundList){
      if(!err){
        console.log("listname befor:"+listName);
        res.redirect("/"+listName);

      }
    });
    
  }

});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(process.env.PORT||3000, function() {
  console.log("Server started on port 3000");
});
