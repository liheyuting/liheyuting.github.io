---
title: Hexo blog yilia主题迭代 -- 增加RSS功能+百度统计/google统计
date: 2019-01-23
categories:
- 工具
tags:
- learn
- blog
---

### 增加RSS功能

- 安装RSS插件
注意一定要安装到blog的根目录
`npm install --save hexo-generator-feed`

- 在你的项目的‘_config.yml‘配置文件下找到Extensions添加如下内容：

``` 
# Extensions  #插件和主题
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
#RSS订阅
plugins: hexo-generater-feed

```

- 在主题配置文件里，在rss位置，添加‘/atom.xml‘
<!-- more -->
- 刷新页面

### 更换到百度统计

- 注册一个[百度统计](http://tongji.baidu.com)账号
    - 网站域名：用博客首页链接
    - 网站首页：用博客首页链接
- hexo\themes\yilia\layout_partial\baidu-analytics.ejs中修改代码

```
<% if (theme.baidu_tongji){ %>
<script type="text/javascript">
#你的百度统计代码
</script>
<% } %>
```

- 在hexo\themes\yilia\layout_partial\head.ejs文件中，在</head>前增加
` <%- partial('baidu-analytics') %> `

### google analytics 谷歌统计

- 注册一个[google analytics账号](https://analytics.google.com/analytics/web/)
- hexo\themes\yilia\layout_partial\google-analytics.ejs 修改代码

```
#google里全局代码，直接copy

```
- 在hexo\themes\yilia\layout_partial\head.ejs文件中，在</head>前增加
` <%- partial('google-analytics') %> `

- 使用google tag assistant来验证设置
[google tag assistant](https://support.google.com/tagassistant/answer/2947093?hl=zh_CN)是一款chrome扩展插件

### 修改代码块的颜色
在‘themes/yilia/source/main.266c1c.css中的.article-entry .highlight’中修改对应背景和字体颜色即可










