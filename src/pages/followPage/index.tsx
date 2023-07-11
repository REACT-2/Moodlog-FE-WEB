import { useParams } from 'react-router-dom'
import { TopbarWrapper } from '../../styles/common'
import * as S from './style'
import { useQuery, useQueryClient } from 'react-query'
import { useEffect, useState } from 'react'
import { getUser } from '../../apis/auth'
import useUserData from '../../hooks/useUserData'
import { FollowParent } from '../../types/follow'
import { NewUser } from '../../types/user'
import Loading from '../../components/common/loading'
import FollowList from '../../components/follow/follows'
import { MdClose } from 'react-icons/md'

function FollowPage() {
  const params = useParams()
  const { data: own } = useUserData()
  const quertClient = useQueryClient()

  const handleRefetch = () => {
    quertClient.invalidateQueries('user')
  }

  const [following, setFollowing] = useState<number[]>([])
  const [follower, setFollower] = useState<FollowParent[]>([])

  const {
    data: FollowingData,
    isLoading,
    error,
    refetch,
  } = useQuery<NewUser>(['user', { page: params.id }], () =>
    getUser(Number(params.id)).then((a) => {
      return a
    }),
  )

  useEffect(() => {
    // 내가 방문한 페이지의 유저를 팔로잉한 사람들의 데이터
    if (typeof FollowingData !== 'undefined') {
      setFollower((follower) => FollowingData.follower)
    }
    //
    if (typeof own !== 'undefined') {
      setFollowing([])
      for (const followingData of own.following) {
        setFollowing((following) => [...following, followingData.follower.id])
      }
    }
  }, [FollowingData, own])

  if (!FollowingData || !own) return <></>

  return (
    <>
      <TopbarWrapper>
        <S.TopBar>
          <S.TopBarLink to={`/profile/${params.id}`}>
            <MdClose />
          </S.TopBarLink>
          <S.TopTitle>팔로워 목록</S.TopTitle>
        </S.TopBar>
      </TopbarWrapper>
      <FollowList following={following} follower={follower} own={own.id} refetch={handleRefetch} />
    </>
  )
}
export default FollowPage
