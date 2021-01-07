/**
 * ObjectCreator 用于创建 Object3D 对象，
 * 包括基础几何体 ：如平面，正方形，圆形等，
 * 包括光源 ：如平行光，环境光等
 * 包括相机 ：如正交相机，透视相机等
 * 通过 ipcMain 监听创建对象指令，创建出相应对象，并添加到 scene 中
 */

import { CameraCreator } from './CameraCreator'
import { LightCreator } from './LightCreator'

export class ObjectCreator {

    cameraCreator: CameraCreator
    lightCreator: LightCreator

    constructor () {
        this.cameraCreator = new CameraCreator()
        this.lightCreator = new LightCreator()
    }

    // 监听对象创建事件
    listenCreationEvents () {
       this.cameraCreator.handleCreationEvents()
       this.lightCreator.handleCreationEvents()
    }
}