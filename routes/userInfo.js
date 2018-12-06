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
        //console.log(doc.length)
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
router.post('/login',function(req,res,next){
    let params={
        userName:req.body.userName,
        password:req.body.password
    }
    User.findOne(params,function(err,doc){
        
        if(err){
            res.json({
                status:'1',
                msg:err.message
            })
        }else{
            console.log(params.userName,params.password)
            if(doc){
                //console.log(doc)
                res.cookie('userId',doc.userId,{
                    path:'/',
                    maxAge:1000*60*60
                });

                res.json({
                    status:'0',
                    msg:'',
                    result:{
                        count:doc.length,
                        userInfo:doc
                    }
                })

            }else{
                res.json({
                    status:'2',
                    msg:'未找到',
                    result:[]
                })
            }
        }
    })
})
router.post('/info',function(req,res,next){
    let params={
        userId:req.body.userId
    }
    User.findOne(params,function(err,doc){
        if(err){
            res.json({
                status:'1',
                msg:err.message
            })
        }else{
            console.log('/info')
            if(doc){
                res.json({
                    status:'0',
                    msg:'',
                    result:{
                        count:doc.length,
                        info:doc
                    }
                })
            }else{
                res.json({
                    status:'2',
                    msg:'没有返回值'
                })
            }
        }
    })
})
router.post('/modify',function(req,res,next){
    let params={
        userId:req.body.userId
    }

    User.findOne(params,function(err,doc){
        if(err){
            res.json({
                status:'1',
                msg:err.message
            })
        }else{
            console.log('/userInfo/modify');
            if(doc){
                if(req.body.email){
                    doc.email=req.body.email
                }
                if(req.body.userName){
                    doc.userName=req.body.userName
                }
                res.json({
                    status:'0',
                    msg:''
                })
                doc.save()
            }else{
                res.json({
                    status:'2',
                    msg:'在数据库中找不到该项'
                })
            }
        }
    })
})

module.exports = router;