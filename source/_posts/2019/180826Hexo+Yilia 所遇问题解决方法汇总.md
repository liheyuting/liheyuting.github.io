---
title: Hexo+Yilia 所遇问题解决方法汇总
date: 2018-08-26
categories:
- 工具
tags: 
- blog
- learn
- Yilia
---

### gitalk评论部署 ###
我用的是gitalk评论

这里花费的时间最久，在issues里找了很久，终于在[Ziven](https://ziven.cc/2018/07/03/Hexo%E4%B8%BB%E9%A2%98yilia%E5%A2%9E%E5%8A%A0gitalk%E8%AF%84%E8%AE%BA%E6%8F%92%E4%BB%B6/?nsukey=%2BijgAVH%2B4eCTudP96Bul1%2FQsAa44sS5wREOMSjzWZhpp5HNtgQ5lYQXXWgsrEjpRXfaVUvIfj1pVXj%2FYnFSdjAf0TR900HBBZYQThmSrRTtVwFlzfcGL9KfVT67ohG1XyYvT35Te2BXTqDo5Vh8nrUA6pr55q0Xs2nagi4yyiQFrPsRNMcql82iJ5ltbcivhdE%2Fe3i3m8aBleHrwZkGOWA%3D%3D)找到对应的

```
#6、gitalk评论
gitalk:
  enable:  true
  githubID:  liheyuting  
  repo: liheyuting.github.io （填写repo的名字）
  ClientID: ''
  ClientSecret: ''
  adminUser: ''
  distractionFreeMode: true
 ```

这里涉及到一个很重要的疑惑点是“ClientID”和“ClientSecret”，这个也许对于有开发经验的童鞋来说很基础，所以很多博文中自动默认大家都知道了。而对于小白，这个还是一头雾水。其实这个是GitHub的授权，解决方法很简单。

<!--more--> 

** GitHub授权ClientID和ClientSecret **
进入setting-developer settings - OAuth Apps
[点击直接进入](https://github.com/settings/applications/861324)

![](/img/client.png)

homepage url 只需要填写blog首页链接即可
Authorization callback URL 填写的是授权返回的页面，这样也只需要填写blog地址即可

提交之后会生成“ClientID”和“ClientSecret”放到主题配置文件中就可以了。

按上面提交之后，怎么页面还是提示“未找到对应issue，需要联系管理员”呢？

** 评论初始化 **

首先，先注意下地址是不是本地化地址，评论需要在正式环境中初始化有效。

第二步：只需要简单的点击issue，授权adminUser的GitHub权限。

再试试，是不是页面评论就可以了？


### 多标签 ###

这个比较简单，如下
``` 
---
title: Markdown语法文档
date: 2018-05-12
tags: 
- blog 
- markdown
---
```

### 页面浏览统计 ##

这个实现比较快，[Hexo主题Yilia添加网站浏览量统计](https://ziven.cc/2018/06/25/Hexo%E4%B8%BB%E9%A2%98Yilia%E6%B7%BB%E5%8A%A0%E7%BD%91%E7%AB%99%E6%B5%8F%E8%A7%88%E9%87%8F%E7%BB%9F%E8%AE%A1/)

### 分页显示 ##

在文中中想要分页的地方加上
`<!--more--> `
