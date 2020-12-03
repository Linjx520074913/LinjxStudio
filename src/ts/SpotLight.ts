import * as THREE from 'three'
export class SpotLight {
  // 颜色
  color: THREE.Color
  // 位置
  position: THREE.Vector3
  // 球体网格
  sphere: THREE.Mesh
  // 球体几何体
  geometry: THREE.SphereGeometry
  // 球体材质
  material: THREE.MeshBasicMaterial
  // 灯光
  light: THREE.SpotLight
  constructor (col: THREE.Color, pos: THREE.Vector3) {
    this.color = col
    this.position = pos
    this.geometry = new THREE.SphereGeometry(0.2, 100, 100)
    this.material = new THREE.MeshBasicMaterial({
      color: col,
      wireframe: false
    })
    this.sphere = new THREE.Mesh(this.geometry, this.material)
    this.sphere.position.set(pos.x, pos.y, pos.z)

    this.light = new THREE.SpotLight(col)
    this.light.position.set(pos.x, pos.y, pos.z)
  }

  attachToScene (scene: THREE.Scene): void{
    scene.add(this.light)
    scene.add(this.sphere)
  }
}
