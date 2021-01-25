import { chdir } from 'process'
import * as THREE from 'three'
import { BoxHelper, DirectionalLightHelper, HemisphereLightHelper, PointLightHelper, SpotLightHelper } from 'three'
import { HelperCreator, LightCreator } from './Creator'
import { LightType } from './Definition'
import { Editor } from './Editor'
import { ModelLoader } from './ModelLoader'
import { SignalManager } from './SignalManager'

export class Viewport {
    scene: THREE.Scene
    sceneHelper: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.Renderer
    signalManager: SignalManager
    raycaster: THREE.Raycaster
    mouse: THREE.Vector2
    editor: Editor

    constructor (editor: Editor) {
        this.editor = editor
        this.signalManager = editor._signalManager
        this.scene = editor.scene
        this.sceneHelper = editor.sceneHelper
        this.camera = editor.camera
        this.renderer = editor.renderer
        this.raycaster = new THREE.Raycaster()

        this.mouse = new THREE.Vector2()

        this.handleSignals()
        this.handleClickEvent()
    }

    public getViewport () {
        return this.renderer.domElement
    }

     // 处理信号
     handleSignals () {
        // 处理 【resize】 信号
        this.signalManager.resize.add( (w, h) => {
            // 更新 camera
            this.camera.aspect = w / h
            this.camera.updateProjectionMatrix()

            // 更新 renderer
            this.renderer.setSize(w, h)
        })
    }

    // 处理点击事件
    handleClickEvent () {
        var canvas = this.getViewport()
        var scope = this
        canvas.addEventListener('click', (event) => {
            event.preventDefault()

            var w = canvas.clientWidth
            var h = canvas.clientHeight

            //屏幕坐标转标准设备坐标
            this.mouse.x = (event.offsetX / w) * 2 - 1;
            this.mouse.y = -(event.offsetY / h) * 2 + 1;
            this.raycaster.setFromCamera(this.mouse, this.camera)

            //返回射线选中的对象
            //第一个参数是检测的目标对象 第二个参数是目标对象的子元素
            let intersects = this.raycaster.intersectObjects(this.scene.children, true)
            if (intersects.length > 0) {
                var selectedObject = intersects[0].object
                scope.editor._signalManager.objectSelected.dispatch(selectedObject)
            }else{
                scope.editor._signalManager.objectDeselected.dispatch()
            }
        })
    }

    // 渲染
    public render () {
        // https://stackoverflow.com/questions/19459449/running-requestanimationframe-from-within-a-new-object
        requestAnimationFrame(this.render.bind(this))

        // @ts-ignore
        this.sceneHelper.updateMatrixWorld()
        this.scene.updateMatrixWorld()
        this.renderer.render(this.scene, this.camera)

        // @ts-ignore
        this.renderer.autoClear = false
        this.sceneHelper.traverse( (child) => {
            if(child instanceof SpotLightHelper ||
               child instanceof DirectionalLightHelper ||
               child instanceof PointLightHelper ||
               child instanceof HemisphereLightHelper ||
               child instanceof BoxHelper){
                child.update()
            }
        })
        this.renderer.render(this.sceneHelper, this.camera)
        // @ts-ignore
        this.renderer.autoClear = true
    }
}