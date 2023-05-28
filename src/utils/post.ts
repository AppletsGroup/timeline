import { type Post } from 'applet-types'

export function getPostTextContent(post: Post) {
  const { postBlocks } = post
  const textBlock = postBlocks?.find(
    (blockItem) => blockItem.block.contentType === 'Text'
  )

  if (!textBlock) return null

  return textBlock.block.content.text
}

export function getPostTitle(post: Post) {
  const textBlock = post.postBlocks?.find(postBlock => postBlock.block.contentType === 'Text')

  return textBlock.block.content.title
}

export function getPostImages(post: Post) {
  const postBlocks = post.postBlocks ?? []

  const files: any = []
  for (let i = 0, len = postBlocks.length; i < len; i++) {
    const postBlockItem = postBlocks[i]
    if (postBlockItem.block.contentType === 'Image') {
      files.push(postBlockItem.block.content)
    }
  }

  return files
}
