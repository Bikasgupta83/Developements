const express = require('express');
const app = express();
const userRouter = require('./userRoutes');
const port = 8080;

app.use('/users', userRouter);

app.listen(port, (req,res)=>{
    console.log(`App listening at port no ${port}`);
})