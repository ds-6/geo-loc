const express = require('express');
const mongoose = require('mongoose');
const Userloc = require('./models/userloc');
const keys = require('./config');

const app = express ();

const dbURI = keys.dbKey;
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