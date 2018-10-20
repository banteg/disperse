disperse
  section
    h1
      .eth(class='{active: step > 1, inactive: step === 1}')
        <svg id="svg" version="1.1" width="50" height="50" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: block;"><g id="svgg"><path id="path0" d="M196.423 21.530 C 195.612 23.471,171.105 64.622,141.963 112.977 C 112.821 161.331,88.735 201.528,88.437 202.304 C 88.050 203.313,103.882 213.162,143.951 236.838 L 200.008 269.960 256.049 236.820 C 296.310 213.011,311.937 203.279,311.546 202.259 C 309.521 196.981,200.545 18.000,199.356 18.000 C 198.554 18.000,197.234 19.588,196.423 21.530 M88.570 226.125 C 90.730 229.818,199.545 382.920,200.000 382.906 C 200.752 382.883,312.004 225.671,311.574 225.240 C 311.168 224.835,207.179 286.081,202.841 289.280 L 200.182 291.242 146.341 259.454 C 116.728 241.971,91.406 226.961,90.070 226.100 C 87.855 224.673,87.722 224.675,88.570 226.125 " stroke="none" fill="#cccccc" fill-rule="evenodd"></path></g></svg>
      span disperse
    p
      em verb
      span(style="font-style: normal")  distribute ether or tokens to multiple addresses

  section
    h2 connect to wallet
    p {wallet.status}
  
  section(if='{step >= 2}')
    h2 sending {sending}
    form(ref="s1", onsubmit='{load_token}')
      div
        input(type='radio', value='ether', name='what', id='ether', onchange='{choose}')
        label(for='ether') ether
        input(type='radio', value='token', name='what', id='token', onchange='{choose}')
        label(for='token') token
      div
        div(if='{sending === "ether"}')
          p you have {pretty(wallet.balance)}
        div(if='{sending === "token"}')
          label.block token address
          .flex.shadow
            input(type='text', placeholder='0x...', value='{contracts.token}', ref='token')
            input(type='submit', value='load')
          p.status(class='{info.token.status}') {info.token.msg}
          p(if='{token.balance}') you have {pretty(token.balance)} ({token.name})
  
  section(show='{step >= 3}')
    h2 recipients and amounts
    form(onsubmit='{check_amounts}')
      .shadow
        textarea(ref='addresses', spellcheck='false', oninput='{check_amounts}')
      input(type='submit', value='parse')

  section(if='{step >= 4}')
    h2 confirm
    ul
      li
        .flex.accent
          div address
          .fg
          div amount
      li(each='{addresses}')
        .flex
          div {address}
          .bar
          div {pretty(value)}
      li
        .flex.accent
          div total
          .fg
          div(style='font-weight: bold;') {pretty(total())}
      li
        .flex.accent
          div your balance
          .fg
          div {pretty(balance())}
      li
        .flex.accent(class='{red: left() < 0}')
          div remaining
          .fg
          div {pretty(left())}
    transaction(show='{sending === "ether"}', title='disperse ether', action='disperseEther')

  // allowance
  section(if='{sending == "token" && step >= 4}')
    h2 allowance
    div(if='{token.allowance.lt(total())}')
      p allow smart contract to transfer tokens on your behalf. read more about token allowance <a href='https://tokenallowance.io/' target='_blank'>here</a>.
      transaction(title='approve', action='approve')
    div(if='{token.allowance.gte(total())}')
      p disperse contract has allowance, you can send tokens now.
      transaction(show='{false}' title='deny', action='deny')
      transaction(show='{sending === "token"}', title='disperse token', action='disperseToken')

  script.
    this.eth_symbol = 'eth' // or Ξ
    this.statuses = ['approve', 'pending', 'success', 'failed']
    this.step = 1
    this.info = {
      debug: {},
      token: {},
      approve: {},
      disperse: {},
    }
    this.network = null
    this.wallet = {
      address: null,
      status: null,
    }
    this.token = {}
    this.erc20 = {
      abi: [
        'function name() view returns (string)',
        'function symbol() view returns (string)',
        'function decimals() view returns (uint8)',
        'function balanceOf(address) view returns (uint256)',
        'function allowance(address, address) view returns (uint256)',
        'function approve(address, uint256) returns (bool)',
      ]
    }
    this.disperse = {
      address: '0x5b1869D9A4C187F2EAa108f3062412ecf0526b24',
      abi: [
        'function disperseEther(address[] recipients, uint256[] values)',
        'function disperseToken(address token, address[] recipients, uint256[] values)',
        'function disperseTokenSimple(address token, address[] recipients, uint256[] values)',
      ]
    }
    this.sending = null
    this.contracts = {
      token: '0xe78A0F7E598Cc8b0Bb87894B0F60dD2a88d6a8Ab',
    }

    async debug() {
      this.refs.addresses.value = '0xffcf8fdee72ac11b5c542428b35eef5769c409f0,1\n0x22d491bde2303f2f43325b2108d26f1eaba1e32b,.31\n0xe11ba2b4d45eaed5996cd0823791e0c93114882d,3.141592'
    }

    // step 2a
    async choose() {
      for(var el of this.refs.s1) {
        if (el.checked) {
          this.sending = el.value
        }
      }
      switch(this.sending) {
        case 'ether':
          this.step = 3
          break
        case 'token':
          this.step = this.token.contract ? 3 : 2
          break
      }
      console.log(this.step)
      this.update()
    }

    // step 2b
    async load_token(e) {
      if (e) e.preventDefault()
      try {
        console.log('load token', this.refs.token.value)
        var address = ethers.utils.getAddress(this.refs.token.value)
      } catch (error) {
        this.info.token = {msg: 'invalid address', status: 'error'}
        this.token = {
          address: null,
          contract: null,
          name: null,
          symbol: null,
          decimals: null,
        }
        this.update()
        return
      }
      // valid address, load the details
      this.info.token = {}
      var token =  new ethers.Contract(address, this.erc20.abi, this.provider.getSigner())
      this.token = {
        address: address,
        balance: null,
        contract: token,
        name: await token.name(),
        symbol: await token.symbol(),
        decimals: await token.decimals(),
      }
      console.log(this.token)
      await this.update_balance()
      this.step = 3
      this.update()
    }

    async check_amounts(e) {
      if (e) e.preventDefault()
      console.log('disperse')
      const pattern = RegExp(/(0x[0-9a-fA-F]{40}).+?([0-9\.]+)/, 'g')
      this.addresses = []
      let result
      while ((result = pattern.exec(this.refs.addresses.value)) !== null) {
        this.addresses.push({
          address: ethers.utils.getAddress(result[1]),
          value: ethers.utils.parseUnits(result[2], this.token_decimals)
        })
      }
      this.step = 4
      this.update()
      console.log(this.addresses)
    }

    // transaction functions

    async approve() {
      this.ensureDisperseContract()
      return this.token.contract.approve(this.disperse.address, ethers.constants.MaxUint256)
    }

    async deny() {
      this.ensureDisperseContract()
      return this.token.contract.approve(this.disperse.address, ethers.constants.Zero)
    }

    async disperseEther() {
      this.ensureDisperseContract()
      let recipients = this.addresses.map(e => e.address)
      let values = this.addresses.map(e => e.value)
      console.log('disperseEther', recipients, values, this.total().toString())
      let gas = await this.disperse.contract.estimate.disperseEther(recipients, values, {value: this.total()})
      return this.disperse.contract.disperseEther(
          recipients, values,
          {value: this.total(), gasLimit: gas * 2}
      )
    }

    async disperseToken() {
      this.ensureDisperseContract()
      let recipients = this.addresses.map(e => e.address)
      let values = this.addresses.map(e => e.value)
      console.log('disperseToken', this.token.address, recipients, values, this.total().toString())
      let gas = await this.disperse.contract.estimate.disperseToken(this.token.address, recipients, values)
      let transaction = this.disperse.contract.disperseToken(
        this.token.address, recipients, values,
        {gasLimit: gas * 2}
      )
      return transaction
    }

    ensureDisperseContract() {
      if (!this.disperse.contract) {
        this.disperse.contract = new ethers.Contract(
          this.disperse.address,
          this.disperse.abi,
          this.provider.getSigner()
        )
        console.log(this.disperse.contract)
        window.disperse = this.disperse.contract
      }
    }

    // display utils

    neg(amount) {
      if (amount.startsWith('-')) {
        return `(${amount.slice(1)})`
      }
      return amount
    }

    pretty(wei) {
      switch (this.sending) {
        case 'token': return this.neg(`${ethers.utils.formatUnits(wei, this.token.decimals)} ${this.token.symbol}`)
        case 'ether': return this.neg(`${ethers.utils.formatEther(wei)} ${this.eth_symbol}`)
      }
    }

    // computed values

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
      setInterval(this.watch_account, 100)
      setInterval(this.watch_network, 500)
      this.debug()
      this.update()
    }

    // web3 stuff

    async connectWeb3() {
        if (window.ethereum) {
            console.log('// Modern dapp browsers...')
            window.web3 = new Web3(ethereum)
            try {
                console.log('Request account access if needed')
                await ethereum.enable()
                console.log('Accounts now exposed')
            } catch (error) {
                console.log('User denied account access...')
                this.wallet.status = 'please unlock metamask'
            }
            this.afterWeb3()
        }
        else if (window.web3) {
            console.log('// Legacy dapp browsers...')
            window.web3 = new Web3(web3.currentProvider);
            console.log('Acccounts always exposed')
            this.afterWeb3()
        }
        else {
          //- this.provider = ethers.getDefaultProvider('homestead')
          this.wallet.status = `non-ethereum browser, consider installing metamask`
          this.update()
        }
      }

    window.addEventListener('load', this.connectWeb3)
