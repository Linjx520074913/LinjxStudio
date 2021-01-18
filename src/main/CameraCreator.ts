import * as THREE from 'three'
import { ipcMain } from 'electron'
import { Action } from './Action'

export class CameraCreator {
    constructor () {

    }

    // 创建透视相机
    public static createPerspectiveCamera (fov?: number,
        aspect?: number,
        near?: number,
        far?: number) {
        console.log('创建透视相机')
        var camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
        camera.position.set(20, 20, 30)
        camera.lookAt(new THREE.Vector3())
        return camera

    }

    // 创建正交相机
    public static createOrthorgaphicCamera (left: number,
		right: number,
		top: number,
		bottom: number,
		near?: number,
		far?: number) {
        console.log('创建正交相机')
        var camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far)
        return camera
    }
}