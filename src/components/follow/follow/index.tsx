import { useMutation } from 'react-query'
import * as S from './style'
import { following as postFollow } from '../../../apis/diary'
import { FollowProp } from '../../../types/follow'
import { useState } from 'react'
import useUserData from '../../../hooks/useUserData'

function Follow({ follower, following, own, refetch }: FollowProp) {
  const { mutate: addFollowMutation } = useMutation(() => postFollow(Number(follower.following.id)))
  const [isFollowing, setIsFollowing] = useState(following.includes(follower.following.id))
  const [isTransitioning, setIsTransitioning] = useState(false)

  const toggleFollow = async () => {
    if (isTransitioning) return
    setIsTransitioning(true)

    try {
      await addFollowMutation()
      refetch()
      setIsFollowing((prevIsFollowing) => !prevIsFollowing)
    } catch (error) {
      console.error('Failed to toggle follow:', error)
    } finally {
      setIsTransitioning(false)
    }
  }

  return (
    <S.Follow>
      <S.FollowImg>
        {follower.following.profile_image ? <img src={follower.following.profile_image} /> : <div></div>}
      </S.FollowImg>
      <S.FollowUserIdLink to={`/profile/${follower.following.id}`}>
        <p className="email">{follower.following.email}</p>
        <p className="username">{follower.following.username}</p>
      </S.FollowUserIdLink>
      {own !== Number(follower.following.id) ? (
        <S.FollowBtn following={isFollowing} onClick={toggleFollow} isTransitioning={isTransitioning}>
          {isFollowing ? '팔로잉' : '팔로우'}
        </S.FollowBtn>
      ) : (
        <S.FollowNotBtn>
          <p>본인</p>
        </S.FollowNotBtn>
      )}
    </S.Follow>
  )
}

export default Follow
