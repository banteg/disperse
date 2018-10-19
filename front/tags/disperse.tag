disperse
  .container
    .row
      h1 disperse (step {step})
      div
        em verb
        span  distribute ether or tokens to multiple addresses
    
    // 1. metamask
    .row
      h2 connect to wallet
      div {wallet.status}
    
    // 2. ether or token
    .row(if='{step >= 2}')
      h2 sending {sending}
      form(ref="s1", onsubmit='{load_token}')
        .pb
          .inline.pr
            input(type='radio', value='ether', name='what', id='ether', onchange='{choose}')
            label(for='ether') ether
          .inline
            input(type='radio', value='token', name='what', id='token', onchange='{choose}')
            label(for='token') token
        div
          div(if='{sending === "ether"}')
            div you have {pretty(wallet.balance)}
          div(if='{sending === "token"}')
            .pb
              label.block token address
              input(placeholder='0x...', value='{contracts.token}', ref='token')
              input(type='submit')
            p.status(class='{info.token.status}') {info.token.msg}
            div(if='{token.balance}') you have {pretty(token.balance)} ({token.name})
    
    // 3. input addresses
    .row(if='{step >= 3}')
      h2 recipients and amounts
      form(onsubmit='{check_amounts}')
        textarea.block(ref='addresses', rows='6', cols='54', spellcheck='false', oninput='{check_amounts}')
          | 0xffcf8fdee72ac11b5c542428b35eef5769c409f0,1

          | 0x22d491bde2303f2f43325b2108d26f1eaba1e32b,.31

          | 0xe11ba2b4d45eaed5996cd0823791e0c93114882d,3.141592
        input(type='submit')

    // 4. confirm
    .row(if='{step >= 4}')
      h2 confirm
      .pb
        .address-row(each='{addresses}')
          div {address}
          .bar
          div {pretty(value)}
      .address-row
        .fg
        .footer {pretty(total())}

    // 4. approve
    .row(if='{sending == "token" && step >= 4}')
      h2 allowance
      div(if='{token.allowance.lt(total())}')
        p allow smart contract to transfer tokens on your behalf.
        input(type='button', value='approve', onclick='{approve}')
      div(if='{token.allowance.gte(total())}')
        p disperse contract has allowance, you can send tokens now.
        input(type='button', value='deny', onclick='{deny}')
      p.status(class='{info.approve.status}') {info.approve.msg}
        .hash {info.approve.tx}

    // 6. send
    .row(if='{show_send()}')
      h2 send
      p you are about to send {pretty(total())} to {addresses.length} addresses.
      p you will have {pretty(left())} after that.
      input(type='button', value='disperse', onclick='{disperse_do}')
      p.status(class='{info.disperse.status}') {info.disperse.msg}
        .hash {info.disperse.tx}

  script.
    this.step = 1
    this.info = {
      approve: {},
      disperse: {},
    }
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
      e.preventDefault()
      try {
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
      e.preventDefault()
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

    async approve(e) {
      console.log('approve')
      this._approve(ethers.constants.MaxUint256)
    }

    async deny(e) {
      console.log('deny')
      this._approve(ethers.constants.Zero)
    }

    async _approve(amount) {
      console.log('approve', amount)
      let transaction = this.token.contract.approve(this.disperse.address, amount)
      await this.handle_transaction(transaction, 'approve')
    }

    async disperse_do() {
      console.log('disperse')
      this.ensure_disperse_contract()
      let recipients = this.addresses.map(e => e.address)
      let values = this.addresses.map(e => e.value)
      if (this.sending == 'ether') {
        console.log('disperseEther', recipients, values, this.total().toString())
        let data = this.disperse.contract.interface.functions.disperseEther.encode([recipients, values])
        let gas = await this.disperse.contract.estimate.disperseEther(recipients, values, {value: this.total()})
        console.log(gas.toString())
        let transaction = this.disperse.contract.disperseEther(
          recipients, values,
          {value: this.total(), gasLimit: gas*2}
        )
        await this.handle_transaction(transaction, 'disperse')
      } else if (this.sending == 'token') {
        console.log('disperseToken', this.token.address, recipients, values, this.total().toString())
        let gas = await this.disperse.contract.estimate.disperseToken(this.token.address, recipients, values)
        console.log(gas.toString())
        console.log('estimate fail')
        let transaction = this.disperse.contract.disperseToken(
          this.token.address, recipients, values,
          {gasLimit: gas*2}
        )
        await this.handle_transaction(transaction, 'disperse')
      } else {
        console.log(this.sending, 'not implemented')
      }
    }

    async handle_transaction(transaction, key) {
      let tx
      try {
        tx = await transaction
        this.info[key] = {msg: 'transaction pending', status: 'pending', tx: tx.hash}
        this.update()
        console.log(tx)
      } catch(error) {
        this.info[key] = {msg: 'transaction cancelled', status: 'error'}
        await this.update_balance()
        this.update()
        return
      }
      try {
        let receipt = await tx.wait()
        console.log(receipt)
        let result = receipt.status ? 'complete' : 'failed'
        let status = receipt.status ? 'ok' : 'error'
        this.info[key] = {msg: `transaction ${result}`, status: status, tx: tx.hash}
        await this.update_balance()
        this.update()
        return receipt
      } catch(error) {
        this.info[key] = {msg: `transaction failed`, status: 'error', tx: tx.hash}
        console.log(error)
        this.update()
      }
    }

    ensure_disperse_contract() {
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

    pretty(wei) {
      switch (this.sending) {
        case 'token': return `${ethers.utils.formatUnits(wei, this.token.decimals)} ${this.token.symbol}`
        case 'ether': return `${ethers.utils.formatEther(wei)} Ξ`
      }
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

    show_send() {
      switch (this.sending) {
        case 'token': return this.step >= 4 && this.token.allowance.gte(this.total())
        case 'ether': return this.step >= 4
      }
    }

    async update_balance() {
      this.wallet.balance = await this.provider.getBalance(this.wallet.address)
      if (this.token.contract) {
        this.token.balance = await this.token.contract.balanceOf(this.wallet.address)
        this.token.allowance = await this.token.contract.allowance(this.wallet.address, this.disperse.address)
      }
      this.update()
    }

    async update_account() {
      var account = web3.eth.accounts[0]
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

    async connect_web3() {
        if (window.ethereum) {
            console.log('// Modern dapp browsers...')
            window.web3 = new Web3(ethereum)
            this.provider = new ethers.providers.Web3Provider(web3.currentProvider);
            try {
                console.log('Request account access if needed')
                await ethereum.enable()
                console.log(web3.version.network)
                console.log('Accounts now exposed')
            } catch (error) {
                console.log('User denied account access...')
                this.wallet.status = 'please unlock metamask'
            }
            setInterval(this.update_account, 100)  // poll for changed account/unlocked wallet
            this.update()
        }
        else if (window.web3) {
            console.log('// Legacy dapp browsers...')
            window.web3 = new Web3(web3.currentProvider);
            console.log('Acccounts always exposed')
            this.provider = new ethers.providers.Web3Provider(web3.currentProvider)
            setInterval(this.update_account, 100)  // poll for changed account/unlocked wallet
            this.update()
        }
        else {
          this.provider = ethers.getDefaultProvider('homestead')
          this.wallet.status = `non-ethereum browser, consider installing metamask`
          this.update()
        }
      }

    window.addEventListener('load', this.connect_web3)
