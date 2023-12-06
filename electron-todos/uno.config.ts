// uno.config.ts
import { defineConfig } from 'unocss'
import Icons from 'unocss/preset-icons'

export default defineConfig({
  // ...UnoCSS options
  presets: [
    Icons()
  ]
})