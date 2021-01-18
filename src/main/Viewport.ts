import * as THREE from 'three'
import { HelperCreator, LightCreator } from './Creator'
import { LightType } from './Definition'
import { Editor } from './Editor'
import { ModelLoader } from './ModelLoader'
import { SignalManager } from './SignalManager'

export class Viewport {
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.Renderer
    signalManager: SignalManager
    raycaster: THREE.Raycaster
    mouse: THREE.Vector2

    constructor (eeditor: Editor) {
        this.signalManager = eeditor.signalManager
        this.scene = eeditor.scene
        this.camera = eeditor.camera
        this.renderer = eeditor.renderer
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
        // var raycaster = new THREE.Raycaster()
    // this.$refs.scene_3d_main.addEventListener('click', (event) => {
    //     var w = this.$refs.scene_3d_main.clientWidth
    //     var h = this.$refs.scene_3d_main.clientHeight

    //     var mouse = new THREE.Vector2()
    //     //屏幕坐标转标准设备坐标
    //     mouse.x = (event.offsetX / w) * 2 - 1;
    //     mouse.y = -(event.offsetY / h) * 2 + 1;
    //     raycaster.setFromCamera(mouse, item.camera)

    //     //返回射线选中的对象
    //     //第一个参数是检测的目标对象 第二个参数是目标对象的子元素
    //     let intersects = raycaster.intersectObjects(item.scene.children, true)
    //     if (intersects.length > 0) {
    //       ipcRenderer.send('Log', intersects[0].object.name)
    //     }else{
    //         console.log("没捕获到对象")
    //     }
    // })
        var canvas = this.getViewport()
        canvas.addEventListener('click', (event) => {
            event.preventDefault()

            let getBoundingClientRect = canvas.getBoundingClientRect()
            // 屏幕坐标转标准设备坐标
            let x = ((event.clientX - getBoundingClientRect .left) / canvas.offsetWidth) * 2 - 1;// 标准设备横坐标
            let y = -((event.clientY - getBoundingClientRect .top) / canvas.offsetHeight) * 2 + 1;// 标准设备纵坐标
            let standardVector = new THREE.Vector3(x, y, 1);// 标准设备坐标
            // 标准设备坐标转世界坐标
            let worldVector = standardVector.unproject(this.camera);
            // 射线投射方向单位向量(worldVector坐标减相机位置坐标)
            let ray = worldVector.sub(this.camera.position).normalize();
            // 创建射线投射器对象
            let rayCaster = new THREE.Raycaster(this.camera.position, ray);
            // 返回射线选中的对象 第二个参数如果不填 默认是false
            let intersects = rayCaster.intersectObjects(this.scene.children, true);
            if (intersects.length > 0) {
                console.log(intersects[0].object);
            }
            // var w = canvas.clientWidth
            // var h = canvas.clientHeight
            // console.log('canvas w : ' + w + ' h : ' + h)

            // //屏幕坐标转标准设备坐标
            // this.mouse.x = (event.offsetX / w) * 2 - 1;
            // this.mouse.y = -(event.offsetY / h) * 2 + 1;
            // this.raycaster.setFromCamera(this.mouse, this.camera)

            // //返回射线选中的对象
            // //第一个参数是检测的目标对象 第二个参数是目标对象的子元素
            // let intersects = this.raycaster.intersectObjects(this.scene.children, true)
            // if (intersects.length > 0) {
            //     console.log(intersects)
            //     console.log(intersects[0].object.name)
            // }else{
            //     console.log("没捕获到对象")
            // }
        })
    }

    // 渲染
    public render () {
        // https://stackoverflow.com/questions/19459449/running-requestanimationframe-from-within-a-new-object
        requestAnimationFrame(this.render.bind(this))

        // @ts-ignore
        this.renderer.autoClear = true
        this.scene.updateMatrixWorld()
        this.renderer.render(this.scene, this.camera)

        // // @ts-ignore
        // this.renderer.autoClear = false
        // this.sceneHelper.updateMatrixWorld()
        // this.renderer.render(this.sceneHelper, this.camera)
    }
}