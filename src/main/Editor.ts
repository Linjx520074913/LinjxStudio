import { timeStamp } from 'console'
import { type } from 'os'
import * as THREE from 'three'
import { Camera, Object3D } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { CameraCreator, LightCreator, HelperCreator } from './Creator'
import { LightType } from './Definition'
import { ModelLoader } from './ModelLoader'
import { SignalManager } from './SignalManager'

export class Editor {

    private static instance: Editor

    signalManager: SignalManager

    scene: THREE.Scene
    sceneHelper: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.Renderer
    orbitControls: OrbitControls

    private constructor(){
        this.signalManager = new SignalManager()
        this.addSignalHandler()

        // 创建默认 scene
        this.scene = new THREE.Scene()
        this.scene.name = '主场景'
        this.scene.background = new THREE.Color(0xAAAAAA)

        this.sceneHelper = new THREE.Scene()
        this.sceneHelper.name = 'SceneHelper'
        this.sceneHelper.background = new THREE.Color(0xAAAAAA)

        this.addObject(HelperCreator.createGrid())
        this.addObject(HelperCreator.createAxes())

        // 创建默认 camera

        this.camera = CameraCreator.createPerspectiveCamera(45, 1, 1, 1000)

        // 创建默认 renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        //@ts-ignore
        // 允许阴影投射
        this.renderer.shadowMap.enabled = true
        //@ts-ignore
        // 阴影边渲染出来更加模糊，比默认效果要好
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap

        // 创建默认 orbitControls
        this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
    }

    addSignalHandler () {
        // 处理【灯光】 信号
        this.signalManager.addLight.add( (type: LightType) => {
            var light = LightCreator.createLight(type)
            this.addObject(light)
        })
        // 处理 【加载模型】 信号
        this.signalManager.loadModel.add( (path: string) => {
            ModelLoader.load(path).then( (model) => {
                this.addObject(model)
            })
        })
        // 处理【物体显示/隐藏】信号
        this.signalManager.objectShown.add( (id: number, visible: boolean) => {
            var target = this.selectById(id)
            if(target != undefined){
                target.visible = visible
            }
        })
    }

    public static getInstance() {
        if(null == this.instance){
            this.instance = new Editor()
        }
        return this.instance
    }

    // 添加物体
    addObject (obj: Object3D) {
        this.scene.add(obj)
        this.signalManager.objectAdded.dispatch(obj)
        this.signalManager.sceneGraphChanged.dispatch(this.scene)
    }

    // 移除物体
    removeObject (param: Object3D | number | string) {
        var target
        switch(typeof param){
            case 'number':
            case 'string':
                target = this.selectObject(param)
                break
            default:
                target = param
                break
        }

        if(target instanceof Object3D){
            if(target.parent == null) return // avoid deleting the camera or scene

            target.parent.remove(target)
            this.signalManager.objectRemoved.dispatch(target)
            this.signalManager.sceneGraphChanged.dispatch(this.scene)
        }
    }

    // 选择物体
    public selectObject (param: number | string) {
        var target
        switch(typeof param){
            case 'number':
                target = this.selectById(param)
                break
            case 'string':
                target = this.selectByUuid(param)
                break
            default:
                console.log('[ Editor ] : selectObject has no this type of param ' + (typeof param))
                break
        }
        if(target != undefined){
            this.signalManager.objectSelected.dispatch(target)
        }
        return target
    }

    // 通过 id 选中物体
    selectById (id: number) {
        var obj = this.scene.getObjectById(id)
        return obj
    }

    // 通过 uuid 选中物体
    selectByUuid (uuid: string) {
        var scope = this
        var obj
        this.scene.traverse( (child) => {
            if(child.uuid == uuid){
                obj = child
            }
        })
        return obj
    }
}