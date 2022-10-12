import React from 'react'
import toolState from '../store/toolState'
import '../styles/toolbar.scss'

const SettingBar = () => {
  const handleLineWidthChange = (evt) => {
    toolState.setLineWidth(evt.target.value)
  }
  const handleStrokeColorChange = (evt) => {
    toolState.setStrokeColor(evt.target.value)
  }

  return (
    <div className="setting-bar">
      <label htmlFor="line-with">Толщина линии</label>
      <input
        type="number"
        id="line-width"
        style={{ margin: '0 10px' }}
        defaultValue={1}
        min={1}
        max={50}
        onChange={handleLineWidthChange}
      />
      <label htmlFor="stroke-color">Цвет обводки</label>
      <input
        type="color"
        id="stroke-color"
        onChange={handleStrokeColorChange}
      />
    </div>
  )
}

export default SettingBar
