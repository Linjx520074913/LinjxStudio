import { Notification } from 'electron'
const app = require('express')
const http = require('http').createServer(app)
var io = require('socket.io')(http, { serveClient: false })

const port = 8000

export class LocalServer {

  construct () {
  }

  start () {
    io.on('connection', function(socket: any) {
      console.log('A user connected')

      socket.on('login', function() {
          console.log("Receive Message : Login");
          var notification = new Notification({
            title: 'Socket',
            body: 'Recv 【Login】 Message'
          })
          notification.show()
          notification.on('click', () => {
            notification.close()
          })
      })

      socket.on('disconnecting', (reaseon: any) => {
        console.log("Receive Message : disconnecting");
          var notification = new Notification({
            title: 'Socket',
            body: 'Recv 【disconnecting】 Message'
          })
          notification.show()
          notification.on('click', () => {
            notification.close()
          })
      })
    })
    http.listen(port, () => {
      console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
    })
  }
}
