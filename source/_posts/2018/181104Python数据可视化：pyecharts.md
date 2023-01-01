---
title: Python数据可视化：pyecharts
date: 2018-11-04 12:54
categories:
- 生存技能
tags: 
- python
- learn
---

预想是学习通过python开发一个数据图表的平台，用API获取数据，数据可视化。

通过搜索等，发现echarts可以实现数据可视化，并且还有针对python的第三方库。以下记录过程

#### 安装pyecharts

` pip install pyecharts`
不知道为什么我总是不成功，最终还是在下载了pyecharts库文件才安装成功。

1. 安装了wheel
`pip install wheel`

2. 下载安装pyecharts
下载了[pyecharts-0.1.9.4-py2.py3-none-any.whl](https://files.pythonhosted.org/packages/7e/aa/63f80d0d2d2ee43cfe9f30822eb751ba67359aa54507a05b740ed5666416/pyecharts-0.1.9.4-py2.py3-none-any.whl)

<!--more-->
#### 图表类型 ####

- Bar（柱状图/条形图） 
- Bar3D（3D 柱状图）
< !--more-->
- Boxplot（箱形图） 
- EffectScatter（带有涟漪特效动画的散点图） 
- Funnel（漏斗图） 
- Gauge（仪表盘） 
- Geo（地理坐标系） 
- Graph（关系图） 
- HeatMap（热力图） 
- Kline（K线图） 
- Line（折线/面积图） 
- Line3D（3D 折线图） 
- Liquid（水球图） 
- Map（地图） 
- Parallel（平行坐标系） 
- Pie（饼图） 
- Polar（极坐标系） 
- Radar（雷达图） 
- Sankey（桑基图） 
- Scatter（散点图） 
- Scatter3D（3D 散点图） 
- ThemeRiver（主题河流图） 
- WordCloud（词云图）

#### 第一个图表
```
from pyecharts import Line

attr=["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
v1=[5,20,36,10,75,90]
v2=[10,25,8,60,20,80]
bar=Line("各商家产品销售情况")
bar.add("商家A",attr,v1,is_stack=True)
bar.add("商家B",attr,v2,is_stack=True)
bar.show_config()
bar.render()

```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20181104174725420.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM5MTgxMTAw,size_16,color_FFFFFF,t_70)

bar = Bar("主标题"，"副标题")
bar.add（） 调用add()函数添加图表的数据和设置各种配置项
bar.show_config() 打印输出图表的所有配置项
bar.render() 生成render.html文件，也可以设置路径和文件名
bar.use_theme('dark') 更改主体色系

#### 绘制图表过程 
1. chart_name = Type() 初始化具体类型图表
2. add() 添加数据及配置项
3. render() 生成.html文件


[参考网站](http://pyecharts.org/#/zh-cn/prepare)
