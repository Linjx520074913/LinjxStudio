import { BrowserWindow } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import path from 'path'

export default class AboutWindow {

    win : BrowserWindow
    /**
     *
     * @param parent : 父窗口对象
     */
    constructor (parent : BrowserWindow) {
        this.createWindow(parent)
    }

    async createWindow (parent : BrowserWindow) {
        // Create the browser window.
        this.win = new BrowserWindow({
            width: 500,
            height: 500,
            minWidth: 500,
            minHeight: 500,
            frame: false,
            parent: parent,
            modal: true,
            webPreferences: {
                webSecurity: false,
                // Use pluginOptions.nodeIntegration, leave this alone
                // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
                nodeIntegration: (process.env
                    .ELECTRON_NODE_INTEGRATION as unknown) as boolean
            }
        })

        this.win.webContents.openDevTools()
        // Or load a local HTML file
        console.log(`file://${__dirname}/app/index.html`)
        this.win.loadURL(`file://${__dirname}/../public/about.html`)

        // if (process.env.WEBPACK_DEV_SERVER_URL) {
        //     console.log('============= A ' + process.env.WEBPACK_DEV_SERVER_URL)
        //     // Load the url of the dev server if in development mode
        //     await this.win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
        //     // if (!process.env.IS_TEST) win.webContents.openDevTools()
        // } else {
        //     console.log('============= B')
        //     createProtocol('app')
        //     // Load the index.html when not in development
        //     this.win.loadURL('app://./about.html')
        // }
    }
}