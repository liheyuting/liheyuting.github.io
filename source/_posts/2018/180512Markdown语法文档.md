---
title: Markdown语法文档
date: 2018-05-12
categories:
- 兴趣技能
tags: 
- markdown
- learn
---

###### 标题 ######
```
# 这是一级标题
## 这是二级标题
### 这是三级标题
#### 这是四级标题
##### 这是五级标题
###### 这是六级标题
```

** 加粗 **
`
** 加粗 **
`

*斜体*

` *斜体* `

<!--more--> 

*** 斜体加粗 ***
`
*** 斜体加粗 ***
`

~~删除线~~
` ~~删除线~~ `

> 引用
`> 引用`

---
分割线
```
---
***
```
图片
```
![图片alt](图片地址 ''图片title'')

图片alt就是显示在图片下面的文字，相当于对图片内容的解释。
图片title是图片的标题，当鼠标移到图片上时显示的内容。title可加可不加

<img src='/img/0-5.jpg', height= '37%', width = '37%'> <img src='/img/0-8.jpg', height= '37%', width = '37%'>
```

超链接
```
[超链接名]（超链接地址"超链接title"）
title可加可不加
```

无序列表

```
- 列表
+ 列表
* 列表
```


有序列表

```
1. 内容
2. 内容
3. 内容
```


列表嵌套
上一级和下一级之间敲三个空格即可


表格
```
表头|表头|表头
---|：--：|---：
内容|内容|内容

第二行分割表头和内容
- 有一个就行
文字默认居左
-两边加：表示文字居中
-右边加：表示文字居右

注：原生的语法两边都要用|包起来。此处省略
```

代码
单行代码  "`单行代码`"
多行代码  两对3个上角标

插入视频
```
<iframe width="560" height="315" src="" frameborder="0" allowfullscreen></iframe>
```

插入音乐
```
<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" src="//music.163.com/outchain/player?type=2&id=28381611&auto=1&height=66" width=330 height=86></iframe>
```

