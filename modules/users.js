var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var userSchame=new Schema({
    "userId":String ,
    "status":String,
    "userImg":String,
	"userName":String,
	"password":String,
	"email":String,
	"userPhone":String,
	"openId":String,
	"courseList":[
	{
		"courseName":String,
		"courseInfo":String,
		"courseId":String,
		"courseSN":String
	}		
	],

});

module.exports=mongoose.model('user',userSchame)