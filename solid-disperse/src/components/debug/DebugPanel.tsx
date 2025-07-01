import { createSignal, Show, onMount, onCleanup } from 'solid-js'
import { formatUnits } from 'viem'
import { networkName, explorerAddr } from '../../networks'
import { AppState } from '../../constants'
import type { TokenInfo, Recipient } from '../../types'

interface DebugPanelProps {
  appState: string
  chainId?: number
  isConnected: boolean
  account?: `0x${string}`
  ethBalance?: { value: bigint } | null
  contractBytecode?: string | null
  contractLoading: boolean
  isContractDeployed: boolean
  sending: 'ether' | 'token'
  tokenMetadata?: TokenInfo | null
  recipients: Recipient[]
  disperseAddress: `0x${string}`
}

const DebugPanel = (props: DebugPanelProps) => {
  const [showDebug, setShowDebug] = createSignal(false)

  onMount(() => {
    // Check if in development environment
    const isDev = import.meta.env.DEV
    setShowDebug(isDev)

    // Add global functions to window
    const windowExt = window as any
    windowExt.toggleDisperseDebug = () => {
      setShowDebug(prev => {
        const newState = !prev
        console.log(`Debug panel ${newState ? 'enabled' : 'disabled'}`)
        return newState
      })
    }
    windowExt.enableDisperseDebug = () => {
      setShowDebug(true)
      console.log('Debug panel enabled')
    }
    windowExt.disableDisperseDebug = () => {
      setShowDebug(false)
      console.log('Debug panel disabled')
    }

    onCleanup(() => {
      windowExt.toggleDisperseDebug = undefined
      windowExt.enableDisperseDebug = undefined
      windowExt.disableDisperseDebug = undefined
    })
  })

  if (!showDebug()) {
    return null
  }

  const formatBalance = (balance: bigint, decimals: number = 18) => {
    return formatUnits(balance, decimals)
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      background: '#f8f9fa',
      padding: '12px',
      border: '1px solid #dee2e6',
      'border-radius': '6px',
      'font-size': '11px',
      'font-family': 'Monaco, Consolas, monospace',
      'z-index': 1000,
      'max-width': '350px',
      'box-shadow': '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <div style={{ 'margin-bottom': '8px', 'font-weight': 'bold', color: '#495057' }}>
        🐛 Debug Panel
      </div>
      
      <div style={{ 'margin-bottom': '6px' }}>
        <strong>App State:</strong> <span style={{ color: '#007bff' }}>{props.appState}</span>
      </div>
      
      <div style={{ 'margin-bottom': '6px' }}>
        <strong>Connected:</strong> {props.isConnected ? '✅' : '❌'}
      </div>
      
      <Show when={props.account}>
        <div style={{ 'margin-bottom': '6px' }}>
          <strong>Account:</strong>{' '}
          <a 
            href={explorerAddr(props.account!, props.chainId)}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#6c757d', 'text-decoration': 'none' }}
          >
            {props.account!.substring(0, 6)}...{props.account!.substring(38)}
          </a>
        </div>
      </Show>
      
      <div style={{ 'margin-bottom': '6px' }}>
        <strong>Chain:</strong> {networkName(props.chainId) || 'Unknown'} ({props.chainId || 'N/A'})
      </div>
      
      <Show when={props.ethBalance}>
        <div style={{ 'margin-bottom': '6px' }}>
          <strong>ETH Balance:</strong> {formatBalance(props.ethBalance!.value)} ETH
        </div>
      </Show>
      
      <div style={{ 'margin-bottom': '6px' }}>
        <strong>Contract:</strong>{' '}
        {props.contractLoading ? (
          <span style={{ color: '#ffc107' }}>Loading...</span>
        ) : props.isContractDeployed ? (
          <span style={{ color: '#28a745' }}>✅ Deployed</span>
        ) : (
          <span style={{ color: '#dc3545' }}>❌ Not Found</span>
        )}
      </div>
      
      <div style={{ 'margin-bottom': '6px' }}>
        <strong>Contract Addr:</strong>{' '}
        <a 
          href={explorerAddr(props.disperseAddress, props.chainId)}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#6c757d', 'text-decoration': 'none' }}
        >
          {props.disperseAddress.substring(0, 8)}...
        </a>
      </div>
      
      <Show when={props.contractBytecode}>
        <div style={{ 'margin-bottom': '6px' }}>
          <strong>Bytecode:</strong> {props.contractBytecode!.substring(0, 10)}... ({props.contractBytecode!.length} chars)
        </div>
      </Show>
      
      <div style={{ 'margin-bottom': '6px' }}>
        <strong>Sending:</strong> <span style={{ color: '#17a2b8' }}>{props.sending}</span>
      </div>
      
      <Show when={props.sending === 'token' && props.tokenMetadata}>
        <div style={{ 'margin-bottom': '6px', 'padding-left': '8px', 'border-left': '2px solid #e9ecef' }}>
          <div><strong>Token:</strong> {props.tokenMetadata!.symbol} ({props.tokenMetadata!.name})</div>
          <div><strong>Address:</strong> {props.tokenMetadata!.address?.substring(0, 8)}...</div>
          <div><strong>Decimals:</strong> {props.tokenMetadata!.decimals}</div>
          <Show when={props.tokenMetadata!.balance !== undefined}>
            <div><strong>Balance:</strong> {formatBalance(props.tokenMetadata!.balance!, props.tokenMetadata!.decimals)}</div>
          </Show>
          <Show when={props.tokenMetadata!.allowance !== undefined}>
            <div><strong>Allowance:</strong> {formatBalance(props.tokenMetadata!.allowance!, props.tokenMetadata!.decimals)}</div>
          </Show>
        </div>
      </Show>
      
      <div style={{ 'margin-bottom': '6px' }}>
        <strong>Recipients:</strong> {props.recipients.length}
      </div>
      
      <Show when={props.recipients.length > 0}>
        <div style={{ 'margin-bottom': '6px' }}>
          <strong>Total Amount:</strong>{' '}
          {formatBalance(
            props.recipients.reduce((sum, r) => sum + r.value, 0n),
            props.sending === 'token' ? props.tokenMetadata?.decimals || 18 : 18
          )}
        </div>
      </Show>
      
      <div style={{ 
        'margin-top': '8px', 
        'padding-top': '6px',
        'border-top': '1px solid #dee2e6',
        'font-size': '9px', 
        color: '#6c757d' 
      }}>
        Console: <code>toggleDisperseDebug()</code>
      </div>
    </div>
  )
}

export default DebugPanel
