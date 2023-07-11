import { useEffect, useState } from 'react'
import * as S from './style'
import { Posts } from '../../components/common/post/posts'
import { useQuery } from 'react-query'
import { getUser } from '../../apis/auth'
import Nav from '../../components/common/Nav'
import { useParams } from 'react-router-dom'
import useUserData from '../../hooks/useUserData'
import { NewUser } from '../../types/user'
import { NewPost } from '../../types/diary'
import { FollowParent, UserStyle } from '../../types/follow'
import Loading from '../../components/common/loading'
import { MdSettings } from 'react-icons/md'
import { MdClose } from 'react-icons/md'

function UserDetails({ name, number, link }: UserStyle) {
  return (
    <S.StyledLink to={link}>
      <S.UserDetailContnetText size="large">{number}</S.UserDetailContnetText>
      <S.UserDetailContnetText size="small">{name}</S.UserDetailContnetText>
    </S.StyledLink>
  )
}

function ProfilePage() {
  const params = useParams()
  const { data: own, refetch } = useUserData()
  const [profileData, setProfileData] = useState<{ post: NewPost[]; likes: number; follower: FollowParent[] }>({
    post: [],
    likes: 0,
    follower: [],
  })

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery<NewUser>(
    ['user', 'profile', params.id],
    () =>
      getUser(Number(params.id)).then((a) => {
        return a
      }),
    { staleTime: 10000, cacheTime: 10000 * 20 },
  )

  useEffect(() => {
    if (typeof profile === 'object') {
      setProfileData((profileData) => ({
        ...profileData,
        post: profile.post,
        likes: profile.likes.length,
        follower: profile.follower,
      }))
    }
  }, [profile])

  const filteredPosts = () => {
    if (!profileData.post) return

    const sortedPosts = profileData.post.sort((a, b) => {
      if (a.id > b.id) {
        return -1
      } else {
        return 1
      }
    })
    return sortedPosts
  }

  if (!profile) return <></>

  return (
    <div>
      {/* 유저 프로필 */}
      <S.UserProfile>
        {typeof own !== 'undefined' && Number(own.id) === Number(profile.id) ? (
          <S.UserSettingLink to={'/setting'}>
            설정
            <MdSettings />
          </S.UserSettingLink>
        ) : (
          <></>
        )}
        <S.UserImage>
          <img src={isLoading ? '' : profile.profile_image} alt="profile_image" />
        </S.UserImage>
        <S.UserName>{isLoading ? 'loading' : profile.username}</S.UserName>
        <S.UserIntro>{isLoading ? 'loading' : profile?.profile_message}</S.UserIntro>
        {/* 유저 세부사항 */}
        <S.UserDetail>
          <UserDetails
            name="팔로워"
            number={isLoading ? 0 : (profileData.follower?.length as number)}
            link={`/follow/${params.id}`}
          />
          <S.UserDetailIine left="108px" />
          <UserDetails name="좋아요" number={profileData.likes} link="" />
          <S.UserDetailIine left="230px" />
          <UserDetails
            name="일기 개수"
            number={isLoading ? 0 : (profileData.post?.length as number)}
            link={`/calendar/${params.id}`}
          />
        </S.UserDetail>
      </S.UserProfile>
      {/* 유저 다이어리 */}
      <S.Postss>
        <Posts posts={filteredPosts() || profileData.post} isShownUsername={false} />
      </S.Postss>
      <Nav />
    </div>
  )
}

export default ProfilePage
