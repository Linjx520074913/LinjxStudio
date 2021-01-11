import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { ipcRenderer } from 'electron'
import { Action, ActionParam } from './Action'
import { GeometryCreator } from './GeometryCreator'
import { GridHelper, Object3D } from 'three'
import { LightCreator } from './LightCreator'
import { ModelLoader } from './ModelLoader'
import Stats from 'three/examples/jsm/libs/stats.module'

interface ThreeJSItem {
    id: number
    scene: THREE.Scene
    camera: THREE.Camera
    renderer: THREE.Renderer
    orbitControls: OrbitControls

    // 是否渲染的标志
    renderFlag: boolean
}

export class ThreeJSEngine{

    private static instance: ThreeJSEngine

    private threeJSItems: ThreeJSItem[]

    // 辅助网格
    public grid: GridHelper
    // 坐标轴
    public axes: Object3D
    // 性能控件
    // public stats: Stats

    private constructor() {
        this.threeJSItems = []

        this.grid = GeometryCreator.createGrid()
        this.axes = GeometryCreator.createAxes()
        // this.stats = Stats()
        // document.body.appendChild( this.stats.dom )
        this.handleIpcEvent()
        this.render()
    }

    public static getInstance(): ThreeJSEngine{
        if(null == this.instance){
            this.instance = new ThreeJSEngine()
        }
        return this.instance
    }

    // 监听 ipc 事件
    handleIpcEvent () {
        ipcRenderer.on(Action.SHOW, (event, args: ActionParam) => { this.toggleVisible(args) })
        ipcRenderer.on(Action.CREATE_OBJECT3D, (event, action) => { this.addNewObject(action)})
        ipcRenderer.on(Action.LOAD_MODEL, (event, path) => { 
            ModelLoader.load(path).then( (model) => {
                if(model != null){
                    this.addToScene(model)
                }
            })
         })
    }

    // 添加一组 scene + camera + render 进行渲染
    addThreeJSItem (item: ThreeJSItem) {
        if(!this.isThreeJSItemExist(item)){
            item.scene.add(this.grid)
            item.scene.add(this.axes)
            this.threeJSItems.push(item)
            ipcRenderer.send(Action.UPDATE_SCENE_TREE)
        }
    }

    // 对象是否存在
    isThreeJSItemExist (item: ThreeJSItem){
        if(this.threeJSItems && this.threeJSItems.length > 0){
            for(var i of this.threeJSItems){
                if(i.scene.uuid != item.scene.uuid ||
                   i.camera.uuid != item.camera.uuid ||
                   i.renderer.domElement != item.renderer.domElement){
                    return false
                }
            }
            return true
        }
        return false
    }

    addToScene (obj: Object3D){
        if(this.threeJSItems && this.threeJSItems.length > 0){
            this.threeJSItems[0].scene.add(obj)
            ipcRenderer.send(Action.UPDATE_SCENE_TREE)
        }
    }

    addNewObject (action: string) {
        var obj: Object3D
        switch(action){
            case Action.CREATE_GEOMETRY_PLANE:
                obj = GeometryCreator.createPlaneGeometry()
                break
            case Action.CREATE_LIGHT_AMBIENT:
                obj = LightCreator.createAmbientLight()
                break
            default:
                obj = new Object3D()
                break
        }
        this.addToScene(obj)
    }

    // 根据 uuid 查找 scene 中对应的对象
    findObjectById (id: number) {
        return this.getScene().getObjectById(id)
    }

    // 移除 uuid 对应的对象
    removeObjectById (id: number) {
        var target = this.findObjectById(id)
        if(target != null){
            this.getScene().remove(target)
        }
    }

    // uuid 对应的对象类型是否为 helper
    isHelper (id: number){
        var target = this.findObjectById(id)
        while(target != null){
            if(target.type.includes("Helper")){
                return true
            }else{
                if(target.parent != null){
                    target = target.parent
                }else{
                    return false
                }
            }
        }
        return false
    }

    // 切换 visible 状态
    toggleVisible (args: ActionParam) {
        var target
        switch(args.action){
            case Action.SHOW_GRID:
                target = this.grid
                break
            case Action.SHOW_AXES:
                target = this.axes
                break
            default:
                target = this.findObjectById(args.id)
                break
        }
        if(target != null){
            target.visible = !target.visible
        }
    }

    public getScene () {
        return this.threeJSItems[0].scene
    }

    // 渲染
    render () {
        // https://stackoverflow.com/questions/19459449/running-requestanimationframe-from-within-a-new-object
        requestAnimationFrame(this.render.bind(this))

        if(this.threeJSItems && this.threeJSItems.length > 0){
            for(var item of this.threeJSItems){
                if(item.renderFlag){
                    item.renderer.render(item.scene, item.camera)
                }
            }
        }

        // this.stats.update()
    }

}