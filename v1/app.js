var express         = require("express");
var bodyparser      = require("body-parser");
var app             = express();
var port            = 3000;
var mongoose        = require("mongoose");
var Campground = require("./models/campground");
var passport = require("passport")
var LocalStrategy = require("passport-local")
var User = require("./models/user")
var passportLocalMongoose = require("passport-local-mongoose");

// var Comments = require("./models/comments")
var seedDB= require("./seeds");
var Comment = require("./models/comment");

app.use(bodyparser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost:27017/image", {useUnifiedTopology: true,useNewUrlParser: true,}).then(() => console.log('DB Connected!'))
.catch(err => {console.log("error");});
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
console.log(__dirname);
seedDB();
//passport congit

app.use(require("express-session")({
    secret:"Toxxy is best!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", function (req, res) {
   
    res.render("landing");
});

app.get("/campgrounds",function(req,res){

    Campground.find({},function(err,allcampgrounds){
        if(err){
            console.log(err);}
            else{
                res.render("campgrounds/index",{campground:allcampgrounds});
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
    res.render("campgrounds/new")
});

app.get('/campgrounds/:id', function(req, res)  {
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log("id description page error");
        } else{
            console.log(foundCampground);
            res.render("campgrounds/show",{campground: foundCampground});
        }
    });
     
});
//----------------comments---------------------------------------

app.get("/campgrounds/:id/comments/new",function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log("error to load comment")
        }else{
            res.render("comments/new",{campground: campground});
        }
    })
    
})

app.post("/campgrounds/:id/comments",function(req,res)
{
    //lookup using id
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            console.log(req.body.comment);
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                }else{
                    campground.comments.push(comment);
                    campground.save();
                     res.redirect('/campgrounds/' + campground._id);
                }
            });
                //create new comment
                //connect new comm to post
                //redirect campground show page
        }
    });

});

//auth routes
app.get("/register",function(req,res){
    res.render("register");
});
//handle sighnup logic
app.post('/register', function(req, res){
    var newUser= new User({username: req.body.username});
 User.register(newUser,req.body.password,function(err,user){
     if(err){
         console.log(err);
         return res.render("register")
     }
     passport.authenticate("local")(req,res,function(){
          res.redirect('/campgrounds');
     })
 })
    
});




app.listen(port, () => console.log(`Connected! URL-  http://localhost:${port}`));