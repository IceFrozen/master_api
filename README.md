# 角色定位

普通用户
	用户身份  
			1、超级管理员
			2、普通用户
			3、普通用户、管理员
	用户身份职能
			1、超级管理员功能 
				1、设置普通管理员
				2、设置普通用户为管理员
				3、移交某个用户给某个管理员
				4、开放某个功能给某个管理员
				5、超级管理员拥有所有管理员的权限，一旦设置的功能对用户，则是对全部用户都开放
			2、普通用户
				1、进行一系列逻辑
			3、普通用户、管理员
				1、管理员手下可以管理自己的用户
				2、管理员可以将自己的用户赠送给他人
1、需求
	- 界面改版，详情参见微信钱包的界面
2、底部栏目
	1、主页	-	微信钱包页
	2、消息	-	各种消息
	3、我  	-	用于显示自己的信息
	4、管理员 - 只有管理员才能看到

主页显示
--------------------------------

			滚筒屏幕

--------------------------------
功能
	1、纪录单选
	2、查看单选
	3、反馈问题
	4、邀请好友
--------------------------------

方框   方框  方框 	方框 	方框
--------------------------------
主页     消息    我    	管理员





流程
	1、当用户从公众号的链接或者是二维码链接登录道本系统。
		- 如果是第一次登录，则开通用户身份的user身份
			- 需要提醒用户完成身份信息的填写  
		- 如果不是第一次登录，则直接进入
	2、超级管理员指定某个user 为管理员
	3、管理员的权限
			1、给所有user发消息
			... ... 
	4、超级管理员：拥有一切权限
