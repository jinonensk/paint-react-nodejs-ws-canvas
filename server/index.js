const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()

const PORT = process.env.PORT || 5000

app.ws('/', (ws, req) => {
  console.log('Подключение установлено')
  ws.send('ты успешно подключен')
  ws.on('message', (msg) => {
    const parsedMsg = JSON.parse(msg)
    switch (parsedMsg.method) {
      case 'connection': {
        connectionHandler(ws, parsedMsg)
        break
      }
      case 'message': {
        break
      }
      default: {
        break
      }
    }
  })
})

app.listen(PORT, () => {
  console.log('server started on port ', PORT)
})

const connectionHandler = (ws, msg) => {
  ws.id = msg.id
  broadcastConnection(ws, msg)
}

const broadcastConnection = () => {
  aWss.clients.forEach((c) => {
    if (c.id === msg.id) {
      client.send(`Пользователь ${msg.username} подключен`)
    }
  })
}
