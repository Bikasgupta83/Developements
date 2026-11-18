const { randomUUID } = require("crypto");
const express = require("express");
const app = express();
const port = 8080;
const path = require("path")
const { v4 : uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({extended:true}));
app.use(express.json())

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'));

let posts = [
    {
        id: uuidv4(),
        username: "bikas",
        content: "Learning REST API"
    },
    {
        id: uuidv4(),
        username: "Aakash",
        content: "Preparing Merchant Navy",
    },
    {
        id: uuidv4(),
        username : "Ujala",
        content : "I'm Data Engineer",
    }
]

app.get("/posts",(req,res)=>{
    res.render("index.ejs", {posts})
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
    const { username,content } = req.body
    const id = uuidv4();
    posts.push({id,username,content})
    res.redirect("/posts")
})

app.get("/posts/:id",(req,res)=>{
    const { id } = req.params;
    const postFound = posts.find((post)=> post.id === id);
    res.render("show.ejs", {postFound})
})

app.get("/post/update/:id",(req,res)=>{
    const { id } = req.params;
    const postFound = posts.find((post)=> post.id === id);
    res.render("update.ejs", {postFound})
})

app.post("/post/update/:id", (req, res) => {
  const { id } = req.params;
  const newContent = req.body.content;

  const postFound = posts.find((post) => post.id === id);
  if (postFound) {
    postFound.content = newContent;
  }
  res.redirect("/posts");
});

app.delete("/post/delete/:id",(req,res)=>{
    const {id} = req.params;
    posts = posts.filter((post)=> post.id !== id);
    res.redirect('/posts')
})

app.listen(port,()=>{
    console.log(`App listing at port ${port}`)
})