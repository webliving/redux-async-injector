# redux-async-injector
![version](https://img.shields.io/github/release/webliving/redux-async-injector.svg)
![download](https://img.shields.io/npm/dm/mytool.svg)

运行时动态注入 redux store

## 安装
Install ```redux-async-injector``` via npm.

```javascript
npm install --save redux-async-injector
```

然后, 使用你中意的:heart_decoration:一种引用方法使用本模块 :
```javascript
// using an ES6 transpiler, like babel
import { createInjectStore } from 'redux-injector';

// not using an ES6 transpiler
var createInjectStore = require('redux-injector').createInjectStore;
```

## 使用
示例如下:

### 创建 redux store
应用的redux数据的创建

#### 1. reducer 你的配置可能类似这样
```javascript
let reducersObject = {
  router: routerReducerFunction,
  data: {
    user: userReducerFunction,
    auth: {
      loggedIn: loggedInReducerFunction,
      loggedOut: loggedOutReducerFunction
    },
    info: infoReducerFunction
  }
};
```

## License

ISC