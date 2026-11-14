import './ObjectProperties.css'
import type { MapObjectData } from './MapObject'
import type { LineType } from './ObjectLibrary'
import type { PowerLineData } from './PowerLine'

const POLE_TYPES = ['wooden-pole', 'concrete-pole', 'metal-pole']
const CELL_SIZE = 50
const METERS_PER_CELL = 10

type ObjectPropertiesProps = {
  objects: MapObjectData[]
  lines: PowerLineData[]
  lineTypes: LineType[]
  selectedObjectId: string | null
  selectedPowerLineId: string | null
}

function ObjectProperties({
  objects,
  lines,
  lineTypes,
  selectedObjectId,
  selectedPowerLineId,
}: ObjectPropertiesProps) {
  const line = lines.find((item) => item.id === selectedPowerLineId)
  const object = objects.find((item) => item.id === selectedObjectId)

  if (line) {
    const from = objects.find((item) => item.id === line.fromId)
    const to = objects.find((item) => item.id === line.toId)
    if (from && to) {
      const length =
        (Math.hypot(to.x - from.x, to.y - from.y) / CELL_SIZE) * METERS_PER_CELL
      const typeName = lineTypes.find((type) => type.id === line.type)?.name ?? line.type
      return (
        <aside className="object-properties">
          <dl>
            <div>
              <dt>ID</dt>
              <dd>{line.id}</dd>
            </div>
            <div>
              <dt>Тип</dt>
              <dd>{typeName}</dd>
            </div>
            <div>
              <dt>Початкова опора</dt>
              <dd>
                {from.name}, {from.id}
              </dd>
            </div>
            <div>
              <dt>Кінцева опора</dt>
              <dd>
                {to.name}, {to.id}
              </dd>
            </div>
            <div>
              <dt>Довжина</dt>
              <dd>{length.toFixed(1)} м</dd>
            </div>
          </dl>
        </aside>
      )
    }
  }

  if (object) {
    if (POLE_TYPES.includes(object.type)) {
      const connectedLines = lines.filter(
        (item) => item.fromId === object.id || item.toId === object.id,
      )
      return (
        <aside className="object-properties">
          <dl>
            <div>
              <dt>ID</dt>
              <dd>{object.id}</dd>
            </div>
            <div>
              <dt>Тип опори</dt>
              <dd>{object.name}</dd>
            </div>
            <div>
              <dt>Координати</dt>
              <dd>
                ({object.x}, {object.y})
              </dd>
            </div>
            <div>
              <dt>Підключених ліній</dt>
              <dd>{connectedLines.length}</dd>
            </div>
            {connectedLines.length > 0 && (
              <div>
                <dt>Підключені лінії</dt>
                <dd>
                  <ul className="line-list">
                    {connectedLines.map((item) => (
                      <li key={item.id}>
                        {lineTypes.find((type) => type.id === item.type)?.name ?? item.type},{' '}
                        {item.id}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
          </dl>
        </aside>
      )
    }

    const groupName =
      object.type === 'transformer' ? 'Електрична інфраструктура' : "Об'єкт місцевості"
    return (
      <aside className="object-properties">
        <dl>
          <div>
            <dt>Назва</dt>
            <dd>{object.name}</dd>
          </div>
          <div>
            <dt>Тип</dt>
            <dd>{groupName}</dd>
          </div>
          <div>
            <dt>Координати</dt>
            <dd>
              ({object.x}, {object.y})
            </dd>
          </div>
        </dl>
      </aside>
    )
  }

  return (
    <aside className="object-properties">
      <p className="empty">Оберіть об'єкт на карті</p>
    </aside>
  )
}

export default ObjectProperties