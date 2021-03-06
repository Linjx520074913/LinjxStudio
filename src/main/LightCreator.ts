import * as THREE from 'three'

export enum LightType {
    AMBIENT_LIGHT,
    DIRECTIONAL_LIGHT,
    HEMISPHERE_LIGHT,
    POINT_LIGHT,
    RECTAREA_LIGHT,
    SPOT_LIGHT
}

let DEFAULT_COLOR = 0xFFFFFF

export class LightCreator {

    constructor () {

    }

    public static createLight(type: LightType) {
        switch(type){
            case LightType.AMBIENT_LIGHT:
                return this.createAmbientLight()
            case LightType.DIRECTIONAL_LIGHT:
                return this.createDirectionalLight()
            case LightType.HEMISPHERE_LIGHT:
                return this.createHemisphereLight()
            case LightType.POINT_LIGHT:
                return this.createPointLight()
            case LightType.RECTAREA_LIGHT:
                return this.createRectAreaLight()
            case LightType.SPOT_LIGHT:
                return this.createSpotLight()
            default:
        }
        return this.createAmbientLight()
    }

    // 创建环境光
    static createAmbientLight () {
        var light = new THREE.AmbientLight(DEFAULT_COLOR) // soft white
        light.name = '环境光'
        return light
    }

    // 创建平行光
    static createDirectionalLight () {
        console.log('创建平行光')
        var light = new THREE.DirectionalLight(DEFAULT_COLOR, 0.5)
        light.name = '平行光'
        light.position.set(0, 20, 0)
        return light
    }

    // 创建半球光
    static createHemisphereLight () {
        var light = new THREE.AmbientLight(DEFAULT_COLOR) // soft white
        light.name = '环境光'
        return light
    }

    // 创建点光源
    static createPointLight () {
        var light = new THREE.AmbientLight(DEFAULT_COLOR) // soft white
        light.name = '环境光'
        return light
    }

    // 创建平面光
    static createRectAreaLight () {
        console.log('创建平面光')
        var light = new THREE.AmbientLight(DEFAULT_COLOR) // soft white
        light.name = '环境光'
        return light
    }

    // 创建聚光灯
    static createSpotLight () {
        console.log('创建聚光灯')
        var light = new THREE.SpotLight(DEFAULT_COLOR, 1, 20, Math.PI / 6) // soft white
        light.position.set(0, 10, 10)
        light.lookAt(new THREE.Vector3(0, 0, 0))
        light.name = '聚光灯'
        return light
    }
}