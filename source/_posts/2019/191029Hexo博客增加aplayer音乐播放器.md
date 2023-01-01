---
title: Hexo博客增加aplayer音乐播放器
date: 2019-10-29
categories:
- 工具
tags:
- earn
- blog
- hexo
---

之前使用的是网易云外链链接，[点击查看](https://liheyuting.github.io/2018/05/12/2018/Markdown/)文章尾部如何使用，发现很受版权的限制，QQ音乐无法生成外链。

遂，试试看使用插件来插入音乐。


### 下载hexo-tag-aplayer

进入博客根目录：
`npm install --save hexo-tag-aplayer`
<!--more-->

在根目录的`_config.yml`中增加
```
# 音乐播放器
aplayer:
  meting: true
```

### 在博客中增加音乐

可用模板
```
{% meting "歌曲id" "netease（音乐平台）" "song" "theme:#555" "mutex:true" "listmaxheight:340px" "preload:auto" %}
```


音乐平台：
netease, tencent, kugou, xiami, baidu

具体参数等[参考文档](https://github.com/MoePlayer/hexo-tag-aplayer/blob/master/docs/README-zh_cn.md)
