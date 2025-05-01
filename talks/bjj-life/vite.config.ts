import { defineConfig } from 'vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import seedrandom from 'seedrandom'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

export default defineConfig({
  plugins: [
    Components({
      resolvers: [IconsResolver({ prefix: 'Icon' })], // optional: allows <IconMdiShuffleVariant />
    }),
    Icons({
      autoInstall: true, // installs icon sets as needed
    }),
  ],
})
