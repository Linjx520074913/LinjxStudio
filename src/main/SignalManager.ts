import { sign } from "crypto"
import signals from "signals"

export class SignalManager {

    // 【最大化】信号
    _maximize: signals.Signal
    // 【最小化】信号
    _minimize: signals.Signal
    // 【退出程序】信号
    _exit: signals.Signal

    // 【添加灯光】信号
    _addLight: signals.Signal

    // 【添加几何体】信号
    _addGeometry: signals.Signal

    // 【加载模型】信号
    _loadModel: signals.Signal

    // 【 resize 】信号
    resize: signals.Signal

    // 【添加helper】信号
    helperAdded: signals.Signal
    // 【添加物体】信号
    objectAdded: signals.Signal
    // 【移除物体】信号
    objectRemoved: signals.Signal
    // 【选中物体】信号
    objectSelected: signals.Signal
    // 【不选中物体】信号
    objectDeselected: signals.Signal
    // 【显示/隐藏】 物体
    objectShown: signals.Signal
    // 【Scene 变动】信号
    sceneGraphChanged: signals.Signal

    rosbag: signals.Signal

    constructor(){

        this._maximize = new signals.Signal()
        this._minimize = new signals.Signal()
        this._exit = new signals.Signal()

        this._addLight = new signals.Signal()
        this._addGeometry = new signals.Signal()
        this.resize = new signals.Signal()
        this._loadModel = new signals.Signal()

        this.helperAdded = new signals.Signal()
        this.objectAdded = new signals.Signal()
        this.objectRemoved = new signals.Signal()
        this.objectSelected = new signals.Signal()
        this.objectDeselected = new signals.Signal()
        this.objectShown = new signals.Signal()
        this.sceneGraphChanged = new signals.Signal()

        this.rosbag = new signals.Signal()
    }
}