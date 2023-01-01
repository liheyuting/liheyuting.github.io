---
title: Hexo next主题添加gitalk留言
date: 2019-10-24
tags: 
- blog
- hexo
- next
- learn
---

此版本先不配置，gitalk的评论很高端，遗憾的是用github登陆限制了很多人，虽然博客也没几个人来看哈哈哈

gitalk配置此处不累述，可见[Hexo+Yilia 所遇问题解决方法汇总](https://liheyuting.github.io/2018/08/26/2019/hexo_yilia/)

### Next 主题配置 Gitalk 支持
1. 首先创建 Gitalk 的 swig 文件，放在 `themes/next/layout/_third-party/comments` 文件夹下，命名为 gitalk.swig ，内容如下。

```
{% if page.comments && theme.gitalk.enable %}
  <link rel="stylesheet" href="https://unpkg.com/gitalk/dist/gitalk.css">
  <script src="https://unpkg.com/gitalk/dist/gitalk.min.js"></script>
  <div id="gitalk-container"></div>
  <script type="text/javascript">
    var gitalk = new Gitalk({
      clientID: '{{ theme.gitalk.clientID }}',
      clientSecret: '{{ theme.gitalk.clientSecret }}',
      repo: '{{ theme.gitalk.repo }}',
      owner: '{{ theme.gitalk.owner }}',
      admin: ['{{ theme.gitalk.admin }}'],
      id: location.pathname,
      distractionFreeMode: '{{ theme.gitalk.distractionFreeMode }}'
    })
    gitalk.render('gitalk-container')
  </script>
{% endif %}
```

2. 在主题文件 `themes/next/layout/_third-party/comments/index.swig` 中引入刚刚添加的文件
`{% include 'gitalk.swig' %}`

3. 在 `themes/next/_config.yml` 文件中添加 Gitalk 的配置
```
gitalk:
  enable:  true
  githubID:  xxxxx  
  repo: liheyuting.github.io
  ClientID:  xxxxxx
  ClientSecret: xxxxx
  adminUser: xxxx
  distractionFreeMode: true
 ```



[参考文章](https://www.jianshu.com/p/b5f509f25872)