
import { createSignal, Show } from 'solid-js'
import { type BaseError } from 'viem'
import { getAccount, writeContract, waitForTransactionReceipt } from '@wagmi/core'
import { disperse } from '../contracts'
import { config } from '../wagmi.config'

interface DeployContractProps {
  onDeploy: (address: `0x${string}`) => void
  chainId?: number
}

const DeployContract = (props: DeployContractProps) => {
  const [isLoading, setIsLoading] = createSignal(false)
  const [errorMessage, setErrorMessage] = createSignal('')

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    const account = getAccount(config)
    if (!account.chainId) {
      setErrorMessage('wallet not connected')
      return
    }

    setIsLoading(true)
    setErrorMessage('')

    try {
      const { salt, initcode } = disperse

      const hash = await writeContract(config, {
        address: '0xba5Ed099633D3B313e4D5F792C2cf3d22a4312c0',
        abi: [
          {
            inputs: [
              { internalType: 'bytes32', name: 'salt', type: 'bytes32' },
              { internalType: 'bytes', name: 'initCode', type: 'bytes' },
            ],
            name: 'deploy',
            outputs: [{ internalType: 'address', name: 'addr', type: 'address' }],
            stateMutability: 'payable',
            type: 'function',
          },
        ],
        functionName: 'deploy',
        args: [salt, initcode],
      })

      const receipt = await waitForTransactionReceipt(config, { hash })
      const event = receipt.logs.find(
        (log) => log.topics[0] === '0x28c9db10b11b19e1513f4e42513533d6ba9b4f0e9423364ced4bf99a465b5163'
      )

      if (event && event.topics[1]) {
        const deployedAddress = `0x${event.topics[1].slice(26)}` as `0x${string}`
        props.onDeploy(deployedAddress)
      } else {
        setErrorMessage('Could not find deployment event in transaction logs.')
      }
    } catch (error) {
      console.error('Error deploying contract:', error)
      const errorMsg = (error as BaseError)?.shortMessage || (error as Error)?.message || 'error deploying contract'
      setErrorMessage(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <h2>deploy contract</h2>
      <form onSubmit={handleSubmit}>
        <input type="submit" value="deploy" disabled={isLoading()} />
        <Show when={errorMessage()}>
          <p class="error">{errorMessage()}</p>
        </Show>
        <Show when={isLoading()}>
          <p class="pending">deploying contract...</p>
        </Show>
      </form>
    </>
  )
}

export default DeployContract
