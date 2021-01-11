import { resolve } from 'dns'
import * as THREE from 'three'
import { Object3D } from 'three'
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader'

export class ModelLoader {

    constructor () {

    }


    public static  load (path: string ): Promise<Object3D> {

        return new Promise( (resolve, reject) => {
            // 获取打开的模型文件的后缀
            // @ts-ignore
            var extension = path.split('.').pop().toLowerCase()
            switch(extension){
                case 'dae':
                    // 【NOTE】:
                    // 如果想要让模型产生阴影，那么应该对该模型所有类型为 THREE.Mesh
                    // 的子节点设置 castShadow = true 属性，不能简单得对模型对象设置 castShadow = true
                    var colladaLoader = new ColladaLoader()
                    colladaLoader.load(path, function (collada) {
                        // @ts-ignore
                        collada.name = 'collada'
                        collada.scene.traverse(function(child){
                            if (child instanceof THREE.Mesh) {
                                //设置模型生成阴影并接收阴影
                                child.castShadow = true
                                child.receiveShadow = true
                            }
                        })
                        resolve(collada.scene)
                    })

                    break
                default:
                    resolve(new Object3D())
                    break
            }
        })
    }
}