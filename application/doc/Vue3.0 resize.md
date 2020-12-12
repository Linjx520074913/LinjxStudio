# Vue resize 事件使用
- 安装
```
npm i vue-resize-directive
```
- 引入并注册
``` typescript
// ES6
import resize from 'vue-resize-directive'
//...
export default {
    directives: {
        resize,
    }
//...

// ES5
var resize = require('vue-resize-directive')

```
- html 中使用
``` html
<div v-resize="onResize">
```