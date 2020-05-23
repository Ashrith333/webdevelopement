

var mongoose = require("mongoose");
 
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});
 
module.exports = mongoose.model("Campground", campgroundSchema);

// var Campground= mongoose.model("Campground",campgroundSchema);
// for editing data base
//  Campground.r({name:"Pug"
//    , image: "https://images.pexels.com/photos/374906/pexels-photo-374906.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
//    description :"cute and playful"},function(err,image){
//    if(err){
//        console.log("error");
//    }else{
//        console.log("Image stored in data base");
//    }});
