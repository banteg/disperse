
import { createSignal, Show } from 'solid-js'
import { type BaseError } from 'viem'
import { useAccount, useWriteContract } from 'wagmi'
import { waitForTransactionReceipt } from '@wagmi/core'
import { createStore } from 'solid-js/store'
import { disperse_createx } from '../utils/contractVerify'
import { config } from '../wagmi.config'

interface DeployContractProps {
  onDeploy: (address: `0x${string}`) => void
  chainId?: number
}

const DeployContract = (props: DeployContractProps) => {
  const [isLoading, setIsLoading] = createSignal(false)
  const [errorMessage, setErrorMessage] = createSignal('')
  const { chain } = useAccount()
  const { writeContract } = useWriteContract()
  const [state, setState] = createStore({
    salt: '',
    initCode: '',
  })

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    if (!chain()?.id) {
      setErrorMessage('wallet not connected')
      return
    }

    setIsLoading(true)
    setErrorMessage('')

    try {
      const { salt, initCode } = disperse_createx
      setState({ salt, initCode })

      writeContract(
        {
          ...({
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
            args: [salt, initCode],
          } as const),
        },
        {
          onSuccess: async (hash) => {
            try {
              const receipt = await waitForTransactionReceipt(config, { hash })
              // Find the ContractCreated event in the logs
              const event = receipt.logs.find(
                (log) => log.topics[0] === '0x28c9db10b11b19e1513f4e42513533d6ba9b4f0e9423364ced4bf99a465b5163'
              )
              if (event) {
                const deployedAddress = `0x${event.topics[1].slice(26)}` as `0x${string}`
                props.onDeploy(deployedAddress)
              } else {
                setErrorMessage('Could not find ContractCreated event')
              }
            } catch (error) {
              console.error('Error waiting for transaction receipt:', error)
              const errorMsg = error instanceof Error ? error.message : 'error waiting for transaction receipt'
              setErrorMessage(errorMsg)
            }
            setIsLoading(false)
          },
          onError: (error) => {
            const errorMsg = (error as BaseError)?.shortMessage || error.message
            setErrorMessage(errorMsg)
            setIsLoading(false)
          },
        }
      )
    } catch (error) {
      console.error('Error deploying contract:', error)
      const errorMsg = error instanceof Error ? error.message : 'error deploying contract'
      setErrorMessage(errorMsg)
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
