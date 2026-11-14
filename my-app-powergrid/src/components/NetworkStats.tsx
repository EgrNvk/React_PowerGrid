import './NetworkStats.css'
import type { MapObjectData } from './MapObject'
import type { PowerLineData } from './PowerLine'

const POLE_TYPES = ['wooden-pole', 'concrete-pole', 'metal-pole']
const CELL_SIZE = 50
const METERS_PER_CELL = 10

type NetworkStatsProps = {
  objects: MapObjectData[]
  lines: PowerLineData[]
}

function NetworkStats({ objects, lines }: NetworkStatsProps) {
  const poleCount = objects.filter((object) => POLE_TYPES.includes(object.type)).length
  const transformerCount = objects.filter((object) => object.type === 'transformer').length
  const totalLength = lines.reduce((sum, line) => {
    const from = objects.find((object) => object.id === line.fromId)
    const to = objects.find((object) => object.id === line.toId)
    if (!from || !to) return sum
    return sum + (Math.hypot(to.x - from.x, to.y - from.y) / CELL_SIZE) * METERS_PER_CELL
  }, 0)

  return (
    <footer className="network-stats">
      <strong>Статистика мережі:</strong>
      <span>Опор: {poleCount}</span>
      <span>Ліній: {lines.length}</span>
      <span>Загальна довжина: {totalLength.toFixed(1)} м</span>
      <span>Трансформаторів: {transformerCount}</span>
    </footer>
  )
}

export default NetworkStats