const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");
const mongoose =require("mongoose");
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html")
});
app.listen(process.env.PORT || 3000,function(req,res){
  console.log("server started on port 3000");
});
mongoose.connect("mongodb+srv://admin-subham:Subham123@cluster0.pemkw.mongodb.net/signupDb",{useNewUrlParser:true});
const signupSchema ={
Fname:String,
Lname:String,
Emailid:String
}
const Data = mongoose.model("Data",signupSchema);


app.post("/signup",function(req,res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = new Data({
    Fname:firstName,
    Lname:lastName,
    Emailid:email
  });
  data.save();
  res.sendFile(__dirname+"/signup.html")
});

app.post("/about",function(req,res){
  res.sendFile(__dirname+"/about.html")
});
app.post("/images",function(req,res){
  res.sendFile(__dirname+"/")
});
app.post("/signin",function(req,res){
  res.sendFile(__dirname+"/")
});

app.post("/contact",function(req,res){
  res.sendFile(__dirname+"/")
});
app.post("/mail",function(req,res){
  res.sendFile(__dirname+"/")
});

app.post("/",function(req, res){
  console.log(req.body.email)
  const fName = req.body.fName;
  const lName = req.body.lName;
  const email = req.body.email;
  const data = {
    members : [
      {
        email_address: email,
        status:"subscribed",
        merge_fields: {
          FNAME:fName,
          LNAME:lName
        }
      }
    ]
  };
  const dataset =JSON.stringify(data);
  const url = "https://us10.api.mailchimp.com/3.0/lists/0c25a7f4c8";
  const options = {
    method:"POST",
    auth:"Subham:628fb8c37fe598ac9214b4f5d616895f-us10"
  }
  const request= https.request(url,options,function(response){
    if(response.statusCode===200){
      res.sendFile(__dirname+"/success.html")
    }else{
      res.sendFile(__dirname+"/failure.html")
    }
    response.on("data",function(data){
      console.log(JSON.parse(data))
    })
  })
  request.write(dataset);
  request.end();
});
