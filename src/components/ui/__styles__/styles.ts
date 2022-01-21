import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { motion } from 'framer-motion'

export const modalBody = css`
  height: 480px;
  overflow: auto;
`
export const carouselWrapper = css`
  height: 300px;
  width: 100%;
  position: relative;
  overflow: hidden;
`
export const carouselButtons = css`
  position: absolute;
  background-color: rgba(200, 200, 200, 0.2);
  height: 100%;
  display: flex;
  align-items: center;
  transition: background-color 300ms ease-in;
  cursor: pointer;
  z-index: 10;

  &:hover {
    background-color: rgba(200, 200, 200, 0.5);
  }
`
export const right = css`
  right: 0;
`
export const left = css`
  left: 0;
`
export const CarouselImagesContainer = styled(motion.div)`
  display: flex;
  gap: 16px;
  height: 100%;
`
export const CarouselImage = styled.img`
  flex: 1 1 auto;
  border-radius: 6px;
`
