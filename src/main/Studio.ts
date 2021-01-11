import { protocol, BrowserWindow, ipcMain, screen } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import { LocalServer } from '../server/LocalServer'
/// 导入 package.json 信息
let pkg = require('../../package.json')
import { Action } from '../main/Action'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

export default class Studio {
  win? : BrowserWindow
  appIcon : string
  server: LocalServer

  constructor () {
    this.appIcon = 'public/imgs/orbbec.png'
    this.handleIpcMainEvent()

    this.server = new LocalServer()
    this.server.start()
  }

  /// 创建主窗口
  async createMainWindow () {
    // Create the browser window.
    this.win = new BrowserWindow({
      // width: screen.getPrimaryDisplay().workAreaSize.width,
      // height: screen.getPrimaryDisplay().workAreaSize.height,
      width: 1000,
      height: 690,
      minWidth: 1000,
      minHeight: 690,
      frame: false,
      title: pkg.name,
      icon: this.appIcon,
      webPreferences: {
        webSecurity: false,
        // Use pluginOptions.nodeIntegration, leave this alone
        // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
        nodeIntegration: (process.env
          .ELECTRON_NODE_INTEGRATION as unknown) as boolean
      }
    })

    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      await this.win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
      // if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
      createProtocol('app')
      // Load the index.html when not in development
      this.win.loadURL('app://./index.html')
    }
  }

  /// 打开开发者工具
  openDevTools () {
    console.log('[ Studio ] : invoke openDevTools');
    (this.win as BrowserWindow).webContents.openDevTools()
  }

  /// 最小化
  minimize () {
    console.log('[ Studio ] : invoke minimize');
    (this.win as BrowserWindow).minimize()
  }

  /// 最大化
  maximize () {
    console.log('[ Studio ] : invoke maximize')
    if ((this.win as BrowserWindow).isMaximized()) {
      (this.win as BrowserWindow).restore()
    } else {
      (this.win as BrowserWindow).maximize()
    }
  }

  /// 关闭
  close () {
    console.log('[ Studio ] : invoke close');
    (this.win as BrowserWindow).close()
  }

  /// 处理 ipcMain 事件 : 【minWindow】 【maxWindow】 【close】
  handleIpcMainEvent () {
    ipcMain.on('minWindow', () => {
      this.minimize()
    })
    ipcMain.on('maxWindow', () => {
      this.maximize()
    })
    ipcMain.on('closeWindow', () => {
      this.close()
    })
    ipcMain.on(Action.CREATE_OBJECT3D, (event, action) => {
      event.sender.send(Action.CREATE_OBJECT3D, action)
    })
    ipcMain.on(Action.SHOW, (event, args) => {
      event.sender.send(Action.SHOW, args)
    })
    ipcMain.on(Action.LOAD_MODEL, (event, args) => {
      event.sender.send(Action.LOAD_MODEL, args)
    })
    ipcMain.on(Action.UPDATE_SCENE_TREE, (event, args) => {
      event.sender.send(Action.UPDATE_SCENE_TREE)
    })
  }
}
