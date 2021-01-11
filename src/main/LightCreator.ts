import * as THREE from 'three'

export class LightCreator {
    constructor () {

    }

    // 创建环境光
    public static createAmbientLight () {
        var light = new THREE.AmbientLight(0xFFFFFF) // soft white
        light.name = '环境光'
        return light
    }

    // 创建平行光
    public static createDirectionalLight () {
        console.log('创建平行光')
    }

    // 创建半球光
    public static createHemisphereLight () {
        console.log('创建半球光')
    }

    // 创建点光源
    public static createPointLight () {
        console.log('创建点光源')
    }

    // 创建平面光
    public static createRectAreaLight () {
        console.log('创建平面光')
    }

    // 创建聚光灯
    createSpotLight () {
        console.log('创建聚光灯')
    }
}