import { markdownRenderer } from 'inkdrop'
import { youtubeProvider, PROVIDER_ID } from './youtube.js'
import type { EmbeddingProvider } from './youtube.js'

interface MarkdownRendererWithEmbeddings {
  embeddings?: {
    register(provider: EmbeddingProvider): void
    unregister(providerId: string): void
  }
}

class InkdropPlugin {
  activate() {
    const renderer = markdownRenderer as MarkdownRendererWithEmbeddings
    if (renderer?.embeddings) {
      renderer.embeddings.register(youtubeProvider)
    }
  }

  deactivate() {
    const renderer = markdownRenderer as MarkdownRendererWithEmbeddings
    if (renderer?.embeddings) {
      renderer.embeddings.unregister(PROVIDER_ID)
    }
  }
}

const plugin = new InkdropPlugin()
export default plugin
