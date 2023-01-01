---
title: Hexo更换主题Yilia为Next及Next主题优化
date: 2019-10-15
categories:
- 工具
tags: 
- blog
- hexo
- learn
---

###  安装next主题

**下载** next主题
```
cd  xxxx/themes
git clone https://github.com/theme-next/hexo-theme-next themes/next

```

**编辑主题**
在`hexo/_config.yml`中修改

`theme: next`


### Menu更新
tags：
1. 创建tags页面
`hexo new page tags`

2. 编辑`tags/index.md`

about: 类同于tags页面创建
<!--more-->
### Social图标修改
在增加的对应的渠道后面加上“|| icons”
icons可以在[这里](https://fontawesome.com/icons)查找


<!--more-->
### 搜索 

1、hexo目录下，安装搜索插件
`npm install hexo-generator-searchdb --save`

2、编辑`hexo/_config.yml`，添加

```
# local search
search:
  path: search.xml
  field: post
  format: html
  limit: 10000
```

安装的时候显示：
```
zlib: Cannot read property 'length' of null

npm ERR! A complete log of this run can be found in:
npm ERR!     /xxxx/.npm/_logs/2019-10-23T00_54_05_567Z-debug.log
```

已解决，详见`解决 zlib: Cannot read property 'length' of null`


### 各板块透明度修改
**内容板块透明**
根博客目录`themes\next\source\css\_schemes\Pisces\_layout.styl`文件`.content-wrap`标签下`background: white`修改为：

`background: rgba(255,255,255,0.7); //0.7是透明度`

**菜单栏背景**
根博客目录`themes\next\source\css\_schemes\Pisces\_layout.styl`文件`.header-inner`标签下`background: white`修改为：

`background: rgba(255,255,255,0.7); //0.7是透明度`

**站点概况背景**
根博客目录`themes\next\source\css\_schemes\Pisces\_sidebar.styl`文件`.sidebar-inner`标签下`background: white`修改为：

`background: rgba(255,255,255,0.7); //0.7是透明度`

修改根博客目录`themes\next\source\css\_schemes\Pisces\_layout.styl`文件`.sidebar`标签下`background: $body-bg-color`修改为：

`background: rgba(255,255,255,0.7); //0.7是透明度`


底部字数显示：
安装插件没有成功，似乎仍然是npm的原因

### 加入valine在线评论
1. 去[LeanCloud](https://leancloud.cn/)注册一个帐号.然后再创建一个应用，获取appid 和appkey，
2. 在`themes/next/_config.yml`中的`valine`中配置


前端显示：`Code 504: The app is archived, please restore in console before use.`
解决办法：在leancloud的应用里重新激活


**邮件提醒**
略

**语言设置**
在根目录`_config.yml`设置`language: zh-CN`


**底部跳动图标实现**未完成
1. 已修改`next\source\css_variables\custom.styl`的css文件，增加以下代码

```
//底部爱心小图标跳动
keyframes heartAnimate {
    0%,100%{transform:scale(1);}
    10%,30%{transform:scale(0.9);}
    20%,40%,60%,80%{transform:scale(1.1);}
    50%,70%{transform:scale(1.1);}
}

//图标所对应的span中的ID
#heart {
    animation: heartAnimate 1.33s ease-in-out infinite;
}
.with-love {
    color: rgb(255, 113, 113);
}
```

2. 底部为增加对应的ID


### 修改界面内容默认的设置【没有起效果】

在`themes\next\source\css\_custom的custom.styl`添加下面参数

```
// 屏幕宽度小于1600px
$content-desktop = 700px

// 屏幕宽度大于或等于 1600px
$content-desktop-large = 900px
```

已解决：
当使用 Mist 和 Muse时候用上面那段话，当使用Pisces 和 Gemini 风格时增加以下内容：

```
.header{
    width: 90%;
    +tablet() {
        width: 100%;
    }
    +mobile() {
        width: 100%;
    }
}
.container .main-inner {
    width: 90%;
    +tablet() {
        width: 100%;
    }
    +mobile() {
        width: 100%;
    }
}
.content-wrap {
    width: calc(100% - 260px);
    +tablet() {
        width: 100%;
    }
    +mobile() {
        width: 100%;
    }
}
```




### 修改背景样式

修改`themes\next\source\css\ _custom\custom.styl`文件，这个是Next故意留给用户自己个性化定制一些样式的文件，添加以下代码：

```
body {
    background:url(https://source.unsplash.com/random/1600x900);
    background-repeat: no-repeat;
    background-attachment:fixed;
    background-position:50% 50%;
    background-size:cover;
}
```

**参数**
url：可更换为自己喜欢的图片的地址。
repeat：是否重复出现
attachment：定义背景图片随滚动轴的移动方式
position：设置背景图像的起始位置。
background-size:cover 为可能有助于大分辨率下背景图的显示

背景效果设置：
'themes\next\_config.yml '中找到`canvas`



### 字体不闪动设置
修改文件`next/source/css/_common/components/post/post-reward.styl`，然后注释其中的函数`wechat:hover和alipay:hover`，如下：

```
/* 注释文字闪动函数
#wechat:hover p{
animation: roll 0.1s infinite linear;
-webkit-animation: roll 0.1s infinite linear;
-moz-animation: roll 0.1s infinite linear;
}
#alipay:hover p{
animation: roll 0.1s infinite linear;
-webkit-animation: roll 0.1s infinite linear;
-moz-animation: roll 0.1s infinite linear;
}
*/

```



### 解决`zlib: Cannot read property 'length' of null`

用npm安装什么都显示这样，是nodejs版本不够 [github issue](https://github.com/ionic-team/ionic-cli/issues/3816)


[stack中的解决方案](https://stackoverflow.com/questions/10075990/upgrading-node-js-to-latest-version)
方案一：
```
sudo npm install n -g
sudo n stable 安装稳定版本
或 sudo n latest 安装最新版本

```

失败，仍旧显示同样错误

方案二：
不使用sudo

step1: 下载 nvm（node version manager）
`
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
`

step2: 安装最新的node.js版本
`nvm install stable`



### 取消点击效果
`fireworks: false`












