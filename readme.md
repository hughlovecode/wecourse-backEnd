##   简介
  
  本项目是大创服务端代码,在运行前,请保证已具有node,mongodb环境,已经安装pm2,npm等工具,配合小程序和web前端代码使用,请保证mongodb有对应的合适的集合


##  结果
	
	启动之后,小程序和web后台管理能正常使用

###  web使用
	 1.启动mongodb
	 2.进入项目目录
	 3.npm install
	 4.pm2 start bin/www

##	tips
	1.为了便于开发,代码没做脱敏处理,代码中可能带有mongdb的密码,小程序和bmob的token值,sftp配置中携带有服务器的密码,请不要随意传播
	2.服务器调试,可以输入pm2 logs www, 查看对应交互信息
	3.由于不支持热更新,每次修改了server代码,必须重启生效

##  联系
	有问题请联系邮箱1010502449@qq.com

