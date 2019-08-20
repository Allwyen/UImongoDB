const Express = require("express");
const Mongoose = require('mongoose');

var request = require('request');
var bodyParser = require('body-parser');

var app = new Express();

app.set('view engine','ejs'); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

Mongoose.connect("mongodb://localhost:27017/collegedb");

const StudentModel= Mongoose.model("studentdetail",{
    uname:String,
    uroll:String,
    uadno:String,
    ucollege:String
});

app.get('/',(req,res)=>{
    res.render('index');
})

app.get('/addstudents',(req,res)=>{
    res.render('add');
}); 

app.post('/read',(req,res)=>{
    //var items=req.body;
    //res.render('read',{item:items});

    var student = new StudentModel(req.body);
    var result = student.save((error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send("<script>alert('Successfully Inserted')</script>");
        }
    });

});

app.get('/getdatas',(req,res)=>{

    var result = StudentModel.find((error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
    });
});

const APIurl = "http://localhost:3456/getdatas";

app.get('/viewstudents',(req,res)=>{

    request(APIurl,(error,response,body)=>{
        var data = JSON.parse(body);
        res.render('view',{data:data});
    });
});

app.get('/searchstudents',(req,res)=>{
    res.render('search');
});

app.get('/admissionno',(req,res)=>{
    var item = req.query.uadno;
    //console.log(item);
    var result = StudentModel.find({uadno:item},(error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
    })

});

const APIurl2 = "http://localhost:3456/admissionno";

app.post('/viewsinglestudent',(req,res)=>{

    var item = req.body.uadno;

    request(APIurl2+"/?uadno="+item,(error,response,body)=>{
        var data = JSON.parse(body);
        res.render('viewsingle',{data:data});
    })
})


app.listen(process.env.PORT || 3456,()=>{
    console.log("Server running on port::3456...");
});  //we can assign any number.3000 is commonly used.