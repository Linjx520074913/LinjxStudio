/**
 * Action 类定义各种指令，EventBus 或 ipcRenderer 或 ipcMain 发送的指令都在此定义
 */
export interface ActionParam{
    action: string,
    id: number
}
 export class Action {

    // ---------------------------------- 显示指令 ------------------------------------
    public static SHOW: string = 'show'
    // 显示网格
    public static SHOW_GRID: string = 'showGrid'
    // 显示坐标轴
    public static SHOW_AXES: string = 'showAxes'
    // 显示控制台
    public static SHOW_CONSOLE: string = 'showConsole'
    // 显示 / 隐藏 Object3D 对象
    public static TOGGLE_VISIBLE: string = 'toggleVisible'
    // -------------------------------------------------------------------------------

    public static UPDATE_SCENE_TREE: string = 'updateSceneTree'

    public static CREATE_OBJECT3D: string = 'createObject3D'
    // ---------------------------------- Light 创建指令 ------------------------------
    // 创建环境光
    public static CREATE_LIGHT_AMBIENT: string = 'createAmbientLight'
    // 创建平行光
    public static CREATE_LIGHT_DIRECTIONAL: string = 'createDirectionalLight'
    // 创建半球光
    public static CREATE_LIGHT_HEMISPHERE: string = 'createHemisphereLight'
    // 创建点光源
    public static CREATE_LIGHT_POINT: string = 'createPointLight'
    // 创建平面光
    public static CREATE_LIGHT_RECTAREA: string = 'createRectAreaLight'
    // 创建聚光灯
    public static CREATE_LIGHT_SPOT: string = 'createSpotLight'
    // -------------------------------------------------------------------------------

    // ---------------------------------- Camera 创建指令 -----------------------------
    // 创建透视相机
    public static CREATE_CAMERA_PERSPECTIVE: string = 'createPerspectiveCamera'
    // 创建正交相机
    public static CREATE_CAMERA_ORTHORGAPHIC: string = 'createOrthorgaphicCamera'
    // -------------------------------------------------------------------------------

    // ---------------------------------- 几何体 创建指令 -----------------------------
    public static CREATE_GEOMETRY_PLANE: string = 'createPlaneGeometry'

    // ---------------------------------- 模型加载指令 --------------------------------
    public static LOAD_MODEL: string = 'loadModel'

}