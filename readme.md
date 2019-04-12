##   简介
  
  本项目是大创服务端代码,在运行前,请保证已具有node,mongodb环境,已经安装pm2,npm等工具,配合小程序和web前端代码使用,请保证mongodb有对应的合适的集合


##  结果
	
	启动之后,小程序和web后台管理能正常使用

###  web初次使用
	 1.启动mongodb
	 2.进入项目目录
	 3.npm install
	 4.pm2 start bin/www

###  非初次使用
	 1.启动mongodb:大创服务器上是cd /wecourse/mongodb/etc&&mongod --config mongo.conf --fork
	 2.进入项目目录,并启动服务:大创服务器上是cd /wecourse/server/bin&&pm2 start www ,即可开启服务器 

##	tips
	1.为了便于开发,代码没做脱敏处理,代码中可能带有mongdb的密码,小程序和bmob的token值,sftp配置中携带有服务器的密码,请不要随意传播
	2.服务器调试,可以输入pm2 logs www, 查看对应交互信息(前提是在代码中已做异常处理)
	3.由于不支持热更新,每次修改了server代码,必须重启生效,简单操作是pm2 stop all&&pm2 start /wecourse/server/bin/www
	4.如果你的ide配置了sftp,请关闭,以免污染服务器代码(由于我没做脱敏处理,上传的文件中携带有sftp配置信息)

##  联系
	有问题请联系邮箱1010502449@qq.com

