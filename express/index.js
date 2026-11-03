const express = require("express");
const app = express();
const cors = require('cors');
const port = 8080;


// MIDDLEWARE
app.use(cors());
app.use(express.json())

const usersData = [];

// SPECIFIC ROUTES
app.get('/', (req, res) => {
    res.send("Home Page");
});

app.get('/about', (req, res) => {
    res.send("About Us Page");
});

app.get('/contact', (req, res) => {
    res.send("Contact Page");
});


// DYNAMIC ROUTES
app.get('/user/:username', (req, res) => {
    const username = req.params.username;
    res.send(`Viewing profile of : ${username}`);
});

app.get('/book/:bookId/chapter/:chapterNumber',(req,res)=>{
    const {bookId, chapterNumber} = req.params;

    res.send(`Reading Book ID ${bookId}, Chapter ${chapterNumber}`);
})


app.get('/api/getAllData',(req,res)=>{
    if(usersData.length === 0){
        return res.status(200).json({
            success:true,
            message: "Array is Empty",
            data: []
        })
    }
    return res.status(200).json({
        message: "Data send Success",
        data: usersData
    })
})

app.post('/api/users', (req, res) => {
    const data = req.body;
    usersData.push(data);
    console.log(usersData); 
    res.status(201).json({
        message: "User created Successfully", 
        data: usersData
    });
});

app.put('/api/users/:idx',(req,res)=>{
    const idx = parseInt(req.params.idx);
    const updateData = req.body;

    if(idx < 0 || idx >= usersData.length || isNaN(idx) ){
        return res.status(404).json({
            success: false,
            message : "User index not found in system"
        })
    }
    
    usersData[idx] = (updateData);
    console.log("Updated userData Array", usersData);

    return res.status(200).json({
        success:true,
        message: "User updated successfully",
        data: usersData
    })
})


app.delete('/api/users/:id',(req,res)=>{
    const deleteIdx = parseInt(req.params.id);

    if(deleteIdx < 0 || isNaN(deleteIdx) || deleteIdx >= usersData.length){
        return res.status(404).json({
            success: false,
            message: "Index not found"
        })
    }

    usersData.splice(deleteIdx,1);
    console.log("User delete successfully", usersData);

    return res.status(200).json({
        message: "User deleted Successfull",
        data: usersData
    })
})


// WILDCARD / CATCH-ALL ROUTE (Must sit at the absolute bottom)
app.get('/*splat', (req, res) => {
    res.send(`
        <div style="display: flex; justify-content: center; align-items: center; min-height: 100vh; background-color: #f9f9f9; font-family: sans-serif;">
            <div style="border: 1px solid #000; padding: 20px; text-align: center; background: #fff; border-radius: 8px;">
                <h1 style="margin: 0; color: #333;">Page not found</h1>
            </div>
        </div>
    `);
});


// SERVER INITIALIZATION
app.listen(port, () => {
    console.log(`app listening at port ${port}`);
});
