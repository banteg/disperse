import { Component, JSX, createSignal, Show } from 'solid-js'

interface Props {
  children: JSX.Element
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props> {
  private [hasError, setHasError] = createSignal(false)
  private [error, setError] = createSignal<Error>()

  componentDidCatch(error: Error) {
    console.error('Error caught by boundary:', error)
    this.setHasError(true)
    this.setError(error)
  }

  private resetError = () => {
    this.setHasError(false)
    this.setError(undefined)
  }

  render() {
    return (
      <Show
        when={!this.hasError()}
        fallback={
          <section class="error-boundary">
            <h2>Something went wrong</h2>
            <p class="error">{this.error()?.message || 'An unexpected error occurred'}</p>
            <button onClick={this.resetError}>Try Again</button>
          </section>
        }
      >
        {this.props.children}
      </Show>
    )
  }
}

export default ErrorBoundary