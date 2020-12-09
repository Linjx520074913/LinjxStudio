import * as THREE from 'three'
import { Color, Object3D } from 'three'

export class ExtSpotLight extends THREE.SpotLightHelper{
  // 球体网格
  sphere: THREE.Mesh
  // 球体几何体
  geometry: THREE.SphereGeometry
  // 球体材质
  material: THREE.MeshBasicMaterial

  constructor( pos: THREE.Vector3, color: THREE.Color | string | number, intensity: number, distance: number, angle: number, penumbra: number, decay: number) {
    var light = new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay)
    super(light)
    this.geometry = new THREE.SphereGeometry(0.2, 10, 10)
    this.material = new THREE.MeshBasicMaterial({
      color: color,
      wireframe: false
    })
    this.sphere = new THREE.Mesh(this.geometry, this.material)
    this.sphere.position.set(0, 0, 0)

    this.add(this.sphere)
    this.updatePosition(pos)
  }

  // 更新光源及显示球位置
  updatePosition (pos: THREE.Vector3) {
    console.log(this)
    this.light.position.set(pos.x, pos.y, pos.z)
    this.update()
  }
  // 更新光源及显示求大小
  updateScale (scale: THREE.Vector3){
    // this.sphere.scale.set(scale.x, scale.y, scale.z)
    // this.scale.set(scale.x, scale.y, scale.z)
  }

  show (isVisible: boolean) {
    console.log('[SHOW] ' + isVisible)
    this.sphere.visible = isVisible
  }

  isVisible () {
    return true
  }
}