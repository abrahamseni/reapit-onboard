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
export const DashboardHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  height: 80px;
  border-bottom: 1px solid var(--color-grey-medium);
`

export const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 9999px;
  object-fit: cover;
  cursor: pointer;
`

export const UserContainer = styled.div`
  background-color: var(--color-grey-light);
  display: flex;
  gap: 16px;
`

export const UserImage = styled.img`
  height: 200px;
  width: 200px;
  object-fit: contain;
`

export const UserForm = styled.form`
  background-color: var(--color-white);
  padding: 1rem;
  width: 100%;
  margin: 2rem;
`

export const UserAvatarContainer = styled.div`
  display: flex;
`

export const NotificationContainer = styled.div`
  display: flex;
  position: relative;
`
export const Notification = styled.span`
  border-radius: 9999px;
  border: 1px solid var(--color-white);
  background-color: orangered;
  width: 14px;
  height: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -10%;
  right: -20%;
  cursor: pointer;
`

export const whiteText = css`
  color: var(--color-white);
`

export const textXs = css`
  font-size: var(--layout-size-1_2);
`
