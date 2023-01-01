---
title: Hexo next主题建立标签云
date: 2019-10-23
categories:
- 工具
tags: 
- blog
- hexo
- next
- learn
---

效果如首页

### 使用`hexo-tag-cloud`插件

[hexo-tag-cloud github 地址](https://github.com/MikeCoder/hexo-tag-cloud)

#### 安装`hexo-tag-cloud`
进入到博客根目录，安装
`npm install hexo-tag-cloud@^2.0.* --save`

### 插件配置
在主题文件夹找到文件 `theme/next/layout/_macro/sidebar.swig`, 然后添加如下代码：

```

{% if site.tags.length > 1 %}
<script type="text/javascript" charset="utf-8" src="/js/tagcloud.js"></script>
<script type="text/javascript" charset="utf-8" src="/js/tagcanvas.js"></script>
<div class="widget-wrap">
    <h3 class="widget-title">Tag Cloud</h3>
    <div id="myCanvasContainer" class="widget tagcloud">
        <canvas width="250" height="250" id="resCanvas" style="width=100%">
            {{ list_tags() }}
        </canvas>
    </div>
</div>
{% endif %}

```
<!--more-->
到倒数第四行，在以下字符前，

```
    </div>
  </aside>
{% endmacro %}
```

#### 主题配置
博客根目录的`——config.yml`

```
# hexo-tag-cloud
tag_cloud:
    textFont: Trebuchet MS, Helvetica
    textColor: '#333'
    textHeight: 25
    outlineColor: '#E2E1D1'
    maxSpeed: 0.1
```


