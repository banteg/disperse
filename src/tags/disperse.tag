disperse
  section
    logo

  section(if='{network_unavailable}')
    h2 network not yet supported
    p let us know on telegram or open an issue on gitub and we'll deploy the contract on this network.
    p network id: {network}

  section(if='{step >= 1}')
    h2 connect to wallet
    p {wallet.status}

  section(if='{step >= 2}')
    chooser
    p(if='{sending == "ether"}') you have
      amount(amount='{wallet.balance}', symbol='{symbol()}', decimals='{decimals()}')

  section(if='{step >= 2 && sending === "token"}')
    token-loader
  
  section(show='{step >= 3}')
    h2 recipients and amounts
    .shadow
      textarea(ref='addresses', spellcheck='false', oninput='{check_amounts}')
  
  section(if='{step >= 4}')
    h2 confirm
    addresses(addresses='{addresses}', symbol='{symbol()}', decimals='{decimals()}')
    transaction(show='{sending === "ether"}', disabled='{left() < 0}' title='disperse ether', action='disperseEther')

  div(if='{sending == "token" && step >= 4}')
    h2 allowance
    p(show='{token.allowance.lt(total())}') allow smart contract to transfer tokens on your behalf.
    //- learn more about token allowance <a href="https://tokenallowance.io/" target="_blank">here</a>.
    p(show='{token.allowance.gte(total())}') disperse contract has allowance, you can send tokens now.
    transaction(
      title='{token.allowance.lt(total()) ? "approve" : "revoke"}',
      action='{token.allowance.lt(total()) ? "approve" : "deny"}',
      class='{secondary: token.allowance.gte(total())}'
    )
    transaction(
      show='{sending === "token"}',
      disabled='{left() < 0 || token.allowance.lt(total())}',
      title='disperse token',
      action='disperseToken',
      message='{disperse_message()}'
    )

  script.
    import {disperse, erc20} from '../js/contracts.js'

    this.step = 1
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
      status: 'connecting...',
    }
    // contracts
    this.disperse = {}
    this.token = {}

    this.sending = null

    this.on('mount', () => {
      this.refs.addresses.placeholder = 'supports any format\n0x314ab97b76e39d63c78d5c86c2daf8eaa306b182,3.141592\n0x271bffabd0f79b8bd4d7a1c245b7ec5b576ea98a=2.7182\n"0x141ca95b6177615fb1417cf70e930e102bf8f584": "1.41421"'
    })

    // ether or token
    async choose(what) {
      this.sending = what
      let next_steps = {
        ether: 3,
        token: this.token.contract ? 3 : 2,
      }
      this.update({step: next_steps[this.sending]})
    }

    async check_amounts(e) {
      e.preventDefault()
      const pattern = RegExp(/(0x[0-9a-fA-F]{40}).+?([0-9\.]+)/, 'g')
      this.addresses = []
      let result
      while ((result = pattern.exec(this.refs.addresses.value)) !== null) {
        this.addresses.push({
          address: ethers.utils.getAddress(result[1]),
          value: ethers.utils.parseUnits(result[2], this.token_decimals)
        })
      }
      if (this.addresses.length) {
        this.update({step: 4})
        console.log(this.addresses)
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
      console.log(this.disperse)
      let gas = await this.disperse.contract.estimate.disperseEther(recipients, values, {value: this.total()})
      return this.disperse.contract.disperseEther(
          recipients, values,
          {value: this.total(), gasLimit: gas * 2}
      )
    }

    async disperseToken() {
      let recipients = this.addresses.map(e => e.address)
      let values = this.addresses.map(e => e.value)
      console.log('disperseToken', this.token.address, recipients, values, this.total().toString())
      console.log(this.disperse)
      let gas = await this.disperse.contract.estimate.disperseToken(this.token.address, recipients, values)
      let transaction = this.disperse.contract.disperseToken(
        this.token.address, recipients, values,
        {gasLimit: gas * 2}
      )
      return transaction
    }

    // computed values

    symbol() {
      return this.sending === 'token' ? this.token.symbol : 'ETH'
    }

    decimals() {
      return this.sending == 'token' ? this.token.decimals :  18 
    }

    total() {
      if (this.addresses.length) {
        return this.addresses.reduce((t, v) => t.add(v.value), ethers.constants.Zero)
      }
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

    show_send() {
      switch (this.sending) {
        case 'token': return this.step >= 4 && this.token.allowance.gte(this.total())
        case 'ether': return this.step >= 4
      }
    }

    disperse_message() {
      if (this.token.allowance.lt(this.total())) return 'needs allowance'
      if (this.left() < 0) return 'total exceeds balance'
    }

    // account utils

    async update_balance() {
      this.wallet.balance = await this.provider.getBalance(this.wallet.address)
      if (this.token.contract) {
        this.token.balance = await this.token.contract.balanceOf(this.wallet.address)
        this.token.allowance = await this.token.contract.allowance(this.wallet.address, this.disperse.address)
      }
      this.update()
    }

    async watch_account() {
      let account = web3.eth.accounts[0]
      if (this.wallet.address !== account) {
        this.wallet.address = account
        this.wallet.status = account ? `logged in as ${account}` : 'please unlock metamask'
        if (account) {
          await this.update_balance()
          this.step = this.step === 1 ? 2 : this.step  // advance to step 2
        } else {
          this.step = 1
        }
        this.update()
      }
    }

    // reload on network change
    async watch_network() {
      let network = web3.version.network
      if (this.network && this.network !== network) {
        location.reload()
      }
      this.network = this.network ? this.network : network
    }

    afterWeb3() {
      this.provider = new ethers.providers.Web3Provider(web3.currentProvider)
      this.network = web3.version.nework
      this.load_disperse_contract()
      setInterval(this.watch_account, 100)
      setInterval(this.watch_network, 500)
      this.update()
    }

    load_disperse_contract() {
      this.network = web3.version.network
      this.disperse.address = disperse.address[this.network]
      if (this.disperse.address) {
        this.disperse.contract = new ethers.Contract(
          this.disperse.address,
          disperse.abi,
          this.provider.getSigner()
        )
        console.log(`Disperse contract initialized at ${this.disperse.address}`)
      } else {
        this.update({network_unavailable: true, step: 0})
      }
    }

    // web3 stuff

    async connectWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(ethereum)
            try {
                await ethereum.enable()
            } catch (error) {
                this.wallet.status = 'please unlock metamask'
            }
            this.afterWeb3()
        }
        else if (window.web3) {
            window.web3 = new Web3(web3.currentProvider);
            this.afterWeb3()
        }
        else {
          this.wallet.status = `non-ethereum browser, consider installing metamask.`
          this.update()
        }
      }

    window.addEventListener('load', this.connectWeb3)
