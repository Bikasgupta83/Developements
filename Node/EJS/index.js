const express = require("express");
const app = express();
const path = require("path");

const port = 8080;

app.use(express.static(path.join(__dirname,"public/css")))
app.use(express.static(path.join(__dirname,"public/js")));

app.set("view engine","ejs");
app.set("views", path.join(__dirname, "./views"));

app.get('/',(req,res)=>{
    // res.send("This is Home page");

    //In Ejs
    let items = ["apple","ball","cat"]
    let a = 1,b = 2;
    res.render("home",{a:a, b:b, items:items})
})

app.get('/ig/:username',(req,res)=>{
    const { username } = req.params;
    const instaData = require("./views/data.json");
    const data = instaData[username];
    
    if(data){
        res.render("instagram.ejs", { data })
    }else{
        res.render("error.ejs");
    }
})
app.listen(port, (req,res)=>{
    console.log(`App listing on port ${port}`)
})
