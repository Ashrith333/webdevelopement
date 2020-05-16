var mongoose = require("mongoose");

mongoose
.connect("mongodb://localhost:27017/test", {
useUnifiedTopology: true,
useNewUrlParser: true,
})
.then(() => console.log('DB Connected!'))
.catch(err => {
console.log("error");
});
var catSchema= new mongoose.Schema({
    name: String,age: Number,tempermanet :String
});
var Cat= mongoose.model("Cat",catSchema);

var ashcat = new Cat({
    name: "ash",
    age:11,
    tempermanet:"angry"
})
ashcat.save(function(err,ash){
if(err){
    console.log("error");
}else{
    console.log("cat to database");
    console.log(ash);
}
});