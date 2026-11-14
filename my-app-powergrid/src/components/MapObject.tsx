import type { MouseEvent, PointerEvent } from 'react'

const OBJECT_SIZE = 50

export type MapObjectData = {
  id: string
  type: string
  name: string
  x: number
  y: number
  icon: string
}

type MapObjectProps = {
  object: MapObjectData
  isSelected: boolean
  isInteractive: boolean
  onGrab: (id: string) => void
}

function MapObject({ object, isSelected, isInteractive, onGrab }: MapObjectProps) {
  const left = object.x - OBJECT_SIZE / 2
  const top = object.y - OBJECT_SIZE / 2

  const handlePointerDown = (event: PointerEvent<SVGGElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    onGrab(object.id)
  }

  const handleClick = (event: MouseEvent<SVGGElement>) => {
    event.stopPropagation()
  }

  return (
    <g
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      style={{
        cursor: isInteractive ? 'move' : 'default',
        pointerEvents: isInteractive ? 'auto' : 'none',
      }}
    >
      {isSelected && (
        <rect
          x={left}
          y={top}
          width={OBJECT_SIZE}
          height={OBJECT_SIZE}
          fill="none"
          stroke="#2f6fed"
          strokeWidth={2}
          strokeDasharray="4"
        />
      )}
      <image href={object.icon} x={left} y={top} width={OBJECT_SIZE} height={OBJECT_SIZE} />
    </g>
  )
}

export default MapObject