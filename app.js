var express = require("express");
var bodyparser= require("body-parser");
var app = express();
var port = 3000;
app.use(bodyparser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var campground=[
    {name:"sam1",  image:"https://homepages.cae.wisc.edu/~ece533/images/girl.png"}
    ,{name:"sam2", image:"https://homepages.cae.wisc.edu/~ece533/images/girl.png"}
    ,{name:"sam3", image:"https://homepages.cae.wisc.edu/~ece533/images/girl.png"}      
];


app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds",function(req,res){

res.render("campground",{campground:campground});
})

app.post("/campgrounds",function(req,res){
       var name = req.body.name;
        var image =req.body.image;
        var nuewcampground= {
            name : name , image : image
        };
        campground.push(nuewcampground);
        res.redirect("/campgrounds");
});
app.get("/campgrounds/new",function(req,res){
    res.render("new")
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));