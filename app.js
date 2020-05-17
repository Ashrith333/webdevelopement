var express         = require("express");
var bodyparser      = require("body-parser");
var app             = express();
var port            = 3000;
var mongoose        = require("mongoose");


app.use(bodyparser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost:27017/image", {useUnifiedTopology: true,useNewUrlParser: true,}).then(() => console.log('DB Connected!'))
.catch(err => {console.log("error");});
app.set("view engine", "ejs");






var campgroundSchema= new mongoose.Schema({
    name: String, image :String, description: String
});

var Campground= mongoose.model("Campground",campgroundSchema);
// for editing data base
//  Campground.r({name:"Pug"
//    , image: "https://images.pexels.com/photos/374906/pexels-photo-374906.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
//    description :"cute and playful"},function(err,image){
//    if(err){
//        console.log("error");
//    }else{
//        console.log("Image stored in data base");
//    }});


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
})

app.get('/campgrounds/:id', (req, res) => {
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            console.log("id description page error")
        } else{
            res.render("show",{campground: foundCampground});
        }
    })
    
    
});

app.listen(port, () => console.log(`Connected! URL-  http://localhost:${port}`));