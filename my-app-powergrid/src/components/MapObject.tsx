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
}

function MapObject({ object }: MapObjectProps) {
  return (
    <image
      href={object.icon}
      x={object.x - OBJECT_SIZE / 2}
      y={object.y - OBJECT_SIZE / 2}
      width={OBJECT_SIZE}
      height={OBJECT_SIZE}
    />
  )
}

export default MapObject