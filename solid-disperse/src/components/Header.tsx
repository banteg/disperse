import { Show, createResource } from 'solid-js'
import { disconnect, getEnsName } from '@wagmi/core'
import { config } from '../wagmi.config'
import { explorerAddr } from '../networks'
import ChainSelector from './ChainSelector'

interface HeaderProps {
  chainId: number | undefined
  address?: `0x${string}`
}


const Header = (props: HeaderProps) => {
  // Fetch ENS name if address is available
  const [ensName] = createResource(
    () => props.address,
    async (address) => {
      if (!address) return null
      try {
        return await getEnsName(config, {
          address,
          chainId: 1, // ENS is on mainnet
        })
      } catch {
        return null
      }
    }
  )

  const handleDisconnect = async () => {
    try {
      await disconnect(config)
    } catch (error) {
      console.error('Failed to disconnect:', error)
    }
  }

  return (
    <>
      <header>
        <div class={props.address ? 'eth active' : 'eth inactive'}>
          <svg
            id="svg"
            version="1.1"
            width="50"
            height="50"
            viewBox="0 0 400 400"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            style={{ display: 'block' }}
            role="img"
            aria-label="Ethereum logo"
          >
            <g id="svgg">
              <path
                id="path0"
                d="M196.423 21.530 C 195.612 23.471,171.105 64.622,141.963 112.977 C 112.821 161.331,88.735 201.528,88.437 202.304 C 88.050 203.313,103.882 213.162,143.951 236.838 L 200.008 269.960 256.049 236.820 C 296.310 213.011,311.937 203.279,311.546 202.259 C 309.521 196.981,200.545 18.000,199.356 18.000 C 198.554 18.000,197.234 19.588,196.423 21.530 M88.570 226.125 C 90.730 229.818,199.545 382.920,200.000 382.906 C 200.752 382.883,312.004 225.671,311.574 225.240 C 311.168 224.835,207.179 286.081,202.841 289.280 L 200.182 291.242 146.341 259.454 C 116.728 241.971,91.406 226.961,90.070 226.100 C 87.855 224.673,87.722 224.675,88.570 226.125 "
                stroke="none"
                fill="#cccccc"
                fill-rule="evenodd"
              />
            </g>
          </svg>
        </div>
        <h1>
          disperse
          <sup>
            <ChainSelector />
          </sup>
        </h1>
        <div class="expand" />
        <Show when={props.address}>
          <div class="network-info">
            <div>
              <a
                href={explorerAddr(props.address!, props.chainId)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {ensName() || `${props.address!.substring(0, 6)}...${props.address!.substring(38)}`}
              </a>
              <button type="button" onClick={handleDisconnect} class="link-button">
                disconnect
              </button>
            </div>
          </div>
        </Show>
      </header>
      <p>
        <em>verb</em> distribute ether or tokens to multiple addresses
      </p>
    </>
  )
}

export default Header