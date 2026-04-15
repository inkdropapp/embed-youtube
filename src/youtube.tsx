import { useRef, useState } from 'react'
import type {
  EmbeddedComponentProps,
  EmbeddingProvider
} from '@inkdropapp/types'
import { isYouTubeURL, extractVideoIdFromURL, getEmbedURL } from './utils.js'

export const PROVIDER_ID = 'embed:youtube'

const YouTube: React.FC<EmbeddedComponentProps> = props => {
  const { href } = props
  const contentFrame = useRef<HTMLIFrameElement>(null)
  const [frameId] = useState('youtube-' + Math.random())
  const videoId = href ? extractVideoIdFromURL(href) : null

  if (videoId) {
    const url = getEmbedURL(videoId, frameId)

    return (
      <iframe
        id={frameId}
        className="embed-frame"
        ref={contentFrame}
        height="344"
        src={url}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    )
  }

  return (
    <div className="embed-error">
      <p>Invalid YouTube URL. Cannot extract a video ID.</p>
    </div>
  )
}

export const youtubeProvider: EmbeddingProvider = {
  id: PROVIDER_ID,
  test: (url: string) => isYouTubeURL(url),
  getComponent: () => YouTube
}
