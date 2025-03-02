import { useDisconnect } from 'wagmi'
import { networkName, explorerAddr } from '../networks'

interface HeaderProps {
  chainId?: number
  address?: `0x${string}`
}

const Header = ({ chainId, address }: HeaderProps) => {
  const { disconnect } = useDisconnect()

  return (
    <section>
      <div className="flex">
        <div>
          <h1>disperse</h1>
          <h2>distribute {networkName(chainId)}</h2>
        </div>
        {address && (
          <div className="expand">
            <div className="info">
              <a href={explorerAddr(address, chainId)} target="_blank" rel="noopener noreferrer">
                {address && address.substring(0, 6)}...{address && address.substring(38)}
              </a>
              <button 
                onClick={() => disconnect()}
                style={{ 
                  marginLeft: '10px', 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontSize: '1rem',
                  color: 'inherit'
                }}
              >
                disconnect
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Header