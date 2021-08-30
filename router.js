const { response } = require('express');
const express =require('express');
const router=express.Router();
const InfoSchema=require('./schema/schema')

router.get('/',(req,res)=>{
    res.json('i am form router file')
})

router.get('/Dash',(req,res)=>{
    res.json('i am form Dash')
})

//create User : ReNO,Name,Degree,Course
router.post('/Create',async(req,res)=>{
    console.log(req.body);
    var findData= await InfoSchema.find({'RegNo':req.body.RegNo});
    if(findData.length===0){
        var data=new InfoSchema({
            RegNo:req.body.RegNo,
            Name:req.body.Name,
            Degree:req.body.Degree,
            Course:req.body.Course,
            DOB:req.body.DOB,
            Password:req.body.Password
                    })  
        await data.save();
        res.json({
            OldUser:false
        })
    

    }else{
        return res.json({
            OldUser:true
        });
    }

})

//List all student
router.get('/list',async(req,res)=>{
    var findData= await InfoSchema.find({},{"Password":0,"Books":0});
        res.json(findData);
        res.json('this is list view');
    })

//User Info by RegNo
router.get('/UserInfo/:RegNo',async(req,res)=>{
var findData= await InfoSchema.find({RegNo:req.params.RegNo},{"Password":0});
    res.json(findData);
    res.json('this is list view');
})

//Update by RegNO by parems
router.put('/Update/:RegNo',async(req,res)=>{
    console.log(req.body)
    var update= await InfoSchema.update({RegNo:req.params.RegNo},{$set:{
        RegNo:req.body.RegNo,
        Name:req.body.Name,
        Degree:req.body.Degree,
        Course:req.body.Course,
        DOB:req.body.DOB,
    }});
    res.json(update);
})

//Forget Passord by admin by RegNO by parems
router.put('/ForgetPassword/:RegNo',async(req,res)=>{
    console.log(req.body)
    var update= await InfoSchema.update({RegNo:req.params.RegNo},{$set:{
       Password:req.body.Password,
    }});
    res.json(update);
})

//Delete by RegNo by params
router.delete("/delete/:RegNo",async(req,res)=>{
    var delData= await InfoSchema.remove({RegNo:req.params.RegNo});
    res.json({message:'deleted successfully !'});
});

//Book Handle
//Add BOOK By RegNO by params
router.put('/AddBooks/:RegNo',async(req,res)=>{
    console.log(req.body)
    var AddBook= await InfoSchema.findOneAndUpdate({RegNo:req.params.RegNo},{$push:{Books:{
        BookName:req.body.Books[0].BookName,
        BookId:req.body.Books[0].BookId,
        Status:req.body.Books[0].Status,
        TakeOver:req.body.Books[0].TakeOver,
        HandOver:req.body.Books[0].HandOver,
    }}});
    res.json(AddBook);
})

//User book Info by RegNo
router.get('/BookInfo/:RegNo',async(req,res)=>{
    var findData= await InfoSchema.find({RegNo:req.params.RegNo},{"Books":1,"RegNo":1,"_id":1});
        res.json(findData);
        res.json('this is list view');
    })

//Update BOOK by Book ID by params
router.put('/UpdateBooks',async(req,res)=>{
    console.log(req.body)
    var UpdateBook= await InfoSchema.update({RegNo:req.body.RegNo},{$set:{'Books.$[b]':{
        Status:req.body.Status,
        _id:req.body._id,
        BookName:req.body.BookName,
        BookId:req.body.BookId,
        TakeOver:req.body.TakeOver,
        HandOver:req.body.HandOver,
    }}},{arrayFilters:[{'b._id':req.body._id}]});
    console.log(req.body);
    res.json(UpdateBook);
});

//Clear Books by RegNO  by params
router.put('/ClearBookHistory/:RegNo',async(req,res)=>{
    var update= await InfoSchema.update({RegNo:req.params.RegNo},{$unset:{Books:[]}});
    res.json(update);
})



module.exports=router;

//create : ReNO,Name,Degree,Course
//get by RegNo b params
//Update by RegNO by parems
//Delete by _id by params
//Book Handle
//Add BOOK By RegNO by params
//Update BOOK by RegNo,Book ID by params
//Clear Books by RegNO  by params
