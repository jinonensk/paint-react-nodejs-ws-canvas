import toolState from '../store/toolState'
import Tool from './Tool'

export default class Circle extends Tool {
  constructor(canvas, socket, id) {
    super(canvas, socket, id)
    this.listen()
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    this.canvas.onmouseup = this.mouseUpHandler.bind(this)
  }

  mouseUpHandler(e) {
    this.mouseDown = false
    this.socket.send(
      JSON.stringify({
        method: 'draw',
        id: this.id,
        figure: {
          type: 'circle',
          x: this.startX,
          y: this.startY,
          r: this.r,
          fillStyle: toolState.fillColor,
          strokeStyle: toolState.strokeColor,
        },
      }),
    )
  }

  mouseDownHandler(e) {
    this.mouseDown = true
    let canvasData = this.canvas.toDataURL()
    this.ctx.beginPath()
    this.startX = e.pageX - e.target.offsetLeft
    this.startY = e.pageY - e.target.offsetTop
    this.saved = canvasData
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      const curentX = e.pageX - e.target.offsetLeft
      const curentY = e.pageY - e.target.offsetTop
      const width = curentX - this.startX
      const height = curentY - this.startY
      this.r = Math.sqrt(width ** 2 + height ** 2)
      this.draw()
    }
  }

  draw() {
    const img = new Image()
    img.src = this.saved
    img.onload = async function () {
      this.ctx.fillStyle = toolState.fillColor
      this.ctx.strokeStyle = toolState.strokeColor
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      this.ctx.beginPath()
      this.ctx.arc(this.startX, this.startY, this.r, 0, 2 * Math.PI)
      this.ctx.fill()
      this.ctx.stroke()
    }.bind(this)
  }

  static staticDraw(ctx, { x, y, r, fillStyle, strokeStyle }) {
    ctx.fillStyle = fillStyle
    ctx.strokeStyle = strokeStyle
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()
  }
}
