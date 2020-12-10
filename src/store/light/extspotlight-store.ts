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
    updateIntensity(state: any, value: number) {
      state.instance.updateIntensity(value)
    },
    updateDistance(state: any, value: number) {
      state.instance.updateDistance(value)
    },
    updateAngle(state: any, value: number){
      state.instance.updateAngle(value)
    },
    updatePenumbra(state: any, value: number) {
      state.instance.updatePenumbra(value)
    },
    updateDecay(state: any, value: number) {
      state.instance.updateDecay(value)
    },
    updateTransform(state: any, value: THREE.Vector3) {
      state.instance.updatePosition(value)
    },
    updateScale(state: any, value: THREE.Vector3) {
      state.instance.updateScale(value)
    },
    updateRotation(state: any, value: THREE.Vector3) {
      state.instance.updateRotation(value)
    },
    enableShadow(state: any, value: boolean) {
      state.instance.enableShadow(value)
    },
    lookAt(state: any, value: THREE.Vector3){
      state.instance.lookAt(value)
    },
    show(state: any, value: boolean) {
      state.instance.show(value)
    },
    showHelper(state: any, value: boolean) {
      state.instance.showHelper(value)
    }
  },
  actions: {

  }
}
