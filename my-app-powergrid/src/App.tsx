import { useState } from 'react'
import GridWorkspace from './components/GridWorkspace'
import MapObject from './components/MapObject'
import type { MapObjectData } from './components/MapObject'
import ObjectLibrary from './components/ObjectLibrary'
import type { LibraryItem } from './components/ObjectLibrary'
import './App.css'

function App() {
  const [selectedItem, setSelectedItem] = useState<LibraryItem | null>(null)
  const [objects, setObjects] = useState<MapObjectData[]>([])
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null)
  const [draggingId, setDraggingId] = useState<string | null>(null)

  const handleSelect = (item: LibraryItem) => {
    setSelectedItem(item.id === selectedItem?.id ? null : item)
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

  const handleObjectGrab = (id: string) => {
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
      <ObjectLibrary selectedId={selectedItem?.id ?? null} onSelect={handleSelect} />
      <main className="app-map">
        <GridWorkspace
          onFieldClick={handleFieldClick}
          onFieldPointerMove={handleFieldPointerMove}
          onFieldPointerUp={handleFieldPointerUp}
        >
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