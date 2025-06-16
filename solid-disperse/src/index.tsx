/* @refresh reload */
import { render } from 'solid-js/web'
import './index.css'
import './css/normalize.css'
import './css/tufte.css'
import './css/disperse.css'
import App from './App.tsx'
import { initWeb3Watchers } from './web3.store'

// Initialize the watchers before rendering the app
initWeb3Watchers()

const root = document.getElementById('root')

render(() => <App />, root!)
