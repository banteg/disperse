import { Show } from 'solid-js'
import { networkName } from '../networks'

interface NetworkStatusProps {
  chainId: number | undefined
  isBytecodeLoading: boolean
  isContractDeployed: boolean
  isConnected: boolean
  verifiedAddress?: { address: `0x${string}`; label: string } | null
}

export default function NetworkStatus(props: NetworkStatusProps) {
  return (
    <section>
      <h2>unsupported network</h2>
      <Show
        when={!props.isBytecodeLoading}
        fallback={
          <p>
            <span class="checking">checking if disperse contract is deployed on any address...</span>
          </p>
        }
      >
        <Show
          when={props.isContractDeployed}
          fallback={
            <Show
              when={props.isConnected}
              fallback={<p>connect your wallet to check contract deployment on this network.</p>}
            >
              <p>
                no disperse contract found on <em>{networkName(props.chainId)?.toLowerCase() || 'this network'}</em>.
              </p>
              <p>
                The disperse contract needs to be deployed on this network. Please switch to a supported network.
              </p>
            </Show>
          }
        >
          <p>
            disperse contract found at {props.verifiedAddress?.label} address, but this network isn't configured yet
            in our app. reload the page to try again.
          </p>
          <div class="success">
            <p>valid contract address: {props.verifiedAddress?.address}</p>
          </div>
          <button type="button" onClick={() => window.location.reload()}>
            reload page
          </button>
        </Show>
      </Show>

      <div class="network-info">
        <p>
          network: {networkName(props.chainId)?.toLowerCase() || 'unknown'} (id: {props.chainId})
        </p>
        <Show when={props.verifiedAddress}>
          <p>
            verified contract: {props.verifiedAddress!.address}
            <span class="badge">{props.verifiedAddress!.label}</span>
          </p>
        </Show>
      </div>
    </section>
  )
}