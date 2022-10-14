import toolState from '../store/toolState'
import Tool from './Tool'

export default class Rect extends Tool {
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
          type: 'rect',
          x: this.startX,
          y: this.startY,
          width: this.width,
          height: this.height,
          fillStyle: toolState.fillColor,
          strokeStyle: toolState.strokeColor,
        },
      }),
    )
  }
  mouseDownHandler(e) {
    console.log('mouseDownHandler')
    this.mouseDown = true
    this.ctx.beginPath()
    this.startX = e.pageX - e.target.offsetLeft
    this.startY = e.pageY - e.target.offsetTop
    this.saved = this.canvas.toDataURL()
  }
  mouseMoveHandler(e) {
    if (this.mouseDown) {
      let currentX = e.pageX - e.target.offsetLeft
      let currentY = e.pageY - e.target.offsetTop
      this.width = currentX - this.startX
      this.height = currentY - this.startY
      this.draw()
    }
  }

  draw() {
    const img = new Image()
    img.src = this.saved
    img.onload = () => {
      this.ctx.fillStyle = toolState.fillColor
      this.ctx.strokeStyle = toolState.strokeColor
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      this.ctx.beginPath()
      this.ctx.rect(this.startX, this.startY, this.width, this.height)
      this.ctx.fill()
      this.ctx.stroke()
    }
  }

  static staticDraw(ctx, { x, y, width, height, fillStyle, strokeStyle }) {
    ctx.fillStyle = fillStyle
    ctx.strokeStyle = strokeStyle
    ctx.beginPath()
    ctx.rect(x, y, width, height)
    ctx.fill()
    ctx.stroke()
  }
}
