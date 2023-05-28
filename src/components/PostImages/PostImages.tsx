import { type Post } from 'applet-types'
import { getPostImages } from '../../utils/post'

export default function PostImages({ post }: { post: Post }) {
  const images = getPostImages(post)

  let ImagesList

  if (images.length === 1) {
    const imageItem = images[0]
    const imgMaxHeight = 260
    const imgMaxWidth = 300

    let imgDisplayHeight
    let imgDisplayWidth

    const imgSourceHeight = imageItem.height
    const imgSourceWidth = imageItem.width

    if (imgSourceHeight > imgSourceWidth) {
      imgDisplayHeight =
        imgSourceHeight > imgMaxHeight ? imgMaxHeight : imgSourceHeight
      imgDisplayWidth =
        (imgSourceWidth * imgDisplayHeight) / imgSourceHeight

      if (imgDisplayWidth < 100) {
        imgDisplayWidth = 100
      }
    } else {
      imgDisplayWidth =
        imgSourceWidth > imgMaxWidth ? imgMaxWidth : imgSourceWidth
      imgDisplayHeight =
        (imgSourceHeight * imgDisplayWidth) / imgSourceWidth
    }

    ImagesList = (
      <img
        src={imageItem.url + '!thumbnail'}
        className="w-full h-auto"
        style={{ maxWidth: imgMaxWidth, maxHeight: imgMaxHeight }}
      />
    )
  } else {
    const gridLayoutClass =
      images.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
    const ImagesGrid = images.map((imageItem: any, idx: number) => {
      return (
        <img
          src={imageItem.url + '!nine_grids'}
          key={idx}
          className={'w-full'}
        />
      )
    })
    ImagesList = <div className={`grid grid-flow-row gap-1 ${gridLayoutClass}`}>{ImagesGrid}</div>
  }

  return <div>{ImagesList}</div>
}
