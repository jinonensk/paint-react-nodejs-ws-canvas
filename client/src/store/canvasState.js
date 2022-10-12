import { makeAutoObservable } from 'mobx'

class CanvasState {
  canvas = null
  undoList = []
  redoList = []

  constructor() {
    makeAutoObservable(this)
  }

  setCanvas(canvas) {
    this.canvas = canvas
  }

  pushToUndo(data) {
    this.undoList.push(data)
  }

  pushToRedo(data) {
    this.redoList.push(data)
  }

  undo() {
    const ctx = this.canvas.getContext('2d')
    if (this.undoList.length) {
      this.redoList.push(this.canvas.toDataURL())

      const dataUrl = this.undoList.pop()
      const img = new Image()
      img.src = dataUrl
      img.onload = () => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      }
    } else {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
  }

  redo() {
    if (!this.redoList.length) return
    this.undoList.push(this.canvas.toDataURL())

    const ctx = this.canvas.getContext('2d')
    const dataUrl = this.redoList.pop()
    const img = new Image()
    img.src = dataUrl
    img.onload = () => {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
    }
  }
}

export default new CanvasState()
