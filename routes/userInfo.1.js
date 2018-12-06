var express=require('express');
var router = express.Router();
var mongoose=require('mongoose');
var User=require('./../modules/users');
//连接mongodb数据库
mongoose.connect('mongodb://127.0.0.1:27017/wecourse');
mongoose.connection.on('connected',function(){
    console.log('mongodb connected success')
});
mongoose.connection.on('error',function(){
    console.log('mongodb connected error')
});

mongoose.connection.on('disconnected',function(){
    console.log('mongodb disconnected')
});

router.get('/',function(req,res,next){
    //res.send('hello,')
    
    User.find({},function(err,doc){
        console.log(doc.length)
        if(err){
            res.json({
                status:'1',
                msg:err.message
            })
        }else{
            res.json({
                status:'0',
                msg:'',
                result:{
                    count:doc.length,
                    user:doc
                }
            })
        }

    })
    

    
});

module.exports = router;