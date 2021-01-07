import { ipcMain } from 'electron'
import { Action } from './Action'

export class LightCreator {
    constructor () {

    }

    handleCreationEvents () {
        ipcMain.on(Action.CREATE_AMBIENT_LIGHT,     this.createAmbientLight)
        ipcMain.on(Action.CREATE_DIRECTIONAL_LIGHT, this.createDirectionalLight)
        ipcMain.on(Action.CREATE_HEMISPHERE_LIGHT,  this.createHemisphereLight)
        ipcMain.on(Action.CREATE_POINT_LIGHT,       this.createPointLight)
        ipcMain.on(Action.CREATE_RECTAREA_LIGHT,    this.createRectAreaLight)
        ipcMain.on(Action.CREATE_SPOT_LIGHT,        this.createSpotLight)
    }

    // 创建环境光
    createAmbientLight () {
        console.log('创建环境光')
    }

    // 创建平行光
    createDirectionalLight () {
        console.log('创建平行光')
    }

    // 创建半球光
    createHemisphereLight () {
        console.log('创建半球光')
    }

    // 创建点光源
    createPointLight () {
        console.log('创建点光源')
    }

    // 创建平面光
    createRectAreaLight () {
        console.log('创建平面光')
    }

    // 创建聚光灯
    createSpotLight () {
        console.log('创建聚光灯')
    }
}