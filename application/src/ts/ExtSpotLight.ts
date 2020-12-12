import * as THREE from 'three'
import { Color } from 'three'

export class ExtSpotLight extends THREE.SpotLight {
  // 颜色
  col: THREE.Color
  // 位置
  pos: THREE.Vector3
  // 球体网格
  sphere: THREE.Mesh
  // 球体几何体
  geometry: THREE.SphereGeometry
  // 球体材质
  material: THREE.MeshBasicMaterial

  constructor( pos: THREE.Vector3, color: THREE.Color | string | number, intensity: number, distance: number, angle: number, penumbra: number, decay: number) {
    super(color, intensity, distance, angle, penumbra);
    this.col = new THREE.Color(color)
    this.pos = new THREE.Vector3(pos.x, pos.y, pos.z)
    this.geometry = new THREE.SphereGeometry(0.2, 10, 10)
    this.material = new THREE.MeshBasicMaterial({
      color: color,
      wireframe: false
    })
    this.sphere = new THREE.Mesh(this.geometry, this.material)
    this.sphere.position.set(pos.x, pos.y, pos.z)
    this.position.set(pos.x, pos.y, pos.z)
    this.add(this.sphere)
  }

  // 更新光源及显示球位置
  updatePosition (pos: THREE.Vector3) {
    this.sphere.position.set(pos.x, pos.y, pos.z)
    this.position.set(pos.x, pos.y, pos.z)
  }
  // 更新光源及显示求大小
  updateScale (scale: THREE.Vector3){
    this.sphere.scale.set(scale.x, scale.y, scale.z)
    this.scale.set(scale.x, scale.y, scale.z)
  }
}