import { createSignal, Show, For, Switch, Match, onMount, onCleanup } from 'solid-js'
import { connect } from '@wagmi/core'
import { formatUnits } from 'viem'
import { config } from './wagmi.config'
import { account, chainId, initWeb3Watchers } from './web3.store'
import { nativeCurrencyName } from './networks'
import { AppState } from './constants'
import { 
  sending, setSending, 
  recipients, setRecipients, 
  appState, isReady, 
  ethBalance, refetchEthBalance,
  tokenMetadata, refetchTokenMetadata,
  refetchContract,
  setTokenAddress
} from './app.store'
import Header from './components/Header'
import Footer from './components/Footer'
import CurrencySelector from './components/CurrencySelector'
import TokenLoader from './components/TokenLoader'
import RecipientInput from './components/RecipientInput'
import TransactionSection from './components/TransactionSection'
import ComponentTestPage from './components/ComponentTestPage'
import DeployContract from './components/DeployContract'
import {
  getTotalAmount,
  getBalance as getBalanceUtil,
  getLeftAmount,
  getDisperseMessage,
  getSymbol,
  getDecimals,
  disperse_createx
} from './utils'
import type { Recipient, TokenInfo } from './types'

function App() {
  const [showTestPage, setShowTestPage] = createSignal(false);
  // Initialize Web3 watchers
  onMount(() => {
    const cleanup = initWeb3Watchers()
    onCleanup(cleanup)
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
      <div style={{ position: 'absolute', top: '1rem', right: '1rem', 'z-index': 1000 }}>
        <button onClick={() => setShowTestPage(!showTestPage())}>
          {showTestPage() ? 'Back to App' : 'Test Components'}
        </button>
      </div>

      <Switch>
        <Match when={showTestPage()}>
          <ComponentTestPage />
        </Match>
        <Match when={!showTestPage()}>
          <>
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
                <section>
                  <h2>Contract Not Deployed</h2>
                  <p>The disperse contract is not deployed on this network.</p>
                  <DeployContract onDeploy={() => refetchContract()} />
                </section>
              </Match>

              <Match when={isReady()}>
                <section>
                  <CurrencySelector onSelect={setSending} />
                  <Show when={sending() === 'ether'}>
                    <p>
                      you have {ethBalance()?.value ? formatUnits(ethBalance()!.value, 18) : '0'} {nativeCurrencyName(chainId())}
                      <Show when={ethBalance()?.value === 0n && chainId()}>
                        <span class="warning"> (make sure to add funds)</span>
                      </Show>
                    </p>
                  </Show>
                </section>
                
                <Show when={sending() === 'token'}>
                  <section>
                    <TokenLoader
                      onSelect={setTokenAddress}
                      onError={() => setSending('ether')}
                      chainId={chainId()}
                      account={account().address}
                      token={tokenMetadata()}
                      contractAddress={disperse_createx.address}
                    />
                    <Show when={tokenMetadata()?.symbol}>
                      <p class="mt">
                        you have {tokenMetadata()?.balance ? formatUnits(tokenMetadata()!.balance || 0n, tokenMetadata()!.decimals || 18) : '0'} {tokenMetadata()?.symbol}
                      </p>
                    </Show>
                  </section>
                </Show>
                
                <Show when={sending() === 'ether' || (sending() === 'token' && tokenMetadata()?.symbol)}>
                  <RecipientInput
                    sending={sending()}
                    token={tokenMetadata()}
                    onRecipientsChange={setRecipients}
                  />
                </Show>
                
                <Show when={recipients().length > 0}>
                  {(() => {
                    const token = tokenMetadata();
                    const totalAmount = getTotalAmount(recipients())
                    const balance = getBalanceUtil(sending(), token, ethBalance() || undefined)
                    const leftAmount = getLeftAmount(recipients(), sending(), token, ethBalance() || undefined)
                    const disperseMessage = getDisperseMessage(recipients(), sending(), token, ethBalance() || undefined)
                    const symbol = getSymbol(sending(), token, chainId())
                    const decimals = getDecimals(sending(), token)
                    const nativeCurrency = nativeCurrencyName(chainId())
                    
                    return (
                      <TransactionSection
                        sending={sending()}
                        recipients={recipients()}
                        token={token}
                        symbol={symbol}
                        decimals={decimals}
                        balance={balance}
                        leftAmount={leftAmount}
                        totalAmount={totalAmount}
                        disperseMessage={disperseMessage}
                        chainId={chainId()}
                        verifiedAddress={disperse_createx.address}
                        account={account().address}
                        nativeCurrencyName={nativeCurrency}
                        effectiveAllowance={token?.allowance}
                        onTransactionSuccess={() => {
                          refetchEthBalance();
                          refetchTokenMetadata();
                        }}
                      />
                    )
                  })()}
                </Show>
              </Match>
            </Switch>
            
            <Footer 
              chainId={chainId()} 
            />
          </>
        </Match>
      </Switch>
    </article>
  )
}

export default App
