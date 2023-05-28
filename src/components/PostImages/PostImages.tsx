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
      // 图片的展示高度
      imgDisplayHeight =
        imgSourceHeight > imgMaxHeight ? imgMaxHeight : imgSourceHeight
      // 图片的展示宽度
      imgDisplayWidth =
        (imgSourceWidth * imgDisplayHeight) / imgSourceHeight

      if (imgDisplayWidth < 100) {
        imgDisplayWidth = 100
      }
    } else {
      // 图片的展示宽度
      imgDisplayWidth =
        imgSourceWidth > imgMaxWidth ? imgMaxWidth : imgSourceWidth
      // 图片的展示高度
      imgDisplayHeight =
        (imgSourceHeight * imgDisplayWidth) / imgSourceWidth
    }

    ImagesList = (<img
      src={imageItem.url + '!thumbnail'}
      style={{ width: imgDisplayWidth, height: imgDisplayHeight }}
    />)
  } else {
    const ImagesGrid = images.map((imageItem: any, idx: number) => {
      return (
        <img
          src={imageItem.url + '!nine_grids'}
          key={idx}
      />
      )
    })
    ImagesList = (
      <div>
        {ImagesGrid}
      </div>
    )
  }

  return (
    <div>
      {ImagesList}
    </div>
  )
}
