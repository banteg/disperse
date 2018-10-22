token-loader
  h2 token address
  form(onsubmit='{load_token}')
    .flex
      input(type='text', placeholder='0x...', ref='token')
      input(type='submit', value='load')
    p(class='{status}') {message}
    p(if='{parent.token.balance}') you have
      amount(amount='{parent.token.balance}', symbol='{parent.symbol()}', decimals='{parent.decimals()}')
      span  ({parent.token.name})

  script.
    import { erc20 } from '../js/contracts.js'

    this.token = null
    this.status = null
    this.message = null

    // populate with default test token
    this.on('mount', () => {
      this.refs.token.value = '0x825514093d55e89d2d38a9f86f5027d523701d0a'
    })

    async load_token(e) {
      e.preventDefault()
      let address = this.refs.token.value
      console.log('load token', address)
      this.update({message: 'loading token info...', status: 'pending'})
      this.parent.update({token: {}})
      try {
        // validate address
        address = ethers.utils.getAddress(address)
      } catch (error) {
        // invalid address
        this.update({message: 'invalid address', status: 'error'})
        this.parent.update({step: 2, token: {}})
        console.log(error)
        return
      }
      try {
        // load the details
        let token =  new ethers.Contract(address, erc20.abi, this.parent.provider.getSigner())
        this.parent.token = {
          address: address,
          contract: token,
          balance: null,
          name: await token.name(),
          symbol: await token.symbol(),
          decimals: await token.decimals(),
        }
      } catch(error) {
        // non-compliant interface
        this.update({message: 'unsupported token', status: 'error'})
        this.parent.update({step: 2, token: {}})
        console.log(error)
        return
      }
      await this.parent.update_balance()
      this.update({message: null, status: null})
      this.parent.update({step: 3})
    }
