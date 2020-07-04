const express = require('express');
const mongoose = require('mongoose');
const Userloc = require('./models/userloc');
require('dotenv').config();

const app = express ();

const dbURI = 'mongodb://'+process.env.API_KEY+'@project-1-shard-00-00-ea9wt.mongodb.net:27017,project-1-shard-00-01-ea9wt.mongodb.net:27017,project-1-shard-00-02-ea9wt.mongodb.net:27017/project1?ssl=true&replicaSet=project-1-shard-0&authSource=admin&retryWrites=true&w=majority'
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
.then(result=>{
    
    console.log('Deepak Database is connected...')
})


app.listen(process.env.PORT||3000);

app.set('view engine','ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

app.get('/', (req,res)=>{
    Userloc.find().sort({createdAt:-1})
    .then(result=>res.render('index',{userlocs:result}))
    .catch(err=>console.log(err))
})


app.post('/location/',( req , res )=>{
    console.log(req.query);
    new Userloc(req.query).save()
    .then(result=>res.json({redirect:"/"}))
    .catch(err=>{
        console.log(err)
    })
})

app.delete('/delete/:id',( req , res )=>{
    const id= req.params.id;
    Userloc.findByIdAndDelete(id)
    .then(result=> res.json({redirect:'/'}))
    .catch(err=>{
        console.log(err);
    })
})