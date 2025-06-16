/* @refresh reload */
import { render } from 'solid-js/web'
import { ErrorBoundary } from 'solid-js'
import './index.css'
import './css/normalize.css'
import './css/tufte.css'
import './css/disperse.css'
import App from './App.tsx'
import { initWeb3Watchers } from './web3.store'

// Initialize the watchers before rendering the app
initWeb3Watchers()

const root = document.getElementById('root')

render(() => (
  <ErrorBoundary
    fallback={(err, reset) => (
      <section class="error-boundary">
        <h2>Something went wrong</h2>
        <p class="error">{err.message || 'An unexpected error occurred'}</p>
        <button onClick={reset}>Try Again</button>
      </section>
    )}
  >
    <App />
  </ErrorBoundary>
), root!)
