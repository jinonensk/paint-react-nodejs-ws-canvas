import React, { useCallback, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import canvasState from '../store/canvasState'
import toolState from '../store/toolState'
import '../styles/canvas.scss'
import Brush from '../tools/Brush'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useParams } from 'react-router-dom'

const Canvas = observer(() => {
  const [isShowModal, setIsShowModal] = useState(true)
  const canvasRef = useRef()
  const usernameRef = useRef()
  const params = useParams()

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current)
    toolState.setTool(new Brush(canvasRef.current))
  }, [])

  useEffect(() => {
    if (!canvasState.username) return
    const ws = new WebSocket('ws://localhost:5000/')
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          id: params.id,
          username: canvasState.username,
          method: 'connection',
        }),
      )
      ws.onmessage = (evt) => {
        console.log(evt.data)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, canvasState.username])

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
