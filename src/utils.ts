const BASE_URLS = ['https://www.youtube.com/', 'https://youtu.be/']

export function isYouTubeURL(url: string): boolean {
  return BASE_URLS.some(baseUrl => url.startsWith(baseUrl))
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

const EMBED_PROVIDER_URL = 'https://em.ink.md/youtube.html'

export function getEmbedURL(videoId: string, frameId: string): string {
  return `${EMBED_PROVIDER_URL}?v=${encodeURIComponent(videoId)}&id=${frameId}`
}
