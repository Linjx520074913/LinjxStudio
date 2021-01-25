//@ts-ignore
import { open, TimeUtil, Bag, ReadResult } from 'rosbag'
import { Editor } from '../main/Editor'

var flag: boolean = true

export class Rosbag {
    constructor () {

    }

    public static async open (fileFullPath: string) {
        // 异步打开 rosbag 文件
        const bag = await open(fileFullPath)
        const { startTime, endTime, chunkInfos } = bag
        this.readMessages(bag)
        // 起始时间
        // var startTime = bag.startTime
        // // 结束时间
        // var endTime = bag.endTime
        // // 时间差
        // var duration = TimeUtil.compare(endTime, startTime)
    }

    public static async readMessages (bag: Bag) {
        bag.readMessages({topics: ['/device_0/info']}, (res: ReadResult) => {
            const { topic, chunkOffset, totalChunks } = res
            Editor.getInstance()._signalManager.rosbag.dispatch(res)
        })
    }
}

