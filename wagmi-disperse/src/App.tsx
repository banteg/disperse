import { useState, useEffect, useRef, useCallback } from 'react'
import { useAccount, useConnect, useChainId, useBalance } from 'wagmi'
import { formatUnits, parseUnits, isAddress } from 'viem'

import { AppState } from './constants'
import { nativeSymbol, networkName } from './networks'
import { disperse } from './contracts'
import { TokenInfo, Recipient } from './types'
import DisperseAddresses from './components/DisperseAddresses'
import TokenLoader from './components/TokenLoader'
import CurrencySelector from './components/CurrencySelector'
import Header from './components/Header'
import TransactionButton from './components/TransactionButton'

// Debug function to log state changes
const debug = (message: string, data?: any) => {
  console.log(`[DEBUG] ${message}`, data || '')
}

function App() {
  const chainId = useChainId()
  const { address, status, isConnected } = useAccount()
  const { data: balanceData } = useBalance({
    address,
    watch: true,
  })
  const { connectors, connect } = useConnect()

  const [appState, setAppState] = useState<AppState>(AppState.UNLOCK_METAMASK) // Start with unlock state
  const [sending, setSending] = useState<'ether' | 'token' | null>('ether') // Default to ether
  const [recipients, setRecipients] = useState<Recipient[]>([])
  const [token, setToken] = useState<TokenInfo>({})
  const walletStatus = status === 'connected' ? `logged in as ${address}` : 'please unlock wallet'
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Log state changes when they occur
  useEffect(() => {
    debug(`AppState changed to: ${AppState[appState]}`)
  }, [appState])

  useEffect(() => {
    debug(`Sending type changed to: ${sending}`)
  }, [sending])

  useEffect(() => {
    debug('Token updated:', token)
  }, [token])

  // Create stable callback functions
  const parseAmounts = useCallback(() => {
    if (!textareaRef.current) return
    debug('Parsing amounts from textarea')

    const pattern = /(0x[0-9a-fA-F]{40}).+?([0-9\.]+)/g
    const text = textareaRef.current.value
    const newRecipients: Recipient[] = []
    let result

    const decimals = sending === 'token' ? token.decimals ?? 18 : 18

    while ((result = pattern.exec(text)) !== null) {
      if (isAddress(result[1])) {
        newRecipients.push({
          address: result[1] as `0x${string}`,
          value: parseUnits(result[2], decimals)
        })
      }
    }

    debug(`Found ${newRecipients.length} recipients`, newRecipients)
    setRecipients(newRecipients)
    if (newRecipients.length) {
      setAppState(AppState.ENTERED_AMOUNTS)
    }
  }, [sending, token.decimals]) // Only include actual dependencies

  // Update app state based on wallet connection
  useEffect(() => {
    if (status === 'reconnecting' || status === 'connecting') return
    
    debug(`Wallet status: ${status}, isConnected: ${isConnected}, chainId: ${chainId}`)
    
    if (status === 'disconnected') {
      setAppState(AppState.UNLOCK_METAMASK)
    } else if (isConnected && !disperse.address[chainId as keyof typeof disperse.address]) {
      setAppState(AppState.NETWORK_UNAVAILABLE)
    } else if (isConnected) {
      setAppState(AppState.CONNECTED_TO_WALLET)
      // Only call parseAmounts if we're already in a state where it makes sense
      if (sending === 'ether' && textareaRef.current?.value) {
        parseAmounts()
      }
    }
  }, [status, isConnected, chainId, parseAmounts, sending])

  useEffect(() => {
    // Set textarea placeholder when component mounts
    if (textareaRef.current) {
      textareaRef.current.placeholder = '0x314ab97b76e39d63c78d5c86c2daf8eaa306b182 3.141592\n0x271bffabd0f79b8bd4d7a1c245b7ec5b576ea98a,2.7182\n0x141ca95b6177615fb1417cf70e930e102bf8f584=1.41421'
    }
  }, [])

  const selectCurrency = useCallback((type: 'ether' | 'token') => {
    debug(`Currency selected: ${type}`)
    setSending(type)
    if (type === 'ether') {
      setAppState(AppState.SELECTED_CURRENCY)
      parseAmounts()
    } else if (type === 'token') {
      if (token.address) {
        selectToken(token)
      } else {
        resetToken()
      }
    }
  }, [parseAmounts, token])

  const resetToken = useCallback(() => {
    debug('Resetting token')
    setToken({})
    setAppState(AppState.CONNECTED_TO_WALLET)
  }, [])

  const selectToken = useCallback((tokenInfo: TokenInfo) => {
    debug('Token selected:', tokenInfo)
    
    // Use a function to perform batched updates
    const updateStateForToken = () => {
      // Force app state to SELECTED_CURRENCY - this is critical
      setAppState(AppState.SELECTED_CURRENCY)
      
      // Update token and sending type
      setToken(tokenInfo)
      setSending('token')
      
      // Add a manual DOM ID for the textarea so we can find it directly
      debug('Setting up a timer to force focus on textarea after rendering')
      
      // Use a longer timeout to ensure the DOM has fully updated
      setTimeout(() => {
        // Try to access textarea directly via DOM if ref isn't working
        const textarea = document.getElementById('recipients-textarea') as HTMLTextAreaElement
        
        if (textarea) {
          debug('Found textarea via DOM ID')
          // Give it focus to ensure it's rendered in the DOM
          textarea.focus()
          // Then try to parse amounts
          parseAmounts()
        } else {
          debug('Could not find textarea via DOM ID')
          if (textareaRef.current) {
            debug('Textarea ref exists')
            parseAmounts()
          } else {
            debug('Neither textarea ref nor DOM ID found')
          }
        }
      }, 1000)
    }
    
    // Perform all updates together
    updateStateForToken()
    
  }, [parseAmounts])

  const handleConnectWallet = async () => {
    if (connectors.length > 0) {
      connect({ connector: connectors[0] })
    }
  }

  const getSymbol = () => {
    return sending === 'token' ? token.symbol || 'TOKEN' : nativeSymbol(chainId)
  }

  const getDecimals = () => {
    return sending === 'token' ? token.decimals ?? 18 : 18
  }

  const getTotalAmount = () => {
    return recipients.reduce((total, recipient) => total + recipient.value, 0n)
  }

  const getBalance = () => {
    if (sending === 'token') {
      return token.balance ?? 0n
    } else {
      return balanceData?.value ?? 0n
    }
  }

  const getLeftAmount = () => {
    return getBalance() - getTotalAmount()
  }

  const getDisperseMessage = () => {
    if (sending === 'token' && (token.allowance ?? 0n) < getTotalAmount()) {
      return 'needs allowance'
    }
    if (getLeftAmount() < 0n) {
      return 'total exceeds balance'
    }
    return undefined
  }

  // Display all wallet connectors
  const renderConnectors = () => {
    return (
      <div>
        {connectors.map((connector) => (
          <input
            key={connector.uid}
            type="submit"
            value={connector.name}
            onClick={() => connect({ connector })}
            style={{ marginRight: '10px', marginBottom: '10px' }}
          />
        ))}
      </div>
    )
  }

  // Debug element to show current state
  const renderDebugInfo = () => (
    <div style={{ 
      position: 'fixed', 
      bottom: '10px', 
      right: '10px', 
      background: '#f0f0f0', 
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '12px',
      fontFamily: 'monospace',
      zIndex: 1000,
      maxWidth: '300px'
    }}>
      <div><strong>AppState:</strong> {AppState[appState]}</div>
      <div><strong>Sending:</strong> {sending}</div>
      <div><strong>Connected:</strong> {isConnected ? 'Yes' : 'No'}</div>
      <div><strong>Token:</strong> {token.symbol || 'None'}</div>
      <div><strong>Recipients:</strong> {recipients.length}</div>
      <div><strong>Textarea exists:</strong> {textareaRef.current ? 'Yes' : 'No'}</div>
    </div>
  )

  return (
    <article>
      <Header chainId={chainId} address={address} />

      {appState === AppState.METAMASK_REQUIRED && (
        <section>
          <h2>metamask required</h2>
          <p>non-ethereum browser, consider installing metamask.</p>
        </section>
      )}

      {appState === AppState.NETWORK_UNAVAILABLE && (
        <section>
          <h2>network not yet supported</h2>
          <p>let us know on telegram and we'll deploy the contract on this network.</p>
          <p>network id: {chainId}</p>
        </section>
      )}

      {appState >= AppState.UNLOCK_METAMASK && !isConnected && (
        <section>
          <h2>connect to wallet</h2>
          <p>{renderConnectors()}</p>
          <p>{walletStatus}</p>
        </section>
      )}

      {appState >= AppState.CONNECTED_TO_WALLET && (
        <section>
          <CurrencySelector onSelect={selectCurrency} />
          {sending === 'ether' && (
            <p>you have {formatUnits(balanceData?.value || 0n, 18)} {getSymbol()}</p>
          )}
        </section>
      )}

      {appState >= AppState.CONNECTED_TO_WALLET && sending === 'token' && (
        <section>
          <TokenLoader onSelect={selectToken} onError={resetToken} chainId={chainId} account={address} />
          {token.symbol && (
            <p>you have {formatUnits(token.balance || 0n, token.decimals || 18)} {token.symbol}</p>
          )}
        </section>
      )}

      {/* IMPORTANT: This section must be visible after a token is selected */}
      {(appState >= AppState.SELECTED_CURRENCY || sending === 'token') && (
        <section>
          <h2>recipients and amounts</h2>
          <p>enter one address and amount in {getSymbol()} on each line. supports any format.</p>
          <div className="shadow">
            <textarea 
              ref={textareaRef} 
              spellCheck="false" 
              onChange={parseAmounts} 
              id="recipients-textarea"
            />
          </div>
          <div style={{ fontSize: '10px', color: '#666', marginTop: '5px' }}>
            Debug: State={AppState[appState]}, Mode={sending}
          </div>
        </section>
      )}

      {appState >= AppState.ENTERED_AMOUNTS && (
        <section>
          <h2>confirm</h2>
          <DisperseAddresses 
            recipients={recipients}
            symbol={getSymbol()}
            decimals={getDecimals()}
            balance={getBalance()}
            left={getLeftAmount()}
            total={getTotalAmount()}
          />
          {sending === 'ether' && (
            <TransactionButton
              show={true}
              disabled={getLeftAmount() < 0n}
              title="disperse ether"
              action="disperseEther"
              message={getDisperseMessage()}
              chainId={chainId}
              recipients={recipients}
              token={token}
            />
          )}
        </section>
      )}

      {appState >= AppState.ENTERED_AMOUNTS && sending === 'token' && (
        <div>
          <h2>allowance</h2>
          <p>{(token.allowance ?? 0n) < getTotalAmount() 
            ? 'allow smart contract to transfer tokens on your behalf.'
            : 'disperse contract has allowance, you can send tokens now.'}</p>
          <TransactionButton
            title={(token.allowance ?? 0n) < getTotalAmount() ? 'approve' : 'revoke'}
            action={(token.allowance ?? 0n) < getTotalAmount() ? 'approve' : 'deny'}
            chainId={chainId}
            recipients={recipients}
            token={token}
          />
          <TransactionButton
            show={true}
            disabled={getLeftAmount() < 0n || (token.allowance ?? 0n) < getTotalAmount()}
            title="disperse token"
            action="disperseToken"
            message={getDisperseMessage()}
            chainId={chainId}
            recipients={recipients}
            token={token}
          />
        </div>
      )}
      
      {/* Debug information panel */}
      {renderDebugInfo()}
    </article>
  )
}

export default App