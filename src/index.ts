import { markdownRenderer } from 'inkdrop'
import type { Extension } from '@codemirror/state'
import { youtubeProvider, PROVIDER_ID } from './youtube.js'
import { youtubeLinkFormatExtension } from './link-format.js'

class InkdropPlugin {
  private extension: Extension | null = null

  activate() {
    markdownRenderer.embeddings.register(youtubeProvider)

    this.extension = youtubeLinkFormatExtension()
    inkdrop.onEditorLoad(() => {
      inkdrop.commands.dispatch(document.body, 'editor:add-extension', {
        extension: this.extension
      })
    })
  }

  deactivate() {
    markdownRenderer.embeddings.unregister(PROVIDER_ID)

    if (this.extension) {
      inkdrop.commands.dispatch(document.body, 'editor:remove-extension', {
        extension: this.extension
      })
      this.extension = null
    }
  }
}

const plugin = new InkdropPlugin()
export default plugin
