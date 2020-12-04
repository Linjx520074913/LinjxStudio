import * as THREE from 'three'
import { ExtLight } from './ExtLight'

export class ExtSpotLight extends ExtLight {
  constructor (col: THREE.Color, pos: THREE.Vector3) {
    super(col, pos)
    this.light = new THREE.SpotLight(col)

    this.init()
  }
}
