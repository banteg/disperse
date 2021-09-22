//- 
  disperse-app

  main app layout and logic goes here
//
disperse-app
  section
    disperse-logo(state='{state}', disperse='{disperse}')

  section(if='{state === states.METAMASK_REQUIRED}')
    h2 metamask required
    p non-ethereum browser, consider installing metamask.

  section(if='{state === states.NETWORK_UNAVAILABLE}')
    h2 network not yet supported
    p let us know on telegram and we'll deploy the contract on this network.
    p network id: {chain_id}

  section(if='{state >= states.UNLOCK_METAMASK}')
    h2 connect to wallet
    p(if='{state == states.UNLOCK_METAMASK}')
      input(type='submit', value='connect wallet', onclick='{unlock_accounts}', disabled='{opts.disabled}')
    p {wallet.status}

  section(if='{state >= states.CONNECTED_TO_WALLET}')
    disperse-currency(on-select='{select_currency}')
    p(if='{sending == "ether"}') you have
      disperse-amount(amount='{wallet.balance}', symbol='{symbol()}', decimals='{decimals()}')

  section(if='{state >= states.CONNECTED_TO_WALLET && sending === "token"}')
    disperse-token-loader(on-select='{select_token}', on-error='{reset_token}')
  
  section(show='{state >= states.SELECTED_CURRENCY}')
    h2 recipients and amounts
    p enter one address and amount in {symbol()} on each line. supports any format.
    .shadow
      textarea(ref='addresses', spellcheck='false', oninput='{check_amounts}')
  
  section(if='{state >= states.ENTERED_AMOUNTS}')
    h2 confirm
    disperse-addresses(
      addresses='{addresses}',
      symbol='{symbol()}',
      decimals='{decimals()}',
      balance='{balance()}',
      left='{left()}',
      total='{total()}'
    )
    disperse-transaction(
      show='{sending === "ether"}',
      disabled='{left() < 0}',
      title='disperse ether',
      action='{disperseEther}',
      message='{disperse_message()}'
    )

  div(if='{state >= states.ENTERED_AMOUNTS && sending == "token"}')
    h2 allowance
    p(show='{token.allowance.lt(total())}') allow smart contract to transfer tokens on your behalf.
    //- learn more about token allowance <a href="https://tokenallowance.io/" target="_blank">here</a>.
    p(show='{token.allowance.gte(total())}') disperse contract has allowance, you can send tokens now.
    disperse-transaction(
      title='{token.allowance.lt(total()) ? "approve" : "revoke"}',
      action='{token.allowance.lt(total()) ? approve : deny}',
      class='{secondary: token.allowance.gte(total())}'
    )
    disperse-transaction(
      show='{sending === "token"}',
      disabled='{left() < 0 || token.allowance.lt(total())}',
      title='disperse token',
      action='{disperseToken}',
      message='{disperse_message()}'
    )

  script.
    import {disperse, erc20} from '../js/contracts.js'
    import {native_symbol} from '../js/networks.js'
    import {states} from '../js/state.js'
    import detectEthereumProvider from '@metamask/detect-provider'

    this.states = states
    this.state = 0

    this.info = {
      debug: {},
      token: {},
      approve: {},
      disperse: {},
    }
    this.network = null
    this.network_unavailable = false
    this.wallet = {
      address: null,
      status: null,
    }
    // contracts
    this.disperse = {}
    this.token = {}

    this.sending = null

    this.on('mount', () => {
      this.refs.addresses.placeholder = '0x314ab97b76e39d63c78d5c86c2daf8eaa306b182 3.141592\n0x271bffabd0f79b8bd4d7a1c245b7ec5b576ea98a,2.7182\n0x141ca95b6177615fb1417cf70e930e102bf8f584=1.41421'
    })

    // ether or token
    async select_currency(event) {
      this.sending = event.target.value
      if (this.sending == 'ether') {
        this.update({state: this.states.SELECTED_CURRENCY})
        this.parse_amounts()
      }
      else if (this.sending == 'token') {
        if (this.token.contract) {
          this.select_token()
        } else {
          this.reset_token()
        }
      }
    }
    
    async reset_token() {
      this.update({state: this.states.CONNECTED_TO_WALLET, token: {}})
    }

    async select_token() {
      this.update({state: this.states.SELECTED_CURRENCY})
      await this.update_balance()
      this.parse_amounts()
      console.log(`loaded token ${this.token.address}`)
    }

    async check_amounts(e) {
      e.preventDefault()
      this.parse_amounts()
    }

    async parse_amounts() {
      const pattern = RegExp(/(0x[0-9a-fA-F]{40}).+?([0-9\.]+)/, 'g')
      this.addresses = []
      let result
      while ((result = pattern.exec(this.refs.addresses.value)) !== null) {
        this.addresses.push({
          address: ethers.utils.getAddress(result[1]),
          value: ethers.utils.parseUnits(result[2], this.decimals())
        })
      }
      if (this.addresses.length) {
        this.update({state: this.states.ENTERED_AMOUNTS})
      }
    }

    // transaction functions

    async approve() {
      // should we approve only the amount needed or -1?
      return this.token.contract.approve(this.disperse.address, ethers.constants.MaxUint256)
    }

    async deny() {
      return this.token.contract.approve(this.disperse.address, ethers.constants.Zero)
    }

    async disperseEther() {
      let recipients = this.addresses.map(e => e.address)
      let values = this.addresses.map(e => e.value)
      console.log('disperseEther', recipients, values, this.total().toString())
      return this.disperse.contract.disperseEther(recipients, values, {value: this.total()})
    }

    async disperseToken() {
      let recipients = this.addresses.map(e => e.address)
      let values = this.addresses.map(e => e.value)
      console.log('disperseToken', this.token.address, recipients, values, this.total().toString())
      let transaction = this.disperse.contract.disperseToken(this.token.address, recipients, values)
      return transaction
    }

    // computed values

    symbol() {
      return this.sending === 'token' ? this.token.symbol : native_symbol()
    }

    decimals() {
      return this.sending == 'token' ? this.token.decimals :  18 
    }

    total() {
      return this.addresses.reduce((t, v) => t.add(v.value), ethers.constants.Zero)
    }

    left() {
      switch (this.sending) {
        case 'token': return this.token.balance.sub(this.total())
        case 'ether': return this.wallet.balance.sub(this.total())
      }
    }

    balance() {
      switch (this.sending) {
        case 'token': return this.token.balance
        case 'ether': return this.wallet.balance
      }
    }

    disperse_message() {
      if (this.sending === 'token' && this.token.allowance.lt(this.total())) return 'needs allowance'
      if (this.left() < 0) return 'total exceeds balance'
    }

    // account utils

    async update_balance() {
      this.wallet.balance = await provider.getBalance(this.wallet.address)
      if (this.token.contract) {
        this.token.balance = await this.token.contract.balanceOf(this.wallet.address)
        this.token.allowance = await this.token.contract.allowance(this.wallet.address, this.disperse.address)
      }
      this.update()
    }

    async afterWeb3() {
      window.provider = new ethers.providers.Web3Provider(window.ethereum)
      window.chain_id = (await provider.getNetwork()).chainId
      ethereum.request({ method: 'eth_accounts' }).then(this.accounts_changed)
      ethereum.on('chainChanged', this.chain_changed)
      ethereum.on('accountsChanged', this.accounts_changed)
      this.load_disperse_contract()
      if (this.state !== this.states.NETWORK_UNAVAILABLE) {
        this.update({state: this.states.UNLOCK_METAMASK})
      }
    }

    chain_changed(new_chain_id) {
      window.location.reload()
    }

    async accounts_changed(accounts) {
      if (accounts.length === 0) {
        this.wallet.address = null
        this.wallet.status = 'please unlock metamask'
        this.state = this.states.UNLOCK_METAMASK
      } else if (accounts[0] != this.wallet.address) {
        this.wallet.address = accounts[0]
        this.wallet.status = `logged in as ${this.wallet.address}`
        this.state = this.states.CONNECTED_TO_WALLET
        await this.update_balance()
      }
      this.update()
      console.log('accounts_changed', accounts)
    }

    unlock_accounts() {
      ethereum.request({ method: 'eth_requestAccounts' })
        .then(this.accounts_changed)
        .catch((err) => {
          if (err.code === 4001) {
            this.wallet.status = 'connection request rejected'
            this.update()
          } else {
            console.error(err)
          }
      })
    }

    load_disperse_contract() {
      this.disperse.address = disperse.address[chain_id]
      if ('disperse' in localStorage) {
        try {
          this.disperse.address = ethers.utils.getAddress(localStorage.getItem('disperse'))
          console.log('disperse address override')
        } catch (e) {
          console.error('failed to override address')
        }
      }
      if (this.disperse.address) {
        this.disperse.contract = new ethers.Contract(
          this.disperse.address,
          disperse.abi,
          provider.getSigner()
        )
        console.log(`Disperse contract initialized at ${this.disperse.address}`)
      } else {
        this.update({state: this.states.NETWORK_UNAVAILABLE})
      }
    }

    async connectWeb3() {
        let provider = await detectEthereumProvider()
        if (provider) {
            this.afterWeb3()
        } else {
          this.update({state: this.states.METAMASK_REQUIRED})
        }
      }

    window.addEventListener('load', this.connectWeb3)
