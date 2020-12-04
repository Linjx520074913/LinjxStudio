import * as THREE from 'three'

export class ExtLight extends THREE.Object3D {
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
  // 灯光
  light: any
  constructor (col: THREE.Color, pos: THREE.Vector3) {
    super()
    this.col = col.clone()
    this.pos = new THREE.Vector3(pos.x, pos.y, pos.z)
    this.geometry = new THREE.SphereGeometry(0.2, 100, 100)
    this.material = new THREE.MeshBasicMaterial({
      color: col,
      wireframe: false
    })
    this.sphere = new THREE.Mesh(this.geometry, this.material)
    this.sphere.position.set(pos.x, pos.y, pos.z)
  }

  init () {
    this.light.position.set(this.pos.x, this.pos.y, this.pos.z)
    this.add(this.sphere)
    this.add(this.light)
  }
}
