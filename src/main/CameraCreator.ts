import { ipcMain } from 'electron'
import { Action } from './Action'

export class CameraCreator {
    constructor () {

    }

    handleCreationEvents () {
        ipcMain.on(Action.CREATE_PERSPECTIVE_CAMERA, this.createPerspectiveCamera)
        ipcMain.on(Action.CREATE_ORTHORGAPHIC_CAMERA,this.createOrthorgaphicCamera)
    }

    // 创建透视相机
    createPerspectiveCamera () {
        console.log('创建透视相机')
    }

    // 创建正交相机
    createOrthorgaphicCamera () {
        console.log('创建正交相机')
    }
}