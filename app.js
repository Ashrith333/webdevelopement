var express         = require("express");
var bodyparser      = require("body-parser");
var app             = express();
var port            = 3000;
var mongoose        = require("mongoose");
var Campground = require("./models/campground");
// var Comments = require("./models/comments")
var seedDB= require("./seeds");

app.use(bodyparser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost:27017/image", {useUnifiedTopology: true,useNewUrlParser: true,}).then(() => console.log('DB Connected!'))
.catch(err => {console.log("error");});
app.set("view engine", "ejs");

seedDB();


app.get("/", function (req, res) {
   
    res.render("landing");
});

app.get("/campgrounds",function(req,res){

    Campground.find({},function(err,allcampgrounds){
        if(err){
            console.log(err);}
            else{
                res.render("index",{campground:allcampgrounds});
            }
        
    })
})

app.post("/campgrounds",function(req,res){
       var name = req.body.name;
        var image =req.body.image;
        var desc=req.body.description;
        var newcampground= {name : name , image : image, description:desc};
       Campground.create(newcampground,function(err,newlycreated){
           if(err){
               console.log("cant load new image");
           } else{
            res.redirect("/campgrounds");
           }
       })
        
});
app.get("/campgrounds/new",function(req,res){
    res.render("new")
});

app.get('/campgrounds/:id', function(req, res)  {
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log("id description page error");
        } else{
            console.log(foundCampground);
            res.render("show",{campground: foundCampground});
        }
    });
     
})

app.listen(port, () => console.log(`Connected! URL-  http://localhost:${port}`));