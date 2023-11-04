import express from "express"
import {dirname} from "path"
import { fileURLToPath} from "url";
import bodyParser  from "body-parser";
import bcrypt from "bcryptjs"

const __dirname= dirname(fileURLToPath(import.meta.url));


const app=express();
const port=3000;

app.use(bodyParser.urlencoded({extended:true}));
var userIsAuthorised= false;

function passwordCheck(req,res,next){
    const password=req.body["password"];
    if (password === "Lucky"){
        userIsAuthorised =true;
    }
    next();
}
app.use(passwordCheck);

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/index.ejs");
})

app.post("/submit", (req,res)=>{
    if (userIsAuthorised){
        res.sendFile(__dirname + "/secure.ejs")
    }
    else{
        res.sendFile(__dirname + "/index.html")
    }
});

app.listen(port,()=>{
    console.log(`server is running on the port ${port}.`);
})