const express = require("express");
const app = express();
const port = 8080;


app.use(express.urlencoded({extended: true}))  // middleware for parse url only
app.use(express.json());  // middleware for pare json data only

app.get("/api/register",(req,res)=>{
    const {username,password} = req.query;
    res.send(`Standard Get Request, Welcome @${username}`);
})

app.post("/api/register",(req,res)=>{
    console.log(req.body);
    const {username,password} = req.body;
    res.send(`Standard Post Request, Welcome @${username}`);
})

app.listen(port,(req,res)=>{
    console.log(`App listing at port no ${port}`)
})