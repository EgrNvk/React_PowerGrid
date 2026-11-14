import { useState } from 'react'
import './ObjectLibrary.css'
import woodenPole from '../assets/icons/wooden-pole.png'
import concretePole from '../assets/icons/concrete-pole.png'
import metalPole from '../assets/icons/metal-pole.png'
import transformer from '../assets/icons/transformator.png'
import house from '../assets/icons/private-house.png'
import industrialBuilding from '../assets/icons/industrial-building.png'
import tree from '../assets/icons/tree.png'
import road from '../assets/icons/road.png'
import water from '../assets/icons/water.webp'
import powerLine from '../assets/icons/Power Line.png'

export type LibraryItem = {
  id: string
  name: string
  icon: string
}

export type LineType = {
  id: string
  name: string
  color: string
}

type ObjectLibraryProps = {
  selectedId: string | null
  onSelect: (item: LibraryItem) => void
  lineTypes: LineType[]
  selectedLineId: string | null
  onSelectLine: (id: string) => void
}

const poleItems: LibraryItem[] = [
  { id: 'wooden-pole', name: "Дерев'яна опора", icon: woodenPole },
  { id: 'concrete-pole', name: 'Бетонна опора', icon: concretePole },
  { id: 'metal-pole', name: 'Металева опора', icon: metalPole },
]

const transformerItems: LibraryItem[] = [
  { id: 'transformer', name: 'Трансформатор', icon: transformer },
]

const buildingItems: LibraryItem[] = [
  { id: 'house', name: 'Житловий будинок', icon: house },
  { id: 'industrial-building', name: 'Промислова будівля', icon: industrialBuilding },
]

const otherItems: LibraryItem[] = [
  { id: 'tree', name: 'Дерево', icon: tree },
  { id: 'road', name: 'Дорога', icon: road },
  { id: 'water', name: 'Водойма', icon: water },
]

function ObjectLibrary({
  selectedId,
  onSelect,
  lineTypes,
  selectedLineId,
  onSelectLine,
}: ObjectLibraryProps) {
  const [isPolesOpen, setIsPolesOpen] = useState(false)
  const [isBuildingsOpen, setIsBuildingsOpen] = useState(false)
  const [isLinesOpen, setIsLinesOpen] = useState(false)

  const renderItem = (item: LibraryItem) => (
    <li
      key={item.id}
      className={item.id === selectedId ? 'library-row selected' : 'library-row'}
      onClick={() => onSelect(item)}
    >
      <img src={item.icon} alt={item.name} />
      <span>{item.name}</span>
    </li>
  )

  const renderLineType = (lineType: LineType) => (
    <li
      key={lineType.id}
      className={lineType.id === selectedLineId ? 'library-row selected' : 'library-row'}
      onClick={() => onSelectLine(lineType.id)}
    >
      <span className="line-swatch" style={{ background: lineType.color }} />
      <span>{lineType.name}</span>
    </li>
  )

  return (
    <aside className="object-library">
      <button className="library-row" onClick={() => setIsPolesOpen(!isPolesOpen)}>
        <img src={metalPole} alt="Опора" />
        <span>Опора</span>
        <span className="library-chevron">{isPolesOpen ? '⌃' : '⌄'}</span>
      </button>
      {isPolesOpen && <ul className="library-sub">{poleItems.map(renderItem)}</ul>}
      <ul>{transformerItems.map(renderItem)}</ul>
      <button className="library-row" onClick={() => setIsBuildingsOpen(!isBuildingsOpen)}>
        <img src={house} alt="Будівлі" />
        <span>Будівлі</span>
        <span className="library-chevron">{isBuildingsOpen ? '⌃' : '⌄'}</span>
      </button>
      {isBuildingsOpen && <ul className="library-sub">{buildingItems.map(renderItem)}</ul>}
      <ul>{otherItems.map(renderItem)}</ul>
      <button className="library-row" onClick={() => setIsLinesOpen(!isLinesOpen)}>
        <img src={powerLine} alt="Лінія" />
        <span>Лінія</span>
        <span className="library-chevron">{isLinesOpen ? '⌃' : '⌄'}</span>
      </button>
      {isLinesOpen && <ul className="library-sub">{lineTypes.map(renderLineType)}</ul>}
    </aside>
  )
}

export default ObjectLibrary