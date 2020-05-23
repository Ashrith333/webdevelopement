var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");
var data = [
    {
         name:"Dashhound "
        ,image: "https://images.pexels.com/photos/257519/pexels-photo-257519.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        ,description: "1yoyoyoyoyoyoyoyoyo"
    },
    {
        name:"husky "
       ,image: "https://images.pexels.com/photos/247937/pexels-photo-247937.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
       ,description: "2yoyoyoyoyoyoyoyoyo"
   },
   {
    name:"Pug "
   ,image: "https://images.pexels.com/photos/374906/pexels-photo-374906.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
   ,description: "3 yoyoyoyoyoyoyoyoyo"
    }
];
 
function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text: "Cuti4eee",
                                author: "Ashr"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;



// my code
// var mongoose = require("mongoose");

// var Campground=require("./models/campground");
// var Comment = require("./models/comment");
// var data = [
//     {
//          name:"Dashhound "
//         ,image: "https://images.pexels.com/photos/257519/pexels-photo-257519.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
//         ,description: "1yoyoyoyoyoyoyoyoyo"
//     },
//     {
//         name:"husky "
//        ,image: "https://images.pexels.com/photos/247937/pexels-photo-247937.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
//        ,description: "2yoyoyoyoyoyoyoyoyo"
//    },
//    {
//     name:"Pug "
//    ,image: "https://images.pexels.com/photos/374906/pexels-photo-374906.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
//    ,description: "3 yoyoyoyoyoyoyoyoyo"
//     }
// ];
// var comment= {
//     text:"hey this is comment!!",
//     author: "Ash"
// };
// function seedDB()
// {
//     //remove campgrounds
//     Campground.remove({},function(err)
//     {
//         if(err)
//         {
//             console.log(err);
//         }
//         console.log("removed");
//             //add
//         data.forEach(function(seed){
//             Campground.create(seed,function(err,data){
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     console.log("added data");
//                     //create coom
//                     Comment.create(
//                     {
//                         text: "This place is great, but I wish there was internet",
//                         author: "Homer"
//                     }, function(err, comment){
//                         if(err){
//                             console.log(err);
//                         } else {
//                             data.comments.push(comment);
//                             data.save();
//                             console.log("Created new comment");
//                         }
//                     });
//                 }
//             });
//         }) ;
//     });
// }
// module.exports=seedDB;
