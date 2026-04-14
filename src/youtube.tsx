import * as React from 'react'
import { useRef, useState } from 'react'
import type { JSX } from 'react'

const BASE_URLS = ['https://www.youtube.com/', 'https://youtu.be/']
const EMBED_PROVIDER_URL =
  'https://inkdrop-embed-provider.vercel.app/youtube.html'

export const PROVIDER_ID = 'embed:youtube'

type EmbeddedComponentProps = JSX.IntrinsicElements['a']

export interface EmbeddingProvider {
  id: string
  test: (url: string) => boolean
  getComponent: () => React.FC<EmbeddedComponentProps>
}

export function extractVideoIdFromURL(url: string): string | null {
  if (url.startsWith('https://www.youtube.com/')) {
    const query = new URLSearchParams(url.split('?')[1])
    return query.get('v')
  } else if (url.startsWith('https://youtu.be/')) {
    const parts = url.split('/')
    const lastPart = parts[parts.length - 1]
    return lastPart.split('?')[0]
  }
  return null
}

const YouTube: React.FC<EmbeddedComponentProps> = props => {
  const { href } = props
  const contentFrame = useRef<HTMLIFrameElement>(null)
  const [frameId] = useState('youtube-' + Math.random())
  const videoId = href ? extractVideoIdFromURL(href) : null

  if (videoId) {
    const url = `${EMBED_PROVIDER_URL}?v=${encodeURIComponent(videoId)}&id=${frameId}`

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
  test: (url: string) => BASE_URLS.some(baseUrl => url.startsWith(baseUrl)),
  getComponent: () => YouTube
}
