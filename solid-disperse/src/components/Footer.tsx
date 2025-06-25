import { Show, createMemo } from 'solid-js'
import { disperse_createx } from '../utils'
import { explorerAddr } from '../networks'

interface FooterProps {
  chainId?: number
}

const Footer = (props: FooterProps) => {
  

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
          <span>
            <span 
              style={{ 
                display: 'inline-block',
                width: '8px',
                height: '8px',
                'border-radius': '50%',
                'margin-right': '0.5rem'
              }}
            />
            Disperse contract: 
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