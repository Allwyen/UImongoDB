const Express = require("express");

var bodyParser = require('body-parser');

var app = new Express();

app.set('view engine','ejs'); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.render('index');
}); 

app.post('/read',(req,res)=>{
    //var items=req.body;
    //res.render('read',{item:items});
    res.send(req.body);
});

app.listen(process.env.PORT || 3456,()=>{
    console.log("Server running on port::3456...");
});  //we can assign any number.3000 is commonly used.