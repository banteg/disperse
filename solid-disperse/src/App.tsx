import { createSignal, createMemo, createResource, Show, For, Switch, Match, onMount, onCleanup } from 'solid-js'
import { connect, getBalance } from '@wagmi/core'
import { formatUnits } from 'viem'
import { config } from './wagmi.config'
import { account, chainId, isConnected, initWeb3Watchers } from './web3.store'
import { chains, nativeCurrencyName } from './networks'
import { useContractVerification } from './hooks/useContractVerification'
import { useTokenAllowance } from './hooks/useTokenAllowance'
import { useAppState } from './hooks/useAppState'
import { AppState } from './constants'
import Header from './components/Header'
import Footer from './components/Footer'
import CurrencySelector from './components/CurrencySelector'
import TokenLoader from './components/TokenLoader'
import RecipientInput from './components/RecipientInput'
import TransactionSection from './components/TransactionSection'
import NetworkStatus from './components/NetworkStatus'
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
  // Initialize Web3 watchers
  onMount(() => {
    const cleanup = initWeb3Watchers()
    onCleanup(cleanup)
  })

  // Local state signals
  const [sending, setSending] = createSignal<'ether' | 'token'>('ether')
  const [token, setToken] = createSignal<TokenInfo>({})
  const [recipients, setRecipients] = createSignal<Recipient[]>([])

  // Computed values
  const isChainSupported = createMemo(() => {
    const id = chainId()
    return id ? chains.some((chain) => chain.id === id) : false
  })

  // Contract verification
  const { verifiedAddress, isLoading: isContractLoading, isContractDeployed } = useContractVerification(
    chainId,
    isConnected
  )

  // App state management
  const { appState, isReady } = useAppState({
    isConnected,
    chainId,
    isChainSupported,
    isContractDeployed,
    isContractLoading,
    sending,
    token,
    recipients,
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

  // Token allowance
  const { allowance: currentAllowance, refetch: refetchAllowance } = useTokenAllowance({
    tokenAddress: () => token().address,
    account: () => account().address,
    spender: () => verifiedAddress()?.address,
    chainId,
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

      <Switch>
        <Match when={appState() === AppState.WALLET_REQUIRED}>
          <section>
            <h2>connect to wallet</h2>
            <p>{renderConnectors()}</p>
          </section>
        </Match>

        <Match when={appState() === AppState.NETWORK_UNSUPPORTED}>
          <section>
            <h2>Unsupported Network</h2>
            <p>Please switch to a supported network.</p>
          </section>
        </Match>

        <Match when={appState() === AppState.CONTRACT_LOADING}>
          <section>
            <h2>checking contract</h2>
            <p class="pending">Verifying disperse contract on this network...</p>
          </section>
        </Match>

        <Match when={appState() === AppState.CONTRACT_NOT_DEPLOYED}>
          <NetworkStatus
            chainId={chainId()}
            isBytecodeLoading={isContractLoading()}
            isContractDeployed={isContractDeployed()}
            isConnected={isConnected()}
            verifiedAddress={verifiedAddress()}
          />
        </Match>

        <Match when={isReady()}>
          <section>
            <CurrencySelector onSelect={setSending} />
            <Show when={sending() === 'ether'}>
              <p>
                you have {balanceData()?.value ? formatUnits(balanceData()!.value, 18) : '0'} {nativeCurrencyName(chainId())}
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
                contractAddress={verifiedAddress()?.address}
              />
              <Show when={token().symbol}>
                <p class="mt">
                  you have {token().balance ? formatUnits(token().balance || 0n, token().decimals || 18) : '0'} {token().symbol}
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
              const balance = getBalanceUtil(sending(), token(), balanceData() || undefined)
              const leftAmount = getLeftAmount(recipients(), sending(), token(), balanceData() || undefined)
              const disperseMessage = getDisperseMessage(recipients(), sending(), token(), balanceData() || undefined)
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
                  verifiedAddress={verifiedAddress()}
                  account={account().address}
                  nativeCurrencyName={nativeCurrency}
                  effectiveAllowance={currentAllowance() ?? token().allowance}
                  onAllowanceChange={refetchAllowance}
                />
              )
            })()}
          </Show>
        </Match>
      </Switch>
      
      <Footer 
        chainId={chainId()} 
        verifiedAddress={verifiedAddress()} 
        isContractDeployed={isContractDeployed()} 
        isLoading={isContractLoading()}
      />
    </article>
  )
}

export default App
