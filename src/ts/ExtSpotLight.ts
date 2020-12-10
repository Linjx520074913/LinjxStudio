import * as THREE from 'three'
import { Color, Object3D, SpotLightHelper } from 'three'

export class ExtSpotLight extends Object3D{
  // 球体网格
  sphere: THREE.Mesh
  // 球体几何体
  geometry: THREE.SphereGeometry
  // 球体材质
  material: THREE.MeshBasicMaterial
  light: THREE.SpotLight
  helper: THREE.SpotLightHelper
  
  constructor( pos: THREE.Vector3, color: THREE.Color | string | number, intensity: number, distance: number, angle: number, penumbra: number, decay: number) {
    super()
    // 创建圆球体
    this.geometry = new THREE.SphereGeometry(0.2, 10, 10)
    this.material = new THREE.MeshBasicMaterial({
      color: color,
      wireframe: false
    })
    this.sphere = new THREE.Mesh(this.geometry, this.material)
    this.sphere.position.set(0, 0, 0)

    // 创建 SpotLight 及 SpotLightHelper
    this.light = new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay)
    this.light.position.set(0, 0, 0)
    this.helper = new SpotLightHelper(this.light)
    this.add(this.sphere)
    this.add(this.light)
    this.add(this.helper)
    this.updatePosition(pos)
  }

  // 更新光源及显示球位置
  updatePosition (pos: THREE.Vector3) {
    console.log('update [ ' + pos.x + ', ' + pos.y + ', ' + pos.z + ' ]')
    this.position.set(pos.x, pos.y, pos.z)
    this.helper.matrix = this.light.matrix
    // this.sphere.position.set(pos.x, pos.y, pos.z)
    // this.light.position.set(pos.x, pos.y, pos.z)
    this.helper.update()
  }
  // 更新光源及显示求大小
  updateScale (scale: THREE.Vector3){
    // this.sphere.scale.set(scale.x, scale.y, scale.z)
    // this.scale.set(scale.x, scale.y, scale.z)
  }

  show (visible: boolean) {
    // this.sphere.visible = visible
    this.visible = visible
  }

  showHelper (visible: boolean) {
    this.sphere.visible = visible
    this.helper.visible = visible
  }

  // 光源是否可见
  isLightVisible () {
    return this.visible
  }

  // 光源辅助线是否可见
  isHelperVisible () {
    return this.helper.visible
  }
}