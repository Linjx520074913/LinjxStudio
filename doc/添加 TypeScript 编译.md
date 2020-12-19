## 安装 TypeScript
- 在项目根目录下，执行指令
```
> npm install typescript -g
```
- 继续执行指令
```
npm install @types/node --save-dev
```
## 创建 TypeScript 编译用配置文件
- 在项目根目录下，创建 tsconfig.json 配置文件，内容如下
``` json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es2019",
    "noImplicitAny": false, // 在表达式和声明上有隐含的'any'类型时报错, 最好之后改成true
    "sourceMap": true,
    "outDir": "./dist",     // 输出目录
    "baseUrl": ".",
    "paths": {
      "*": ["node_modules/*"]
    }
  },
  "include": [
    "src/**/*"
  ]
}
```
## 修改 package.json， 添加指令
~~~json
{
    ...
    "script"{
        "build":"tsc",
        "watch":"tsc -w",
        "start":"npm run build && electron ./dist/LinjxStudio.js"
    }
}
~~~