const express = require("express");
const https = require("https");

const app = express();
app.use(express.urlencoded({extended: true}));

app.get("/", function(req, res){

});

app.post("/", function(req, res){

});

app.put("/", function(req, res){

});

app.patch("/", function(req, res){

});

app.delete("/", function(req, res){

});



app.listen(3000, function(){
    console.log("Server is now running on port 3001");
})