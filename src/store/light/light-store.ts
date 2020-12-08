import Vue from 'vue'
import Vuex from 'vuex'
import { ExtSpotLight } from '../../ts/ExtSpotLight'
import * as THREE from 'three'

Vue.use(Vuex)

export interface LightInitialState {
  light: ExtSpotLight
}

const initialState: LightInitialState = {
  // @ts-ignore
  light: null
}

export const lightStore = {
  namespaced: true,
  state: initialState,
  mutations: {
    setExtSpotLight(state: any, light: LightInitialState){
      state.light = light
    },
    setIntensity(state: any, value: LightInitialState) {
      state.light.intensity = value
    },
    updateTransform(state: any, value: LightInitialState) {
      state.light.updatePosition(new THREE.Vector3(value.X, value.Y, value.Z))
    },
    updateScale(state: any, value: LightInitialState) {
      state.light.updateScale(new THREE.Vector3(value.X, value.Y, value.Z))
    }
  },
  actions: {

  }
}
