## 简介

一个基于业务思考封装的`axios`依赖包。

## 安装

### npm

```shell
npm i logic-axios
```

### yarn

```shell
yarn add logic-axios
```

## 使用

### 创建实例

```js
import {createLogicAxios} from "logic-axios";

const logicAxios = createLogicAxios('http://localhost:8080');
```

### 发起请求

```js
const {data} = await logicAxios.get("/user/info");
console.log(data)
```

### 分页查询

```js
const page = await logicAxios.page("/users", {page: 1, pageSize: 10});
console.log(page.records)
```

提示：分页的格式对应于`MybatisPlus`框架的分页响应结构，其定义为：[IPage.java](
https://github.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-core/src/main/java/com/baomidou/mybatisplus/core/metadata/IPage.java)

## 开源协议

[MIT](LICENSE)