import { throwDeprecation } from 'process'
import * as THREE from 'three'
import { Camera, PerspectiveCamera } from 'three'

export interface InitialState {
  scene: THREE.Scene,
  // transformControl: TransformControls
}

const initialState: InitialState = {
  // @ts-ignore
  scene: new THREE.Scene(),
  // transformControl: new TransformControls(new PerspectiveCamera(), new HTMLElement())
}

export const RendererStore = {
  namespaced: true,
  state: initialState,
  mutations: {
    setScene (state: any, scene: THREE.Scene) {
      state.scene = scene
    }
  },
  actions: {

  },
  getters: {
    // 根据 uuid 查找 scene 中对应的对象
    findObjectByUuid (state: any, getters: any) {
      return (uuid: String) => {
        var selectedObj
        state.scene.traverse( (child: THREE.Object3D) => {
          if (child.uuid == uuid) {
            selectedObj = child
            return
          }
        })
        return selectedObj
     }
    }
  }
}
