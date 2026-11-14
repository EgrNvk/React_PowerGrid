import { useEffect, useRef, useState } from 'react'
import type { MouseEvent, PointerEvent, ReactNode } from 'react'
import './GridWorkspace.css'

const FIELD_WIDTH = 2000
const FIELD_HEIGHT = 1250
const CELL_SIZE = 50
const MIN_ZOOM = 0.5
const MAX_ZOOM = 2
const ZOOM_STEP = 0.1

type GridWorkspaceProps = {
  onFieldClick: (x: number, y: number) => void
  onFieldPointerMove: (x: number, y: number) => void
  onFieldPointerUp: () => void
  children?: ReactNode
}

function GridWorkspace({
  onFieldClick,
  onFieldPointerMove,
  onFieldPointerUp,
  children,
}: GridWorkspaceProps) {
  const [zoom, setZoom] = useState(1)
  const [fitScale, setFitScale] = useState(1)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = scrollRef.current
    if (!element) return
    const updateFitScale = () => {
      const scale = Math.min(
        element.clientWidth / FIELD_WIDTH,
        element.clientHeight / FIELD_HEIGHT,
      )
      setFitScale(Math.floor(scale * 1000 + 0.000001) / 1000)
    }
    updateFitScale()
    const observer = new ResizeObserver(updateFitScale)
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const changeZoom = (next: number) => {
    const rounded = Math.round(next * 100) / 100
    setZoom(Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, rounded)))
  }

  const getFieldPoint = (event: MouseEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = Math.round(((event.clientX - rect.left) * FIELD_WIDTH) / rect.width)
    const y = Math.round(((event.clientY - rect.top) * FIELD_HEIGHT) / rect.height)
    return {
      x: Math.min(FIELD_WIDTH, Math.max(0, x)),
      y: Math.min(FIELD_HEIGHT, Math.max(0, y)),
    }
  }

  const handleClick = (event: MouseEvent<SVGSVGElement>) => {
    const { x, y } = getFieldPoint(event)
    onFieldClick(x, y)
  }

  const handlePointerMove = (event: PointerEvent<SVGSVGElement>) => {
    const { x, y } = getFieldPoint(event)
    onFieldPointerMove(x, y)
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
      <div className="workspace-scroll" ref={scrollRef}>
        <svg
          width={FIELD_WIDTH * fitScale * zoom}
          height={FIELD_HEIGHT * fitScale * zoom}
          viewBox={`0 0 ${FIELD_WIDTH} ${FIELD_HEIGHT}`}
          onClick={handleClick}
          onPointerMove={handlePointerMove}
          onPointerUp={onFieldPointerUp}
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
          {children}
        </svg>
      </div>
    </div>
  )
}

export default GridWorkspace