import riot from 'rollup-plugin-riot'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import buble from 'rollup-plugin-buble'
import postcss from 'rollup-plugin-postcss'

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    name: 'app',
    sourcemap: true
  },
  plugins: [
    riot({
      style: 'sass',
      template: 'pug'
    }),
    postcss({
      extensions: ['.css']
    }),
    nodeResolve({ jsnext: true }),
    commonjs(),
    buble()
  ],
}
