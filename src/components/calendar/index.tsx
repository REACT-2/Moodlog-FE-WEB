import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import './calendar.css'
import moment from 'moment'
import { useQuery } from 'react-query'
import { getUser } from '../../apis/auth'
import { Link, useParams } from 'react-router-dom'
import { DiaryResponse } from '../../types/diary'
import { NewUser } from '../../types/user'
import Loading from '../common/loading'

function Calendars() {
  const [value, onChange] = useState<Date>(new Date())
  const [calendarState, setCalendarState] = useState<{ mark: string[]; postId: number[]; feeling: number[] }>({
    mark: [],
    postId: [],
    feeling: [],
  })

  const params = useParams()

  const {
    data: calendarsData,
    isLoading,
    error,
  } = useQuery<NewUser>(
    ['user', { page: params.id }],
    () =>
      getUser(Number(params.id)).then((a) => {
        return a
      }),
    { staleTime: 10000, cacheTime: 1000 * 40 },
  )
  useEffect(() => {
    if (calendarsData && typeof calendarsData === 'object' && typeof calendarsData.post === 'object') {
      for (const item of calendarsData.post) {
        let date = item.createdAt.split('T')
        setCalendarState((calendarState) => ({
          ...calendarState,
          mark: [...calendarState.mark, date[0]],
          postId: [...calendarState.postId, Number(item.id)],
          feeling: [...calendarState.feeling, item.feeling_code],
        }))
      }
    }
  }, [calendarsData])

  if (isLoading || !calendarsData) {
    return <Loading />
  }
  return (
    <div>
      <Calendar
        onChange={() => onChange}
        formatDay={(locale, date) => moment(date).format('DD')}
        value={value}
        className="mx-auto w-full text-sm border-b"
        tileContent={({ date, view }) => {
          if (calendarState.mark.find((x) => x === moment(date).format('YYYY-MM-DD'))) {
            let index = calendarState.mark.findIndex((x) => x === moment(date).format('YYYY-MM-DD'))
            return (
              <>
                <Link to={`/diary/${calendarState.postId[index]}`}>
                  <div className="flex justify-center items-center absoluteDiv">
                    <div className="dot">
                      <img src={`/assets/icons/mood-0${Number(calendarState.feeling[index] + 1)}.png`} width="auto" />
                    </div>
                  </div>
                </Link>
              </>
            )
          } else {
            return (
              <>
                <div className="flex justify-center items-center absoluteDiv">
                  <div className="dot"></div>
                </div>
              </>
            )
          }
        }}
      />
    </div>
  )
}

export default Calendars
