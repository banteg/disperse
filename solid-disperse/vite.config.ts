import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [
    solid(),
    nodePolyfills({
      // For Buffer
      protocolImports: true,
    }),
  ],
})
