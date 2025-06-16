import { createSignal, createMemo, createResource, Show, For } from 'solid-js'
import { connect, getBalance } from '@wagmi/core'
import { config } from './wagmi.config'
import { account, chainId, isConnected } from './web3.store'
import { chains, nativeCurrencyName } from './networks'
import { disperse_legacy } from './deploy'
import Header from './components/Header'
import CurrencySelector from './components/CurrencySelector'
import TokenLoader from './components/TokenLoader'
import RecipientInput from './components/RecipientInput'
import TransactionSection from './components/TransactionSection'
import {
  getTotalAmount,
  getBalance as getBalanceUtil,
  getLeftAmount,
  getDisperseMessage,
  getSymbol,
  getDecimals,
} from './utils'
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

  // Fetch ETH balance
  const [balanceData] = createResource(
    () => ({ address: account().address, chainId: chainId() }),
    async ({ address, chainId }) => {
      if (!address || !chainId) return null
      try {
        return await getBalance(config, { address, chainId })
      } catch {
        return null
      }
    }
  )

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
            <p>
              you have {balanceData()?.value ? (Number(balanceData()!.value) / 1e18).toFixed(6) : '0'} {nativeCurrencyName(chainId())}
              <Show when={balanceData()?.value === 0n && chainId()}>
                <span class="warning"> (make sure to add funds)</span>
              </Show>
            </p>
          </Show>
        </section>
        
        <Show when={sending() === 'token'}>
          <section>
            <TokenLoader
              onSelect={setToken}
              onError={() => setSending('ether')}
              chainId={chainId()}
              account={account().address}
              token={token()}
            />
            <Show when={token().symbol}>
              <p class="mt">
                you have {token().balance ? (Number(token().balance) / 10 ** (token().decimals || 18)).toFixed(6) : '0'} {token().symbol}
              </p>
            </Show>
          </section>
        </Show>
        
        <Show when={sending() === 'ether' || (sending() === 'token' && token().symbol)}>
          <RecipientInput
            sending={sending()}
            token={token()}
            onRecipientsChange={setRecipients}
          />
        </Show>
        
        <Show when={recipients().length > 0}>
          {(() => {
            const totalAmount = getTotalAmount(recipients())
            const balance = getBalanceUtil(sending(), token(), balanceData())
            const leftAmount = getLeftAmount(recipients(), sending(), token(), balanceData())
            const disperseMessage = getDisperseMessage(recipients(), sending(), token(), balanceData())
            const symbol = getSymbol(sending(), token(), chainId())
            const decimals = getDecimals(sending(), token())
            const nativeCurrency = nativeCurrencyName(chainId())
            
            return (
              <TransactionSection
                sending={sending()}
                recipients={recipients()}
                token={token()}
                symbol={symbol}
                decimals={decimals}
                balance={balance}
                leftAmount={leftAmount}
                totalAmount={totalAmount}
                disperseMessage={disperseMessage}
                chainId={chainId()}
                verifiedAddress={{ address: disperse_legacy.address as `0x${string}`, label: 'Legacy' }}
                account={account().address}
                nativeCurrencyName={nativeCurrency}
                effectiveAllowance={token().allowance}
              />
            )
          })()}
        </Show>
      </Show>
    </article>
  )
}

export default App