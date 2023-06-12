import { createPost } from 'applet-apis'
import { Button, FieldError, Form, Label, TextAreaField } from 'applet-design'
import { useEffect, useState } from 'react'
import ChannelsCombobox from '../../components/ChannelsCombobox/ChannelsCombobox'
import { type Post } from 'applet-types'
import { useApplet } from 'applet-shell'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, channel, post } from 'applet-store'
import ImageUploader from '../../components/ImageUploader/ImageUploader'

const { channelPostAdded } = channel
const { postAdded } = post

const PostFormPage = () => {
  const applet = useApplet()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [creating, setCreating] = useState(false)
  const [files, setFiles] = useState<any>([])
  const [selectedChannel, setSelectedChannel] = useState<null | {
    title: string
    id: number
  }>(null)

  useEffect(() => {
    applet?.setHeaderTitle('Post Form')
  }, [])

  const handleChannelChange = (selectedItem: null | {
    title: string
    id: number
  }) => {
    setSelectedChannel(selectedItem)
  }

  const onSubmit = async (data: any) => {
    if (creating) return
    const { contentText } = data
    if (!contentText || contentText === '') return

    try {
      setCreating(true)
      const imgFiles: any = []
      if (files.length > 0) {
        for (let i = 0, len = files.length; i < len; i++) {
          const fileItem = files[i]
          await updateAttachment(fileItem.attachmentId, 'UPLOADED')
          imgFiles.push({ url: fileItem.url, width: fileItem.width, height: fileItem.height })
        }
      }

      const shortContent = contentText.substring(0, 100)

      let newPost

      const blocks2Create = [
        {
          content: { text: contentText },
          contentType: 'Text'
        }
      ]

      const post2Create: Post = {
        shortContent,
        blocks: blocks2Create,
        isDraft: false
      }

      if (selectedChannel) post2Create.channelId = selectedChannel.id

      if (imgFiles.length > 0) {
        post2Create.contentType = 'IMAGES_WITH_TEXT'
        for (let fileIdx = 0, fileLen = imgFiles.length;
          fileIdx < fileLen;
          fileIdx++) {
          blocks2Create
            .push({ content: imgFiles[fileIdx], contentType: 'Image' })
        }

        newPost = await createPost(post2Create)
        setFiles([])
      } else {
        post2Create.contentType = 'TEXT'
        newPost = await createPost(post2Create)
      }

      setCreating(false)

      applet?.toast.success('create post success')
      if (selectedChannel) {
        dispatch(channelPostAdded({
          newPost,
          isTimeline: false
        }))
      } else {
        dispatch(postAdded({
          newPost,
          isTimeline: false
        }))
      }

      navigate(`/posts/${newPost.id}`, { replace: true })
    } catch (e) {
      setCreating(false)
    }
  }

  const handleBack = (e: any) => {
    e.preventDefault()
    navigate(-1)
  }

  const onImagesChange = (selectedFiles: File[]) => {
    // // const { onChange } = this.props;
    // console.log('Aliyun OSS:', fileList)
    // // if (onChange) {
    // //   onChange([...fileList]);
    // // }
    // const doneFiles = fileList.filter(fileItem => fileItem.status === 'done')
    setFiles(selectedFiles)
  }

  return (
    <div className="max-w-7xl mx-auto pt-2 pb-5 sm:px-6 lg:px-8 px-4">
      <Form onSubmit={onSubmit}>
        <Label className="mt-3">Content</Label>
        <TextAreaField
          name="contentText"
          placeholder="Type your post content here"
          className="input"
          errorClassName="input error"
          validation={{ required: 'post content is required', minLength: 1, maxLength: 140 }}
        />
        <FieldError name="contentText" />

        <Label className="mt-3">Images</Label>
        <ImageUploader onChange={onImagesChange} />

        <Label className="mt-3">Timeline</Label>
        <ChannelsCombobox
          onChange={handleChannelChange}
          selected={selectedChannel} />

        <div className="mt-5">
          <Button
            variant='primary'>
            Save
          </Button>
          <Button
            className="ml-2"
            onClick={handleBack}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default PostFormPage
