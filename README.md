# React技术栈 网易云音乐PC项目实战

## 项目简介
基于 `react` + `redux` + `react-router` + `styled-components` + `axios` + `ant design` + `react-redux` + `redux-thunk` `immutable` + `redux-immutable` + `react-transition-group` 等开发一款PC端「网易云音乐PC」 Web项目

## 技术栈

### 前端

- `React`：用于构建用户界面的 `MVVM` 框架
- `styled-components`：解决组件内容编写样式会影响全局样式导致冲突
- `axios`: 发送网络请求，请求拦截和响应拦截
- `react-router`：为单页面应用提供的路由系统
- `react-router-config`：集中式路径映射表管理
- `redux`：React 集中状态管理，在多个组件共享某些状态时非常方便
- `react-redux`：帮助我们链及`redux`、`react`的辅助工具
- `immutable`：对`reudx`中保存的`state`使用`immutable`进行管理
- `redux-immutable`: 对根目录的`reducer`中`state`进行管理
- `redux-thunk`: 在`redux`中进行异步请求
- `propType`: 校验`props`类型及默认值
- `react-transition-group`: 添加过渡动画效果
- 项目中的优化: 函数式组件全部采用`memo`、路由懒加载、函数防抖


### 后端
- 已经部署到服务器的网易云音乐接口: https://music-api.heheda.top/ (**默认的API接口**),接口文档 https://binaryify.github.io/NeteaseCloudMusicApi


### 其他工具

- create-react-app：React 脚手架工具，快速初始化项目代码
- Prettier:代码风格检查工具，帮助我们规范代码的书写

## 构建项目
yarn install

yarn start