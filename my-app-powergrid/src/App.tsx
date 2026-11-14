import { useState } from 'react'
import GridWorkspace from './components/GridWorkspace'
import MapObject from './components/MapObject'
import type { MapObjectData } from './components/MapObject'
import ObjectLibrary from './components/ObjectLibrary'
import type { LibraryItem, LineType } from './components/ObjectLibrary'
import PowerLine from './components/PowerLine'
import type { PowerLineData } from './components/PowerLine'
import './App.css'

const lineTypes: LineType[] = [
  { id: 'low-voltage', name: 'Низьковольтна', color: '#ffd400' },
  { id: 'medium-voltage', name: 'Середньовольтна', color: '#ff8a00' },
  { id: 'high-voltage', name: 'Високовольтна', color: '#2f80ed' },
]

const ELECTRICAL_TYPES = ['wooden-pole', 'concrete-pole', 'metal-pole', 'transformer']

function App() {
  const [selectedItem, setSelectedItem] = useState<LibraryItem | null>(null)
  const [selectedLineId, setSelectedLineId] = useState<string | null>(null)
  const [objects, setObjects] = useState<MapObjectData[]>([])
  const [lines, setLines] = useState<PowerLineData[]>([])
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null)
  const [draggingId, setDraggingId] = useState<string | null>(null)

  const handleSelect = (item: LibraryItem) => {
    setSelectedItem(item.id === selectedItem?.id ? null : item)
    setSelectedLineId(null)
    setSelectedObjectId(null)
  }

  const handleSelectLine = (id: string) => {
    setSelectedLineId(id === selectedLineId ? null : id)
    setSelectedItem(null)
    setSelectedObjectId(null)
  }

  const handleFieldClick = (x: number, y: number) => {
    if (!selectedItem) {
      setSelectedObjectId(null)
      return
    }
    const newObject: MapObjectData = {
      id: crypto.randomUUID(),
      type: selectedItem.id,
      name: selectedItem.name,
      x,
      y,
      icon: selectedItem.icon,
    }
    setObjects([...objects, newObject])
    setSelectedItem(null)
  }

  const handleLineClick = (id: string, lineType: string) => {
    const target = objects.find((object) => object.id === id)
    if (!target || !ELECTRICAL_TYPES.includes(target.type)) return
    if (!selectedObjectId) {
      setSelectedObjectId(id)
      return
    }
    if (selectedObjectId === id) return
    const start = objects.find((object) => object.id === selectedObjectId)
    if (!start) return
    if (start.type === 'transformer' && target.type === 'transformer') return
    const exists = lines.some(
      (line) =>
        (line.fromId === start.id && line.toId === id) ||
        (line.fromId === id && line.toId === start.id),
    )
    if (exists) return
    const newLine: PowerLineData = {
      id: crypto.randomUUID(),
      type: lineType,
      fromId: start.id,
      toId: id,
    }
    setLines([...lines, newLine])
    setSelectedObjectId(null)
    setSelectedLineId(null)
  }

  const handleObjectGrab = (id: string) => {
    if (selectedLineId) {
      handleLineClick(id, selectedLineId)
      return
    }
    setSelectedObjectId(id)
    setDraggingId(id)
  }

  const handleFieldPointerMove = (x: number, y: number) => {
    if (!draggingId) return
    setObjects((prev) =>
      prev.map((object) => (object.id === draggingId ? { ...object, x, y } : object)),
    )
  }

  const handleFieldPointerUp = () => {
    setDraggingId(null)
  }

  return (
    <div className="app">
      <ObjectLibrary
        selectedId={selectedItem?.id ?? null}
        onSelect={handleSelect}
        lineTypes={lineTypes}
        selectedLineId={selectedLineId}
        onSelectLine={handleSelectLine}
      />
      <main className="app-map">
        <GridWorkspace
          onFieldClick={handleFieldClick}
          onFieldPointerMove={handleFieldPointerMove}
          onFieldPointerUp={handleFieldPointerUp}
        >
          {lines.map((line) => {
            const from = objects.find((object) => object.id === line.fromId)
            const to = objects.find((object) => object.id === line.toId)
            if (!from || !to) return null
            const color = lineTypes.find((type) => type.id === line.type)?.color ?? '#888'
            return <PowerLine key={line.id} from={from} to={to} color={color} />
          })}
          {objects.map((object) => (
            <MapObject
              key={object.id}
              object={object}
              isSelected={object.id === selectedObjectId}
              isInteractive={selectedItem === null}
              onGrab={handleObjectGrab}
            />
          ))}
        </GridWorkspace>
      </main>
    </div>
  )
}

export default App