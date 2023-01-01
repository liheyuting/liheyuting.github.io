---
title: DaoVoice实现在线联系
date: 2019-10-24
categories:
- 工具
tags: 
- blog
- hexo
- next
- learn
---


### 注册登陆DaoVoice
[注册地址](http://www.daovoice.io/)

在`博客/themes/next/layout/_partials/head/head.swig`增加代码

```
{% if theme.daovoice %}
 <script>(function(i,s,o,g,r,a,m){i["DaoVoiceObject"]=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;a.charset="utf-8";m.parentNode.insertBefore(a,m)})(window,document,"script",('https:' == document.location.protocol ? 'https:' : 'http:') + "//widget.daovoice.io/widget/b6dbddb6.js","daovoice")
 daovoice('init', {
  app_id: "用户ID"
});
daovoice('update');
 </script>
{% endif %}
```
如图所示：

<img src='/img/daovoice.png', height= '75%', width = '75%'>


### 修改主题配置文件
在`/themes/next/_config.yml`
```
daovoice: true
daovoice_app_id: 用户ID
```
<!--more-->
### 微信消息提醒
可以绑定微信，以及默认将信息分派给自己，这样就可以用微信接收网站聊天信息了


### 修改聊天图标设置

应用设置-聊天设置中进行简单的设置












