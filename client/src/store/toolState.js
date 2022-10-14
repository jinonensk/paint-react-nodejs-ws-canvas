import { makeAutoObservable } from 'mobx'

class ToolState {
  // tool = null

  fillColor = '#000000'
  strokeColor = '#000000'
  lineWidth = 1

  constructor() {
    makeAutoObservable(this)
  }

  setFillColor(color) {
    this.fillColor = color
  }
  setStrokeColor(color) {
    this.strokeColor = color
  }
  setLineWidth(width) {
    this.lineWidth = +width
  }

  setTool(tool) {
    // this.tool = tool
  }
}

export default new ToolState()
