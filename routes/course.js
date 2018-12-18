var express=require('express');
var router = express.Router();
var Course=require('./../modules/courses');
var User=require('./../modules/users');
//列表接口
router.post('/',function(req,res,next){
    //res.send('hello,')
    let params={
        userId:req.body.userId
    }
    User.findOne(params,function(err,doc){
        //console.log(doc.length)
        if(err){
            res.json({
                status:'1',
                msg:err.message
            })
        }else{
            if(doc){
                let list=[];
                let arr=doc.courseList;
            arr.map((item)=>{
                let temp={
                    courseId:item.courseId,
                    courseSN:item.courseSN,
                    courseName:item.courseName,
                    courseInfo:item.courseInfo
                }
                list.push(temp)
            })
            res.json({
                status:'0',
                msg:'',
                result:{
                    count:doc.length,
                    courselist:list
                }
            })
        }else{
            res.json({
                status:'2',
                msg:err.message
            })
        }
        }

    })    
});
//详情接口
router.post('/detail',function(req,res,next){
    //res.send('hello,')
    let params={
        courseId:req.body.courseId,
        courseSN:req.body.courseSN
    }
    
    Course.findOne(params,function(err,doc){
        //console.log(doc.length)
        if(err){
            res.json({
                status:'1',
                msg:err.message
            })
        }else{
            
            if(doc){
                //console.log(doc)
                res.json({
                status:'0',
                msg:'',
                result:{
                    count:doc.length,
                    courseDetail:doc
                }
            })
            }else{
                res.json({
                    status:'2',
                    msg:''
                })
            }
        }

    })    
});
//修改课程信息的接口
router.post('/detail/modify',function(req,res,next){
    let params={
        courseId:'305098',
        courseSN:'002'
    }
    Course.findOne(params,function(err,doc){
        if(err){
            res.json({
                status:'1',
                msg:err.message
            })
        }else{
            if(doc){
                if(req.body.courseName){
                    doc.courseName=req.body.courseName
                }
                if(req.body.courseInfo){
                    doc.courseName=req.body.courseInfo
                }
                doc.save()
                res.json({
                    status:'0',
                    msg:''
                })

            }else{
                res.json({
                    status:'2',
                    msg:'找不到你准备修改的课程'
                })
            }
        }
    })
})
//删除课程信息的接口
router.post('/detail/delete',function(req,res,next){
    //console.log('here')
    let params={
        courseId:'30400201',
        courseSN:'002'
    }
    Course.findOne(params,function(err,doc){
        if(err){
            res.json({
                status:'1',
                msg:err.message
            })
        }else{
            if(doc){
                Course.remove(params,function(err,res){
                    console.log('已经删除了')
                })
                res.json({
                        status:'0',
                        msg:'已经删除了这门课'
                    })

            }else{
                res.json({
                    status:'2',
                    msg:'没有找到这门课'
                })
            }
        }
    })
})
//添加课程接口
router.post('/addCourse',function(req,res,next){
    let params={
        courseId:'30400301',
        courseSN:'200',
        courseName: "math",
        teacherId: "004",
        teacherName: "wenhonghao",
        courseSSID: "43994399",
        classCount: "0",
        HContent: "",
        HTime: "",
        classAddress: "综合楼C203",
        status: "0",
        HTitle: "",
        students:[]
    }
    let index={
        courseId:'30400301',
        courseSN:'200'
    }
    Course.findOne(index,function(err,doc){
        if(err){
            res.json({
                status:'1',
                msg:err.message
            })
        }else{
            if(doc){
                res.json({
                    status:'2',
                    msg:'',
                    result:'同课程号和课序号的课程已经存在在课表中了,请更换后添加'
                })

            }else{
                var newcourse=new Course(params)
                newcourse.save(function(err,result){
                    if(err){
                        res.json({
                            status:'3',
                            msg:'录入过程中出错'
                        })
                    }else{
                        res.json({
                            status:'0',
                            msg:'成功'
                        })
                    }
                })

            }
        }
    })
})
//添加学生接口
router.get('/addStudent',function(req,res,next){
    let index={
        courseId:req.body.courseId,
        courseSN:req.body.courseSN,
    }
    let newStudent={
                    studentId:req.body.studentId,
                    studentName:req.body.studentName,
                    studentImg:'',
                    signInCount:[]
                }
    Course.findOne(index,function(err,doc){
        if(err){
            res.json({
                status:'1',
                msg:err.message
            })
        }else{
            if(doc){
                let item=newStudent;
                doc.students.push(item)
                doc.save(function(err,result){
                    if(err){
                        res.json({
                            status:'2',
                            msg:'操作失败'
                        })
                    }else{
                        res.json({
                            status:'0',
                            msg:'成功了'
                        })
                    }
                })


            }else{
                res.json({
                    status:'2',
                    msg:'没有这门课程'
                })
            }
        }
    })
})

//删除学生接口
router.post('/deleteStudent',function(req,res,next){
    let index={
        courseId:'304509',
        courseSN:'001'
    }
    //let deleteItem=req.body.studentId;
    let deleteItem=10002;
    Course.findOne(index,function(err,doc){
        if(err){
            res.json({
                status:'1',
                msg:err.message
            })
        }else{
            if(doc.students.length>0){
                let list=doc.students;
                let itemIndex
                list.map((item,index)=>{
                    if(item.studentId===deleteItem){
                        itemIndex=index
                    }
                });
                list.splice(index,1)
                doc.save(function(err,result){
                    if(err){
                        res.json({
                            status:'2',
                            msg:'出错了,正在尽力抢修'
                        })
                    }else{
                        res.json({
                            status:'0',
                            msg:'成功了'
                        })
                    }
                })

            }else{
                res.json({
                    status:'2',
                    msg:'对不起哦,没有数据呢!'
                })
            }
        }
    })
})

//修改学生信息
router.post('/modifyStudent',function(req,res,next){
    let index={
        courseId:'304509',
        courseSN:'001'
    }
    let modifyItem={
        studentName:req.body.studentName,
        studentImg:req.body.studentImg
    }
    //let deleteItem=req.body.studentId;
    let deleteItem=10003;
    Course.findOne(index,function(err,doc){
        if(err){
            res.json({
                status:'1',
                msg:err.message
            })
        }else{
            if(doc.students.length>0){
                let list=doc.students;
                let itemIndex
                list.map((item,index)=>{
                    if(item.studentId===deleteItem){
                        itemIndex=index
                    }
                });
                list[index]=modifyItem
                doc.save(function(err,result){
                    if(err){
                        res.json({
                            status:'2',
                            msg:'出错了,正在尽力抢修'
                        })
                    }else{
                        res.json({
                            status:'0',
                            msg:'成功了'
                        })
                    }
                })

            }else{
                res.json({
                    status:'2',
                    msg:'对不起哦,没有数据呢!'
                })
            }
        }
    })

})














































module.exports = router;