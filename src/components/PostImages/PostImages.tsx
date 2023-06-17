import { type Post } from 'applet-types'
import { getPostImages } from '../../utils/post'
import { useState } from 'react'
import ImageViewer from '../ImageViewer/ImageViewer'

export default function PostImages({ post }: { post: Post }) {
  const [isOpenViewer, setIsOpenViewer] = useState(false)
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [imageIdx, setImageIdx] = useState<number>(0)
  const images = getPostImages(post)

  const handleViewImage = (idx: number) => {
    setIsOpenViewer(true)
    setImageIdx(idx)
    setImageUrls(images.map((img: any) => img.url))
  }

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
        className="w-full h-auto rounded-md"
        style={{ maxWidth: imgMaxWidth, maxHeight: imgMaxHeight }}
        onClick={() => { handleViewImage(0) }}
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
          className='w-full rounded'
          onClick={() => { handleViewImage(idx) }}
        />
      )
    })
    ImagesList = <div className={`grid grid-flow-row gap-1 ${gridLayoutClass}`}>{ImagesGrid}</div>
  }

  return (
    <>
      <div className="mt-1">{ImagesList}</div>
      <ImageViewer
        visible={isOpenViewer}
        imageUrls={imageUrls}
        defaultIndex={imageIdx}
        onClose={() => { setIsOpenViewer(false) }}></ImageViewer>
    </>
  )
}
