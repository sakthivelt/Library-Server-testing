console.clear();
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const router=express.Router();
const morgan=require('morgan')
const cors=require('cors');

const hostname='0.0.0.0';
const port=5000;

//MiddleWare
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
//Router
const infoRouter=require('./router');
app.use('/',infoRouter);


//listen port
app.listen(port,hostname,()=>{
    console.log('server starten ')
})


//Db connetion
const uri="mongodb+srv://admin:admin@cluster0.5i0ru.mongodb.net/LibraryManagement?retryWrites=true&w=majority"
const local='mongodb://localhost/Library'
mongoose.connect(local,{ useNewUrlParser: true, useUnifiedTopology: true },(error)=>{
    if(!error) console.log('db connected !!')
})