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
import { createInjectStore } from 'redux-async-injector';

// not using an ES6 transpiler
var createInjectStore = require('redux-async-injector').createInjectStore;
```

## 使用
示例如下:

### 创建 redux store
应用的redux数据的创建

#### 1. 你应该不需要做什么,大体上你的reducer配置都类似这样?
```javascript
let reducersObject = {
  menuList: menuListReducerFn,
  data: {
    user: userReducerFn,
    auth: {
      loggedIn: loggedInReducerFn,
      loggedOut: loggedOutReducerFn
    },
    info: infoReducerFn
  }
};
```

### 2. 使用 createInjectStore 替换redux默认提供的 createStore
```javascript
import { createInjectStore } from 'redux-async-injector';

let store = createInjectStore(
  reducersObject,
  initialState // 默认数据
);
```

### 注入新的 reducer
在 redux store 创建之后, 你可以在任何合理的地方,简单的注入新的 reducer
```javascript
import { injectReducer } from 'redux-async-injector';

injectReducer('store.form', formReducerFn);
```

## License

MIT