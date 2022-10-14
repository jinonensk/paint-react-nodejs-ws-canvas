import toolState from '../store/toolState'
import Tool from './Tool'

export default class Line extends Tool {
  constructor(canvas, socket, id) {
    super(canvas, socket, id)
    this.listen()
    this.name = 'Line'
  }

  listen() {
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
  }

  mouseUpHandler(e) {
    this.mouseDown = false
    this.socket.send(
      JSON.stringify({
        method: 'draw',
        id: this.id,
        figure: {
          type: 'line',
          currentX: this.currentX,
          currentY: this.currentY,
          startX: this.startX,
          startY: this.startY,
          strokeStyle: toolState.fillColor,
        },
      }),
    )
  }

  mouseDownHandler(e) {
    this.mouseDown = true
    this.startX = e.pageX - e.target.offsetLeft
    this.startY = e.pageY - e.target.offsetTop
    this.ctx.beginPath()
    this.ctx.moveTo(this.startX, this.startY)
    this.saved = this.canvas.toDataURL()
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      this.currentX = e.pageX - e.target.offsetLeft
      this.currentY = e.pageY - e.target.offsetTop
      this.draw()
    }
  }

  draw() {
    const img = new Image()
    img.src = this.saved
    img.onload = async function () {
      this.ctx.strokeStyle = toolState.fillColor
      this.ctx.lineWidht = toolState.lineWidth
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      this.ctx.beginPath()
      this.ctx.moveTo(this.startX, this.startY)
      this.ctx.lineTo(this.currentX, this.currentY)
      this.ctx.stroke()
    }.bind(this)
  }

  static staticDraw(ctx, { currentX, currentY, startX, startY, strokeStyle }) {
    ctx.strokeStyle = strokeStyle
    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.lineTo(currentX, currentY)
    ctx.stroke()
  }
}
