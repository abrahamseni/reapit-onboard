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

export const isFlexGap4 = css`
  gap: 0.75rem;
`

export const PropertyIcon = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-grey-light);
  padding: 16px;
  border-radius: var(--default-border-radius);
  cursor: pointer;
  transition: background-color 300ms ease-out;

  &:hover {
    background-color: var(--color-grey-medium);
  }

  &.blue {
    color: var(--intent-secondary);
  }
  &.green {
    color: var(--intent-success);
  }
  &.yellow {
    color: var(--intent-critical);
  }
  &.red {
    color: var(--intent-danger);
  }
`

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`

export const ApplicantCard = styled.div`
  flex: 1 1 100%;
  display: flex;
  gap: 8px;
  padding: 32px;
  box-shadow: 5px 5px 20px 0 rgba(0, 0, 0, 0.2);
  border-radius: var(--default-border-radius);
`

export const ApplicantContacts = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 35%;
`

export const FormMessage = styled.form`
  display: flex;
  width: 100%;
`

export const AgentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`

export const AgentCard = styled.div`
  flex: 1 1 100%;
  display: flex;
  gap: 8px;
  padding: 16px;
  box-shadow: 5px 5px 20px 0 rgba(0, 0, 0, 0.2);
  border-radius: var(--default-border-radius);
`

export const AgentAvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const AgentAvatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 9999px;
  object-fit: cover;
`

export const AgentCardBody = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`

export const MessageContainer = styled.div`
  display: grid;
  margin-bottom: 8px;
`

export const ReceivedMessage = styled.div`
  border: 1px solid var(--color-grey-medium);
  border-radius: 10px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-self: start;
  width: 50%;
  background-color: var(--intent-secondary-light);
`

export const SendMessage = styled.div`
  border: 1px solid var(--color-grey-medium);
  border-radius: 10px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-self: end;
  width: 50%;
  background-color: var(--intent-critical-light);
`
