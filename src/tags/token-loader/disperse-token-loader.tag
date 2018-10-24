token-loader
  h2 token address
  form(onsubmit='{load_token}')
    .flex
      input(type='text', ref='token', placeholder='0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359')
      input(type='submit', value='load')
    p(class='{status}') {message}
    p(if='{parent.token.balance}') you have
      disperse-amount(amount='{parent.token.balance}', symbol='{parent.symbol()}', decimals='{parent.decimals()}')
      span  ({parent.token.name})

  script.
    import { erc20 } from '../js/contracts.js'

    this.token = null
    this.status = null
    this.message = null

    this.on('mount', () => {
      this.refs.token.value = this.parent.token.address ? this.parent.token.address : ''
    })

    async load_token(e) {
      e.preventDefault()
      let address = this.refs.token.value
      console.log('load token', address)
      this.update({message: 'loading token info...', status: 'pending'})
      this.parent.reset_token()
      if (!address) {
        this.update({message: 'input token address', status: 'error'})
        return
      }
      try {
        // validate address
        address = ethers.utils.getAddress(address)
      } catch (error) {
        // invalid address
        this.update({message: 'invalid address', status: 'error'})
        this.parent.reset_token()
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
        this.parent.reset_token()
        console.log(error)
        return
      }
    await this.parent.token_loaded()
      this.update({message: null, status: null})
    }

  style.
    input[type="text"] 
      flex-grow: 1
      border: none
      border-bottom: 2px #111 solid
      padding: .7rem
      background: aquamarine
      margin-right: 1.4rem

    input[type="text"]:focus 
      outline: none
