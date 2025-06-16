import { createSignal, createMemo, Show, For } from 'solid-js'
import { connect } from '@wagmi/core'
import { config } from './wagmi.config'
import { account, chainId, isConnected } from './web3.store'
import { chains } from './networks'
import Header from './components/Header'
import CurrencySelector from './components/CurrencySelector'
import type { Recipient, TokenInfo } from './types'

function App() {
  // Local state signals
  const [sending, setSending] = createSignal<'ether' | 'token'>('ether')
  const [token, setToken] = createSignal<TokenInfo>({})
  const [recipients, setRecipients] = createSignal<Recipient[]>([])

  // Computed values
  const isChainSupported = createMemo(() => {
    const id = chainId()
    return id ? chains.some((chain) => chain.id === id) : false
  })

  // Connect handlers
  const handleConnect = async (connector: any) => {
    try {
      await connect(config, { connector })
    } catch (error) {
      console.error('Failed to connect:', error)
    }
  }

  // Render wallet connectors
  const renderConnectors = () => (
    <div>
      <For each={config.connectors}>
        {(connector) => (
          <input
            type="submit"
            value={connector.name}
            onClick={() => handleConnect(connector)}
            style={{ 'margin-right': '10px', 'margin-bottom': '10px' }}
          />
        )}
      </For>
    </div>
  )

  return (
    <article>
      <Header chainId={chainId()} address={account().address} />

      <Show when={!isConnected()}>
        <section>
          <h2>connect to wallet</h2>
          <p>{renderConnectors()}</p>
        </section>
      </Show>

      <Show when={isConnected() && !isChainSupported()}>
        <section>
          <h2>Unsupported Network</h2>
          <p>Please switch to a supported network.</p>
        </section>
      </Show>

      <Show when={isConnected() && isChainSupported()}>
        <section>
          <CurrencySelector onSelect={setSending} />
          <Show when={sending() === 'ether'}>
            <p>Native currency selected</p>
          </Show>
          <Show when={sending() === 'token'}>
            <p>Token mode selected - TokenLoader component coming soon</p>
          </Show>
        </section>
      </Show>
    </article>
  )
}

export default App