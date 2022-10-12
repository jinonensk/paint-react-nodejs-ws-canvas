import Tool from './Tool'

export default class Brush extends Tool {
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
    this.ctx.moveTo(
      evt.pageX - evt.target.offsetLeft,
      evt.pageY - evt.target.offsetTop,
    )
  }
  mouseMoveHandler(evt) {
    if (this.mouseDown) {
      this.draw(
        evt.pageX - evt.target.offsetLeft,
        evt.pageY - evt.target.offsetTop,
      )
    }
  }
  mouseUpHandler() {
    this.mouseDown = false
  }
  draw(x, y) {
    this.ctx.lineTo(x, y)
    this.ctx.stroke()
    console.log('draw')
  }
}
