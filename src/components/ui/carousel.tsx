import { cx } from '@linaria/core'
import { FlexContainer, Icon } from '@reapit/elements'
import { useAnimation } from 'framer-motion'
import * as React from 'react'
import {
  carouselButtons,
  CarouselImage,
  CarouselImagesContainer,
  carouselWrapper,
  left,
  right,
} from './__styles__/styles'

const images = [
  'https://images.unsplash.com/photo-1549517045-bc93de075e53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
  'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  'https://images.unsplash.com/photo-1568605115459-4b731184f961?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  'https://images.unsplash.com/photo-1558150519-b37626b5f763?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  'https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
]

const Carousel = () => {
  const controls = useAnimation()
  const [imageIndex, setImageIndex] = React.useState(0)
  const imagesRef = React.useRef<HTMLDivElement>(null)

  const renderImages = () => {
    // const indexToShow = imageIndex % images.length

    // let copyImages = images.slice(indexToShow)
    // if (indexToShow !== 0) {
    //   copyImages = copyImages.concat(images.slice(0, indexToShow))
    // }
    return images.map((image, idx) => {
      return <CarouselImage key={idx} src={image} alt="house" />
    })
  }

  React.useEffect(() => {
    if (imagesRef.current !== null) {
      const imageChildren = Array.from(imagesRef.current.children)
      const xPost = imageChildren.map((c) => c.getBoundingClientRect().x)
      const intervalLength = (Math.max(...xPost) - Math.min(...xPost)) / (xPost.length - 1)

      controls.start({
        x: imageIndex * intervalLength,
        transition: {
          duration: 0.5,
        },
      })
    }
  }, [imageIndex])

  return (
    <FlexContainer className={carouselWrapper} isFlexAlignCenter>
      <Icon
        icon="arrowLeftSystem"
        className={cx(carouselButtons, left)}
        iconSize="medium"
        onClick={() => {
          console.log('imageIndex', imageIndex, images.length)
          if (imageIndex === -images.length + 1) return
          setImageIndex(imageIndex - 1)
        }}
      />
      <div style={{ height: '100%' }}>
        <CarouselImagesContainer ref={imagesRef} animate={controls}>
          {renderImages()}
        </CarouselImagesContainer>
      </div>
      <Icon
        icon="arrowRightSystem"
        className={cx(carouselButtons, right)}
        iconSize="medium"
        onClick={() => {
          if (imageIndex === 0) return
          setImageIndex(imageIndex + 1)
        }}
      />
    </FlexContainer>
  )
}

export default Carousel
