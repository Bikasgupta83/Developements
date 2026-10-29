const figlet = require("figlet")

figlet("Bikas Gupta",function(err,data){
    if(err){
        console.log(err)
        return;
    }
    console.log(data);
})