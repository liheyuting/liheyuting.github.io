---
title: Flask-web搭建学习笔记（1）-bootstrap
date: 2019-3-17
tags:
- learn
- python
- flask
- bootstrap
---

先安装python，以及flask和flask_bootstrap包

首先梳理一下文件夹，也就是网站最基本的框架

### xxx.py  

程序主页面，用命令行运行，或是通过pycharm这些都OK，此处例举最基础的语法
```
   from flask import Flask, render_template
   from flask_bootstrap import Bootstrap
   # 引入flask和flask_bootstrap两个包
   
   app = Flask(__name__)
   bootstrap = Bootstrap(app)
   
   @app.route('/')
   def index():
       return render_template('base.html')
   # 这段可以复制，再修改增加功能，上面三行仅为index的设置，其他页面再设置 
       
   if __name__ == '__main__':
       app.run()
   # 当然也可以加入其他的一些功能，例如debug=True
```

  <!--- more --->

### templates

可以放一些template，比如，

```
   - index.html或是base.html 命名没关系，但要有一些基础的‘.html‘页面
   - 其他，比如user.html/404.html等，看页面功能，可以“继承”index.html的一些元素，
```

### static/css：放css样式以及图片等静态内容
```
    main.css 放page的css代码
```

### xxx.db：数据库