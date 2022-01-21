import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { motion } from 'framer-motion'

export const LoginContainer = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  background-color: #fff;

  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
  }
`

export const LoginWrapper = styled.div`
  background-color: #fff;
  width: 40%;
  padding: 2rem;
  pointer-events: auto;

  &.disabled {
    pointer-events: none;
  }

  h1,
  p,
  img {
    text-align: center;
  }

  img {
    margin: 0 auto;
    max-width: 200px;
    display: block;
  }

  button {
    margin: 0 auto 2rem auto;
    max-width: 400px;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  @media screen and (min-width: 1200px) {
    padding: 0 3rem;
  }
`

export const LoginImageContainer = styled.div`
  background-color: #fff;
  width: 60%;
  height: 100vh;
  font-size: 0;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

export const LoginImage = styled.img`
  position: absolute;
  height: 100%;
  z-index: 1;
`

export const container = css`
  background-color: white;
  overflow: auto;
`

export const searchBox = css`
  background-color: rgba(200, 200, 200, 0.7);
  position: relative;
  z-index: 10;
`

export const header = css`
  background-image: url(https://images.unsplash.com/photo-1600518464441-9154a4dea21b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1975&q=80);
  height: 100vh;
  position: relative;

  &:before {
    inset: 0;
    content: '';
    background: rgba(0, 0, 0, 0.4);
    position: absolute;
  }
`

export const headerTitle = css`
  font-size: 48px;
  padding-top: 24px;
`

export const subtitle = css`
  color: var(--color-white);
  position: relative;
  z-index: 10;
  margin-top: 10%;
  font-weight: semibold;
  font-size: 32px;
`
export const cardContainer = css`
  gap: 16px;
`

export const tabListing = css`
  border-radius: 0;
`

export const TabContent = styled.div`
  margin-top: 16px;
  margin-left: auto;
  margin-right: auto;
  padding: 32px;
`

export const DivContainer = styled(motion.div)`
  transform: translateY(-100px);
`

export const divContainer = css`
  min-height: 200px;
`

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

export const UList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

export const List = styled.li`
  padding-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 20px;
`

export const PropertyIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-grey-light);
  padding: 16px;
  border-radius: 6px;

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
