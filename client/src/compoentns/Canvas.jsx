import React, { useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import canvasState from '../store/canvasState'
import toolState from '../store/toolState'
import '../styles/canvas.scss'
import Brush from '../tools/Brush'
import Rect from '../tools/Rect'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useParams } from 'react-router-dom'
import Line from '../tools/Line'
import Circle from '../tools/Circle'
import Eraser from '../tools/Eraser'

const Canvas = observer(() => {
  const [isShowModal, setIsShowModal] = useState(true)
  const canvasRef = useRef()
  const usernameRef = useRef()
  const params = useParams()

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current)
  }, [])

  useEffect(() => {
    if (!canvasState.username) return
    const ws = new WebSocket('ws://localhost:5000/')
    canvasState.setSocket(ws)
    canvasState.setSessionId(params.id)
    toolState.setTool(new Brush(canvasRef.current, ws, params.id))

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          id: params.id,
          username: canvasState.username,
          method: 'connection',
        }),
      )
      ws.onmessage = (evt) => {
        const msg = JSON.parse(evt.data)
        switch (msg.method) {
          case 'connection': {
            console.log(`Пользоваель ${msg.username} подключен`)
            break
          }
          case 'draw': {
            drawHandler(msg)
            break
          }
          default: {
            break
          }
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, canvasState.username])

  const drawHandler = (msg) => {
    const figure = msg.figure
    const ctx = canvasRef.current.getContext('2d')
    switch (figure.type) {
      case 'brush':
        Brush.draw(ctx, figure)
        break
      case 'rect':
        Rect.staticDraw(ctx, figure)
        break
      case 'line':
        Line.staticDraw(ctx, figure)
        break
      case 'circle':
        Circle.staticDraw(ctx, figure)
        break
      case 'eraser':
        Eraser.draw(ctx, figure)
        break
      case 'finish':
        ctx.beginPath()
        break
      default: {
      }
    }
  }

  const handleMouseDown = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL())
  }

  const connectionHadnler = () => {
    canvasState.setUsername(usernameRef.current.value)
    setIsShowModal(false)
  }

  return (
    <div className="canvas">
      <Modal show={isShowModal} onHide={() => null}>
        <Modal.Header closeButton>
          <Modal.Title>Введите ваше имя</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" ref={usernameRef} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => connectionHadnler()}>
            Войти
          </Button>
        </Modal.Footer>
      </Modal>
      <canvas
        onMouseDown={handleMouseDown}
        ref={canvasRef}
        width={600}
        height={400}
      />
    </div>
  )
})

export default Canvas
