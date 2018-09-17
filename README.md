# node-sequelize

## sequelize文档  http://docs.sequelizejs.com/

*目录结构
```
 nodelearn
    |——bin
    |   |——www.js         //node服务启动
    |
    |——common
    |   |——notice.js
    |
    |——config
    |   |——db.js           //数据库连接
    |
    |——models              //对应数据库里面的表名以及字段名
    |   |——ref.js          //配置表之间的关联关系和自动建表
    |   |——user.js
    |
    |——public              //公共样式 静态文件
    |
    |——routes
    |   |——user.js
    |
    |——views               //页面文件
    |
    |——app.js              //加载主外键关系及创建数据库
    |
    |__package.json

```
nodejs使用sequelize的api测试应用<br>

models 里面的是用来对应数据库里面的表名以及字段名的 \<br>

models 定义 \<br>

sequelize.define('name',{attributes},{options}); \<br>

第一个参数String name -> 数据库表名； \<br>

第二个参数Object {attributes}  主要配置对应表里的字段， \<br>

第三个参数Object {options} 主要配置表里的字段和{attributes}中是否一样以及其他的一些配置 \<br>


routes 里面主要是引用models里面的文件进行数据库的操作增删改查；以及逻辑代码的书写；\<br>

routes 里面的index.js 是用来定义接口名称并导出routes里面的书写逻辑代码的文件 \<br>

models (classMethods)-> routes

## 📜 License
Copyright (c) 2018 09 http://github.com/dyywork

The MIT License