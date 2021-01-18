import { sign } from "crypto"
import signals from "signals"

export class SignalManager {

    // 【最大化】信号
    maximize: signals.Signal
    // 【最小化】信号
    minimize: signals.Signal
    // 【退出程序】信号
    exit: signals.Signal

    // 【添加灯光】信号
    addLight: signals.Signal

    // 【添加几何体】信号
    addGeometry: signals.Signal

    // 【加载模型】信号
    loadModel: signals.Signal

    // 【 resize 】信号
    resize: signals.Signal

    // 【添加物体】信号
    objectAdded: signals.Signal
    // 【移除物体】信号
    objectRemoved: signals.Signal
    // 【选中物体】信号
    objectSelected: signals.Signal
    // 【显示/隐藏】 物体
    objectShown: signals.Signal
    // 【Scene 变动】信号
    sceneGraphChanged: signals.Signal

    constructor(){

        this.maximize = new signals.Signal()
        this.minimize = new signals.Signal()
        this.exit = new signals.Signal()

        this.addLight = new signals.Signal()
        this.addGeometry = new signals.Signal()
        this.resize = new signals.Signal()
        this.loadModel = new signals.Signal()

        this.objectAdded = new signals.Signal()
        this.objectRemoved = new signals.Signal()
        this.objectSelected = new signals.Signal()
        this.objectShown = new signals.Signal()
        this.sceneGraphChanged = new signals.Signal()
    }
}