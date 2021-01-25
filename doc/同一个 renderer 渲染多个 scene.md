# 同一个 renderer 渲染多个 scene
- 定义 scene
~~~ typescript
var scene1 = new THREE.Scene()
// scene1.background = new THREE.Color(0xAAAA00)
var scene2 = new THREE.Scene()
// scene2.background = new THREE.Color(0xAAAA00)
注意：这里不要对 scene 设置背景颜色
~~~

- 定义 renderer
~~~ typescript
var renderer = new WebGLRenderer({antialias: true})
~~~

- 渲染
~~~ typescript
 // 渲染
public render () {
    // https://stackoverflow.com/questions/19459449/running-requestanimationframe-from-within-a-new-object
    requestAnimationFrame(this.render.bind(this))

    // @ts-ignore
    this.scene1.updateMatrixWorld()
    this.scene2.updateMatrixWorld()
    this.renderer.render(this.scene1, this.camera)
    // @ts-ignore
    this.renderer.autoClear = false                    // 关键
    this.renderer.render(this.scene2, this.camera)
    // @ts-ignore
    this.renderer.autoClear = true                     // 关键
}
~~~