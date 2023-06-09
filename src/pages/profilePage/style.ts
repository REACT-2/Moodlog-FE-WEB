import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

// 유저 프로필
export const UserProfile = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 217px;
  background: ${({ theme }) => theme.white01};
  color: ${({ theme }) => theme.textColor};
`

export const UserDetail = styled.div`
  position: absolute;
  display: flex;
  width: calc(100% - 50px);
  height: 70px;
  left: 25px;
  top: 127px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.main01};
`

export const StyledLink = styled(Link)`
  text-decoration: none;
  width: 33.3%;
  height: 100%;
  color: ${({ theme }) => theme.buttonText};
`

export const UserDetailContnetText = styled.div<{ size: string }>`
  font-style: normal;
  font-weight: ${(props) => (props.size === 'large' ? 500 : 400)};
  font-size: ${(props) => (props.size === 'large' ? '18px' : '12px')};
  margin-top: ${(props) => (props.size === 'large' ? '13px' : '10px')};
  align-items: center;
  text-align: center;
`

export const UserDetailIine = styled.div<{ left: string }>`
  position: absolute;
  left: ${(props) => props.left};
  top: 33px;
  width: 35px;
  height: 0px;
  border: 1.5px solid ${({ theme }) => theme.buttonText};
  border-radius: 1px;
  transform: rotate(90deg);
`

export const UserSettingLink = styled(Link)`
  position: absolute;
  width: 30px;
  height: 30px;
  left: 374px;
  top: 27px;
  font-size: 0;
  text-indent: -999;
  background-size: 30px;
  color: ${({ theme }) => theme.textColor};
  svg {
    width: 30px;
    height: 30px;
  }
`

export const UserImage = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;
  left: 22px;
  top: 27px;
  border-radius: 50%;
  background: #747474;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`

export const UserName = styled.div`
  position: absolute;
  width: 148px;
  height: 21px;
  left: 124px;
  top: 28px;

  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
`

export const UserIntro = styled.div`
  position: absolute;
  width: 65%;
  height: 50px;
  left: 124px;
  top: 62px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.modalBlack};
`

export const Postss = styled.div`
  position: absolute;
  top: 217px;
  height: 482px;
  width: 88%;
  margin: 0 6% 0 6%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`
