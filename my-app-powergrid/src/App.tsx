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

  const handleSelect = (item: LibraryItem) => {
    setSelectedItem(item.id === selectedItem?.id ? null : item)
  }

  const handleFieldClick = (x: number, y: number) => {
    if (!selectedItem) return
    const newObject: MapObjectData = {
      id: crypto.randomUUID(),
      type: selectedItem.id,
      name: selectedItem.name,
      x,
      y,
      icon: selectedItem.icon,
    }
    setObjects([...objects, newObject])
  }

  return (
    <div className="app">
      <ObjectLibrary selectedId={selectedItem?.id ?? null} onSelect={handleSelect} />
      <main className="app-map">
        <GridWorkspace onFieldClick={handleFieldClick}>
          {objects.map((object) => (
            <MapObject key={object.id} object={object} />
          ))}
        </GridWorkspace>
      </main>
    </div>
  )
}

export default App