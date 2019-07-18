import riot from 'rollup-plugin-riot'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import buble from 'rollup-plugin-buble'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import bundleSize from 'rollup-plugin-bundle-size'

const plugins = [
  riot({
    style: 'sass',
    template: 'pug'
  }),
  postcss({
    extensions: ['.css']
  }),
  nodeResolve({ jsnext: true }),
  commonjs(),
  buble({transforms: { asyncAwait: false }}),
  bundleSize(),
]

if (process.env.BUILD === 'production') {
  plugins.push(
    terser()
  )
}

export default {
  input: 'src/main.js',
  output: {
    file: 'docs/bundle.js',
    format: 'iife',
    name: 'app',
    sourcemap: true
  },
  plugins: plugins,
}
