import { editor } from 'inkdrop'
import type { Extension } from '@codemirror/state'
import type { LinkFormatItem, LinkFormatsConfig } from '@inkdropapp/types'
import { isYouTubeURL, extractVideoIdFromURL, getEmbedURL } from './utils.js'

function getYouTubeIframe(videoId: string): string {
  const src = getEmbedURL(videoId, videoId)
  return [
    `<iframe width="560" height="315"`,
    ` src="${src}"`,
    ` frameborder="0"`,
    ` allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"`,
    ` referrerpolicy="strict-origin-when-cross-origin"`,
    ` allowfullscreen></iframe>`
  ].join('')
}

function getInitialFormats(url: string): LinkFormatItem[] {
  if (!isYouTubeURL(url)) return []

  const videoId = extractVideoIdFromURL(url)
  if (!videoId) return []

  const content = getYouTubeIframe(videoId)
  return [
    {
      type: 'youtube-embed',
      label: 'YouTube embed',
      detail: '<iframe ...>',
      content,
      order: 50
    }
  ]
}

const config: LinkFormatsConfig = {
  getInitialFormats
}

export function youtubeLinkFormatExtension(): Extension {
  return editor.linkFormatsConfig.of(config)
}
