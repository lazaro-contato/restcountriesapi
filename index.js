// Express //
const express = require("express");
const app = express();

// Body Parser //
const bodyParser = require("body-parser");



app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json())

app.use(express.static("public"));
app.use(express.static(__dirname));



app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")

})


app.listen(3000, function(){
    console.log("Server running")
})