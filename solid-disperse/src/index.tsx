/* @refresh reload */
import { render } from 'solid-js/web'
import { ErrorBoundary } from 'solid-js'
import './index.css'
import './css/normalize.css'
import './css/tufte.css'
import './css/disperse.css'
import App from './App.tsx'

const root = document.getElementById('root')

render(() => <App />, root!)
