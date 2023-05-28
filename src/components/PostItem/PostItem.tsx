
import { type Post } from 'applet-types'
import { fromNow } from '../../utils/time'
import ImagesWithText from './ImagesWithText'
import DefaultPost from './DefaultPost'

export default function PostItem({ postItem }: { postItem: Post }) {
  const buildBody = () => {
    const { contentType } = postItem

    if (contentType === 'DOCUMENT') {
      return (
        <div>contact user service</div>
      )
    } else if (postItem.contentFormat && ['MARKDOWN', 'JSON'].includes(postItem.contentFormat)) {
      return (
        <div>contact user service</div>
      )
    } else if (contentType === 'IMAGES_WITH_TEXT') {
      return (
        <ImagesWithText
          post={postItem}
          key={postItem.id} />
      )
    } else {
      return (
        <DefaultPost
          post={postItem}
          key={postItem.id} />
      )
    }
  }

  return (
    <div>
      <img
        src={postItem.author?.avatarUrl}
        alt="img" />
      <div>
        <div>
          <div>
            <div>
              {postItem.author?.name}
            </div>
            <div>
              Created at
              {' '}
              {fromNow(postItem.createdAt ?? '')}
            </div>
          </div>
        </div>
        {buildBody()}
      </div>
    </div>
  )
}
