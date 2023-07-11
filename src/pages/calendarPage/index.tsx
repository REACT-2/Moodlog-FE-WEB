import { useParams } from 'react-router-dom'
import Calendars from '../../components/calendar'
import { TopbarWrapper } from '../../styles/common'
import { MdClose } from 'react-icons/md'
import * as S from './style'
import React, { memo } from 'react'

const CalendarPage = memo(() => {
  const params = useParams()

  return (
    <>
      <TopbarWrapper>
        <S.TopBar>
          <S.TopBarLink to={`/profile/${params.id}`}>
            <MdClose />
          </S.TopBarLink>
          <S.TopTitle>캘린더</S.TopTitle>
        </S.TopBar>
      </TopbarWrapper>
      <Calendars />
    </>
  )
})

export default CalendarPage
