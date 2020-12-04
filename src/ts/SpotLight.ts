import * as THREE from 'three'
import Light from './Light'

export class SpotLight extends Light {
  constructor (col: THREE.Color, pos: THREE.Vector3) {
    super(col, pos)
    this.light = new THREE.SpotLight(col)
    this.light.position.set(pos.x, pos.y, pos.z)
  }
}
