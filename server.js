const fs = require("fs");
const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res)=>{
    res.render("index.ejs");
});


app.get("/files", (req, res)=>{

    let path = req.query.path;
    
    fileList = [];


    if(path == "" || path == null){
        res.render("files.ejs", {path : path, data : [], err : "not a valid directory"})
    }
    else{
        try{
            fileList = fs.readdirSync(path)
        }
        catch(err){
            console.log("cannot find the directory");
            res.render("files.ejs", {path : path, data : [], err : "not a valid directory"});
            return;
        }
    }

    try{
        res.render("files.ejs", {path : path, data : fileList, err : ""});
    }
    catch(err){
        console.log("ERROR in /files route");
    }
});

app.get("/download", (req, res)=>{
    let filePath = req.query.path;

    res.download(filePath);

})

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
});