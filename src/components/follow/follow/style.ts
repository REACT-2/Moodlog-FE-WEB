import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Follow = styled.div`
  height: 60px;
  width: calc(100% - 40px);
  margin: 0 auto 17px auto;
  display: flex;
`

export const FollowImg = styled.div`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  div {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.placeholder};
  }
`

export const FollowUserIdLink = styled(Link)`
  text-decoration: none;
  width: 180px;
  height: 40px;
  margin: 0 25px;
  color: ${({ theme }) => theme.textColor};
  .email {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 27px;
    margin-bottom: 6px;
  }
  .username {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: ${({ theme }) => theme.placeholder};
  }
`

export const FollowBtn = styled.button<{ following: boolean; isTransitioning: boolean }>`
  width: 100px;
  height: 32px;
  color: ${({ following, theme }) => (following ? theme.background : theme.textColor)};
  background-color: ${({ following, theme }) => (following ? theme.main02 : 'transparent')};
  border: 2px solid ${({ theme }) => theme.main02};
  border-radius: 20px;
  margin: auto;
`

export const FollowNotBtn = styled.div`
  width: 100px;
  height: 30px;
  border: 2px solid ${({ theme }) => theme.background};
  border-radius: 10px;
  margin: auto;
  display: flex;
  p {
    margin: auto;
  }
`
