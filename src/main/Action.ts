/**
 * Action 类定义各种指令，EventBus 或 ipcRenderer 或 ipcMain 发送的指令都在此定义
 */
export class Action {

    // ---------------------------------- 显示指令 ------------------------------------
    // 显示网格
    public static SHOW_GRID: string = 'showGrid'
    // 显示坐标轴
    public static SHOW_AXES: string = 'showAxes'
    // 显示控制台
    public static SHOW_CONSOLE: string = 'showConsole'
    // -------------------------------------------------------------------------------

    // ---------------------------------- Light 创建指令 ------------------------------
    // 创建环境光
    public static CREATE_AMBIENT_LIGHT: string = 'createAmbientLight'
    // 创建平行光
    public static CREATE_DIRECTIONAL_LIGHT: string = 'createDirectionalLight'
    // 创建半球光
    public static CREATE_HEMISPHERE_LIGHT: string = 'createHemisphereLight'
    // 创建点光源
    public static CREATE_POINT_LIGHT: string = 'createPointLight'
    // 创建平面光
    public static CREATE_RECTAREA_LIGHT: string = 'createRectAreaLight'
    // 创建聚光灯
    public static CREATE_SPOT_LIGHT: string = 'createSpotLight'
    // -------------------------------------------------------------------------------

    // ---------------------------------- Camera 创建指令 -----------------------------
    // 创建透视相机
    public static CREATE_PERSPECTIVE_CAMERA: string = 'createPerspectiveCamera'
    // 创建正交相机
    public static CREATE_ORTHORGAPHIC_CAMERA: string = 'createOrthorgaphicCamera'
    // -------------------------------------------------------------------------------
}