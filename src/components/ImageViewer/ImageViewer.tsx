import { useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'

const ImageViewer = ({
  imageUrls,
  visible,
  defaultIndex,
  onClose
}: {
  imageUrls: string[]
  visible: boolean
  defaultIndex?: number
  onClose?: () => void
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setCurrentImageIndex(defaultIndex ?? 0)
  }, [defaultIndex])

  useEffect(() => {
    setIsOpen(visible)
  }, [visible])

  const handleSwipeRight = () => {
    prevImage()
  }

  const handleSwipeLeft = () => {
    nextImage()
  }
  const handlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight
  })

  const prevImage = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
    )
  }

  const nextImage = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
    )
  }

  const closePopup = () => {
    setIsOpen(false)
    if (onClose) onClose()
  }

  if (!isOpen) return <></>

  return (
    <div
      {...handlers}
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="">
        <div className="flex flex-col items-center">
          <button
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg mb-4 hidden md:block"
            onClick={prevImage}
            >
            Previous
          </button>
          <img
            src={imageUrls[currentImageIndex]}
            alt="Current Image"
            className="mb-4 md:h-2/3"
          />
          <button
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hidden md:block"
            onClick={nextImage}
            >
            Next
          </button>
        </div>
        <button
          className="absolute top-2 right-2 bg-gray-900 text-white px-4 py-2 rounded-full mt-4"
          onClick={closePopup}
          >
          X
        </button>
      </div>
    </div>
  )
}

export default ImageViewer
