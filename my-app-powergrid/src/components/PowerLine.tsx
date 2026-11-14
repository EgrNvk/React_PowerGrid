import type { MapObjectData } from './MapObject'

export type PowerLineData = {
  id: string
  type: string
  fromId: string
  toId: string
}

type PowerLineProps = {
  from: MapObjectData
  to: MapObjectData
  color: string
  isInteractive: boolean
  onClick: () => void
}

function PowerLine({ from, to, color, isInteractive, onClick }: PowerLineProps) {
  return (
    <g
      onClick={onClick}
      style={{
        pointerEvents: isInteractive ? 'auto' : 'none',
        cursor: isInteractive ? 'pointer' : 'default',
      }}
    >
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="transparent" strokeWidth={16} />
    </g>
  )
}

export default PowerLine