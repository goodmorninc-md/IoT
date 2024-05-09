#  React毕设项目开发问题

#### 背景

通过create-react-app 创建的文件，版本为5.0.1

CRA中将webpack文件隐藏

## 开发设计

### 全局数据设计

1.   URL全局设计

2.   Context

     需要包括所选公司、所选公司的产品、所选公司的设备
### Api逻辑
#### 组织首页
根据custormer的api来进行获取每一个组织的客户，然后在每一个custormer中可以对用户user的账号进行增删改查
## 遇到的问题

1.   引入Arco mobile design时出错

     原因：该组件的样式都是通过less方式导入，而CRA的默认webpack文件隐藏，且并没有对less文件进行配置，所以仅仅可以使用组件，而非样式

     解决方法1：npm run eject，将配置文件eject出去，在配置文件中进行修改，我并未成功

     解决方法2：react-app-rewired 和 customize-cra，定制webpack配置文件，在项目根目录配置config-override.js文件，[放个参考链接](https://www.jianshu.com/p/94ac7250ccf0)

     方法3：使用Craco进行配置，根目录创建craco.config.js文件，写入

     ```javascript
     const CracoLessPlugin = require('craco-less');
     const CracoAlias = require("craco-alias");
     const path = require('path')
     module.exports = {
       plugins: [
         {
           plugin: CracoLessPlugin,
           options: {
             lessLoaderOptions: {
               lessOptions: {
                 modifyVars: { '@primary-color': '#1DA57A' }, // 可以在这里定义全局变量
                 javascriptEnabled: true,
               },
             },
           },
         },
         {
           plugin:CracoAlias,
           options:{
             // source: "jsconfig",
             baseUrl: "./src",
             aliases: {
               "@":path.resolve(__dirname, 'src'),
               // 其他别名...
             }
           }
         }
       ],
     };
     
     ```

     并且对package.json进行修改

     ```javascript
     "start": "craco start",
     "build": "craco build",
     "test": "craco test",
     ```

2.   问题2：@表示根目录路径配置

     在craco.config.js文件中进行别名设置，上面代码段中有写

     老办法：webpack.config.js(需要eject)，或者gpt给出方法，创建jsconfig.js文件(TS代码类似)

3.   问题3

     ![image-20240425161255645](C:\Users\Dreamer\AppData\Roaming\Typora\typora-user-images\image-20240425161255645.png)

4.   搞清楚父/子元素中各语句的执行顺序

     首先执行ref、state、context等在头部定义的语句(初始化等工作)

     **然后是jsx元素渲染，完成后执行effect**

     无论effect的依赖项如何，初始时都会执行一次
     
5.   对象引用可能会存在问题

     ![image-20240429152049887](C:\Users\Dreamer\AppData\Roaming\Typora\typora-user-images\image-20240429152049887.png)

     采用了深层拷贝

6.   很多地方考虑清楚，其实不需要effect

7.   注意提供的ui中，需要看子组件的渲染的方式，?表达式是重新渲染的

8.   使用的arco-design-mobile的className不起作用，需要提高优先级，学习css特异性

9.   arco degisn mobile中的问题

     (1)Cell的子children元素采用的是flex布局

     存在label时，Cell的children元素会在cell的最右边

     (2)当把Cell的标签bordered设置为false时，自定义bordered才有作用
     
     (3)通过对Cell.Group进行flex设置把每个Cell进行位置修改
     
10.   Button color和bgColor配置直接在<Button color={colorConfig} bgColor={bgConfig}>中配置

11.   Tabs的字体大小直接通过覆盖.arco-tab-cell来重新配置
