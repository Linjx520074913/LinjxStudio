import { ExtSpotLight } from '../../ts/ExtSpotLight'
import * as THREE from 'three'

export interface InitialState {
  instance: ExtSpotLight
}

const initialState: InitialState = {
  // @ts-ignore
  instance: null
}

export const ExtSpotLightStore = {
  namespaced: true,
  state: initialState,
  mutations: {
    setExtSpotLight(state: any, light: ExtSpotLight){
      state.instance = light
    },
    setIntensity(state: any, value: THREE.Vector3) {
      state.instance.intensity = value
    },
    updateTransform(state: any, value: THREE.Vector3) {
      state.instance.updatePosition(new THREE.Vector3(value.x, value.y, value.z))
    },
    updateScale(state: any, value: THREE.Vector3) {
      state.instance.updateScale(new THREE.Vector3(value.x, value.y, value.z))
    },
    show(state: any, value: boolean) {
      console.log('[Recv] : ' + value)
      state.instance.light.show(value)
    }
  },
  actions: {

  }
}
