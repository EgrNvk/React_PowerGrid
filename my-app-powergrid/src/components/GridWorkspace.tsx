import { useState } from 'react'
import './GridWorkspace.css'

const FIELD_WIDTH = 2000
const FIELD_HEIGHT = 1250
const CELL_SIZE = 50
const MIN_ZOOM = 0.5
const MAX_ZOOM = 2
const ZOOM_STEP = 0.1

function GridWorkspace() {
  const [zoom, setZoom] = useState(1)

  const changeZoom = (next: number) => {
    const rounded = Math.round(next * 100) / 100
    setZoom(Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, rounded)))
  }

  return (
    <div className="workspace">
      <div className="workspace-zoom">
        <button onClick={() => changeZoom(zoom + ZOOM_STEP)} disabled={zoom >= MAX_ZOOM}>
          +
        </button>
        <button onClick={() => changeZoom(zoom - ZOOM_STEP)} disabled={zoom <= MIN_ZOOM}>
          −
        </button>
      </div>
      <div className="workspace-scroll">
        <svg
          width={FIELD_WIDTH * zoom}
          height={FIELD_HEIGHT * zoom}
          viewBox={`0 0 ${FIELD_WIDTH} ${FIELD_HEIGHT}`}
        >
          <defs>
            <pattern
              id="grid"
              width={CELL_SIZE}
              height={CELL_SIZE}
              patternUnits="userSpaceOnUse"
            >
              <path
                d={`M ${CELL_SIZE} 0 L 0 0 L 0 ${CELL_SIZE}`}
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width={FIELD_WIDTH} height={FIELD_HEIGHT} fill="#6a9b4f" />
          <rect width={FIELD_WIDTH} height={FIELD_HEIGHT} fill="url(#grid)" />
        </svg>
      </div>
    </div>
  )
}

export default GridWorkspace