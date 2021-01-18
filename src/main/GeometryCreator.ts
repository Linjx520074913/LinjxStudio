import * as THREE from 'three'

export class GeometryCreator {
    constructor () {

    }

    // 创建平面
    public static createPlaneGeometry () {
        var geometry = new THREE.PlaneGeometry( )
        var material = new THREE.MeshBasicMaterial( {color: 0xff0000, side: THREE.DoubleSide} )
        var plane = new THREE.Mesh( geometry, material )
        plane.name = '平面'
        return plane
    }

}