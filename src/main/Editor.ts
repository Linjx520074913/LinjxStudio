import { timeStamp } from 'console'
import { type } from 'os'
import * as THREE from 'three'
import { Camera, Object3D } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { CameraCreator, LightCreator, HelperCreator } from './Creator'
import { HelperType, LightType } from './Definition'
import { ModelLoader } from './ModelLoader'
import { SignalManager } from './SignalManager'

export class Editor {

    private static instance: Editor

    _signalManager: SignalManager

    scene: THREE.Scene
    sceneHelper: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
    orbitControls: OrbitControls

    // helpers: {}
    boundingBoxHelper: THREE.BoxHelper

    private constructor(){
        this._signalManager = new SignalManager()
        this.addSignalHandler()

        // 创建默认 scene
        this.scene = new THREE.Scene()
        this.scene.name = '主场景'

        this.sceneHelper = new THREE.Scene()
        this.sceneHelper.name = 'SceneHelper'
        this.sceneHelper.add(HelperCreator.createGrid())
        this.sceneHelper.add(HelperCreator.createAxes())

        // this.helpers.set(HelperType.BOUNDING_BOX, new THREE.Box3())
        this.boundingBoxHelper = HelperCreator.createBoundingBox()

        // 创建默认 camera

        this.camera = CameraCreator.createPerspectiveCamera(45, 1, 1, 1000)

        // 创建默认 renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setClearColor(new THREE.Color(0.5, 0.5, 0.5), 0.9);
        //@ts-ignore
        // 允许阴影投射
        this.renderer.shadowMap.enabled = true
        //@ts-ignore
        // 阴影边渲染出来更加模糊，比默认效果要好
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
        // this.renderer.setClearColor(new THREE.Color(0.95, 0.95, 0.95), 1);

        // 创建默认 orbitControls
        this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
    }

    addSignalHandler () {
        // 处理【灯光】 信号
        this._signalManager._addLight.add( (type: LightType) => {
            var light = LightCreator.createLight(type)
            this.addObject(light)
        })
        // 处理 【加载模型】 信号
        this._signalManager._loadModel.add( (path: string) => {
            ModelLoader.load(path).then( (model) => {
                this.addObject(model)
            })
        })
        // 处理【物体显示/隐藏】信号
        this._signalManager.objectShown.add( (id: number, visible: boolean) => {
            var target = this.selectById(id)
            if(target != undefined){
                target.visible = visible
            }
        })
        this._signalManager.helperAdded.add( (type: string, helper: Object3D) => {
            
        })
        this._signalManager.objectSelected.add( (object: THREE.Object3D) => {
            // if(this.boundingBoxHelper.isEmpty()){
            //     this.sceneHelper.add(this.boundingBoxHelper)
            // }
            if(!this.sceneHelper.getObjectById(this.boundingBoxHelper.id)){
                this.sceneHelper.add(this.boundingBoxHelper)
            }
            this.boundingBoxHelper.setFromObject(object)
        })
        this._signalManager.objectDeselected.add( () => {
            if(this.sceneHelper.getObjectById(this.boundingBoxHelper.id)){
                this.sceneHelper.add(this.boundingBoxHelper)
            }
        })
    }

    public static getInstance() {
        if(null == this.instance){
            this.instance = new Editor()
        }
        return this.instance
    }

    addHelper (object: Object3D) {
        var helper
        if(object instanceof THREE.Camera){
            helper = new Object3D()
        }else if(object instanceof THREE.DirectionalLight){
            helper = HelperCreator.createDirectionalLightHelper(object)
        }else if(object instanceof THREE.SpotLight){
            helper = HelperCreator.createSpotLightHelper(object)
        }else{
            return
        }
        this.sceneHelper.add(helper)
        this._signalManager.helperAdded.dispatch()
    }

    // 添加物体
    addObject (obj: Object3D) {
        this.scene.add(obj)
        this.addHelper(obj)
        this._signalManager.objectAdded.dispatch(obj)
        this._signalManager.sceneGraphChanged.dispatch(this.scene)
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
            this._signalManager.objectRemoved.dispatch(target)
            this._signalManager.sceneGraphChanged.dispatch(this.scene)
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
            this._signalManager.objectSelected.dispatch(target)
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