import Tool from './Tool'

export default class Rect extends Tool {
  constructor(canvas) {
    super(canvas)
    this.listen()
  }

  listen() {
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    this.canvas.onmouseup = this.mouseUpHandler.bind(this)
  }

  mouseDownHandler(evt) {
    this.mouseDown = true
    this.ctx.beginPath()
    this.startX = evt.pageX - evt.target.offsetLeft
    this.startY = evt.pageY - evt.target.offsetTop
    this.saved = this.canvas.toDataURL()
  }
  mouseMoveHandler(evt) {
    if (this.mouseDown) {
      const currentX = evt.pageX - evt.target.offsetLeft
      const currentY = evt.pageY - evt.target.offsetTop
      const width = currentX - this.startX
      const height = currentY - this.startY

      this.draw(this.startX, this.startY, width, height)
    }
  }
  mouseUpHandler() {
    this.mouseDown = false
  }
  draw(x, y, w, h) {
    const image = new Image()
    image.src = this.saved
    image.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height)
      this.ctx.beginPath()
      this.ctx.rect(x, y, w, h)
      this.ctx.fill()
      this.ctx.stroke()
    }
  }
}
