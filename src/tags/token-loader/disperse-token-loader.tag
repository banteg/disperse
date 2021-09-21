//- 
  dipserse-token-loader

  a form to select a token and load it

  @param {func} on-select  called when token is loaded
  @param {func} on-error   called when token is reset
//


disperse-token-loader
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
    import { erc20, ds_token } from '../../js/contracts.js'

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
      await this.opts.onError()
      if (!address) {
        this.update({message: 'input token address', status: 'error'})
        return
      }
      try {
        // validate address
        address = ethers.utils.getAddress(address)
      } catch (error) {
        // invalid address
        console.log(error)
        this.update({message: 'invalid address', status: 'error'})
        await this.opts.onError()
        return
      }
      try {
        // load the details
        let token = new ethers.Contract(address, erc20.abi, provider.getSigner())
        this.parent.token = {
          address: address,
          contract: token,
          balance: null,
          name: await token.name(),
          symbol: await token.symbol(),
          decimals: await token.decimals(),
        }
      } catch (error) {
        console.log('token is not erc-20 compatible, assuming ds-token...')
        // assume ds-token
        try {
          let token = new ethers.Contract(address, ds_token.abi, provider.getSigner())
          this.parent.token = {
            address: address,
            contract: token,
            balance: null,
            name: ethers.utils.parseBytes32String(await token.name()),
            symbol: ethers.utils.parseBytes32String(await token.symbol()),
            decimals: await token.decimals(),
          }
        } catch (error) {
          // non-compliant interface
          console.log(error)
          this.update({message: 'unsupported token', status: 'error'})
          await this.opts.onError()
          return
        }
      }
      await this.opts.onSelect()
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
