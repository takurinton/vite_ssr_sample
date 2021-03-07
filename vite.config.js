import { defineConfig } from 'vite'
import preactRefresh from '@prefresh/vite'

/**
 * @type {import('vite').UserConfig}
 */
module.exports = defineConfig({
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: `import { h, Fragment } from 'preact'`
  },
  plugins: [preactRefresh()],
  build: {
    minify: false
  }
})
