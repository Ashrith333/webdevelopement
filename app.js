var express = require("express");
var bodyparser= require("body-parser");
var app = express();
var port = 3000;
app.use(bodyparser());

app.set("view engine", "ejs");
app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/ash",function(req,res){
    var campground=[
        {name:"sam1", image:"https://homepages.cae.wisc.edu/~ece533/images/airplane.png"}
        ,{name:"sam2", image:"https://homepages.cae.wisc.edu/~ece533/images/airplane.png"}
        ,{name:"sam3", image:"https://homepages.cae.wisc.edu/~ece533/images/airplane.png"}      
]
res.render("ash");
})
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));