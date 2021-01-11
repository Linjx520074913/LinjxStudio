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

    // 创建网格
    public static createGrid () {
        var grid = new THREE.GridHelper(20, 20, 0x444444, 0x888888)
        // @ts-ignore
        var array = grid.geometry.attributes.color.array
        for (var i = 0; i < array.length; i += 60) {
          for (var j = 0; j < 12; j++) {
            array[i + j] = 0.26
          }
        }
        grid.name = '坐标辅助网格'
        return grid
    }

    // 创建坐标轴
    public static createAxes () {
        // 创建坐标轴

        var arrowLength = 15
        // 创建箭头
        // X 方向箭头
        var xArrow = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), arrowLength, 0xFF0000, 0.1 * arrowLength, 0.1 * arrowLength)
        xArrow.name = 'X 轴箭头'
        // Y 方向箭头
        var yArrow = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), arrowLength, 0x00FF00, 0.1 * arrowLength, 0.1 * arrowLength)
        yArrow.name = 'Y 轴箭头'

        // Z 方向箭头
        var zArrow = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), arrowLength, 0x0000FF, 3, 0.1 * arrowLength)
        zArrow.name = 'Z 轴箭头'

        var group = new THREE.Object3D()
        group.type = 'Helper'
        group.name = '坐标轴'
        group.add(xArrow)
        group.add(yArrow)
        group.add(zArrow)

        return group
    }

}