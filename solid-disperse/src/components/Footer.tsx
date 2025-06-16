import { Show, createMemo } from 'solid-js'
import { disperse_legacy, disperse_createx } from '../utils'
import { explorerAddr } from '../networks'

interface FooterProps {
  chainId?: number
  verifiedAddress?: { address: `0x${string}`; label: string } | null
  contractStatuses?: { legacy: boolean; createx: boolean }
}

const Footer = (props: FooterProps) => {
  const legacyStatus = createMemo(() => {
    return props.contractStatuses?.legacy ?? false
  })

  const createxStatus = createMemo(() => {
    return props.contractStatuses?.createx ?? false
  })

  return (
    <footer style={{ 
      'margin-top': '4rem', 
      'padding-top': '2rem', 
      'border-top': '1px solid #e5e5e5',
      'font-size': '0.875rem',
      'color': '#666'
    }}>
      <div style={{ 'text-align': 'center' }}>
        <div style={{ 'margin-bottom': '0.5rem' }}>
          <span style={{ 'margin-right': '2rem' }}>
            <span 
              style={{ 
                display: 'inline-block',
                width: '8px',
                height: '8px',
                'border-radius': '50%',
                'background-color': legacyStatus() ? '#22c55e' : '#ef4444',
                'margin-right': '0.5rem'
              }}
            />
            legacy: 
            <Show
              when={props.chainId}
              fallback={<span> {disperse_legacy.address}</span>}
            >
              {' '}
              <a 
                href={explorerAddr(disperse_legacy.address, props.chainId)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#666' }}
              >
                {disperse_legacy.address.substring(0, 6)}...{disperse_legacy.address.substring(38)}
              </a>
            </Show>
          </span>
          <span>
            <span 
              style={{ 
                display: 'inline-block',
                width: '8px',
                height: '8px',
                'border-radius': '50%',
                'background-color': createxStatus() ? '#22c55e' : '#ef4444',
                'margin-right': '0.5rem'
              }}
            />
            createx: 
            <Show
              when={props.chainId}
              fallback={<span> {disperse_createx.address}</span>}
            >
              {' '}
              <a 
                href={explorerAddr(disperse_createx.address, props.chainId)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#666' }}
              >
                {disperse_createx.address.substring(0, 6)}...{disperse_createx.address.substring(38)}
              </a>
            </Show>
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer