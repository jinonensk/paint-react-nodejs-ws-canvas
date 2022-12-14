import React from 'react'
import canvasState from '../store/canvasState'
import toolState from '../store/toolState'
import '../styles/toolbar.scss'
import Brush from '../tools/Brush'
import Circle from '../tools/Circle'
import Eraser from '../tools/Eraser'
import Line from '../tools/Line'
import Rect from '../tools/Rect'

const Toolbar = () => {
  const handleBrushClick = () => {
    new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionId)
    // toolState.setTool(
    //   new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionId),
    // )
  }
  const handleRectClick = () => {
    // toolState.setTool(
    //   new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionId),
    // )
    new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionId)
  }
  const handleCircleClick = () => {
    // toolState.setTool(
    new Circle(canvasState.canvas, canvasState.socket, canvasState.sessionId)
    // )
  }
  const handleEraserClick = () => {
    // toolState.setTool(
    new Eraser(canvasState.canvas, canvasState.socket, canvasState.sessionId)
    // )
  }
  const handleLineClick = () => {
    // toolState.setTool(
    new Line(canvasState.canvas, canvasState.socket, canvasState.sessionId)
    // )
  }
  const handleChangeColor = (evt) => {
    toolState.setFillColor(evt.target.value)
  }
  const handleUndoClick = () => {
    canvasState.undo()
  }
  const handleRedoClick = () => {
    canvasState.redo()
  }

  return (
    <div className="toolbar">
      <button className="toolbar__btn brush" onClick={handleBrushClick} />
      <button className="toolbar__btn rect" onClick={handleRectClick} />
      <button className="toolbar__btn circle" onClick={handleCircleClick} />
      <button className="toolbar__btn eraser" onClick={handleEraserClick} />
      <button className="toolbar__btn line" onClick={handleLineClick} />
      <input
        type="color"
        style={{ marginLeft: 10 }}
        onChange={handleChangeColor}
      />
      <button className="toolbar__btn undo" onClick={handleUndoClick} />
      <button className="toolbar__btn redo" onClick={handleRedoClick} />
      <button className="toolbar__btn save" />
    </div>
  )
}

export default Toolbar
