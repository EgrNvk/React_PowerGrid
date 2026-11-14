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
}

function PowerLine({ from, to, color }: PowerLineProps) {
  return (
    <line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke={color}
      strokeWidth={4}
      strokeLinecap="round"
    />
  )
}

export default PowerLine