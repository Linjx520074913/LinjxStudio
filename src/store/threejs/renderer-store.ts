import * as THREE from 'three'

export interface InitialState {
  scene: THREE.Scene
}

const initialState: InitialState = {
  // @ts-ignore
  scene: new THREE.Scene()
}

export const RendererStore = {
  namespaced: true,
  state: initialState,
  mutations: {
  },
  actions: {

  }
}
