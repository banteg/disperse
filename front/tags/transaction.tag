//-
  transaction

  button + transaction status

  @param {string} title   button label
  @param {string} action  parent function to call, must return transaction promise
//
transaction
  input(type='submit', value='{opts.title}', onclick='{submit}')
  .status
    div(class='{status}') {message}
    a.hash(target='_blank', href='{etherscan(hash)}') {hash}

  style.
    transaction {
      font-size: 1.4rem;
      display: flex;
      align-items: baseline;
    }

    .status {
      margin-left: 1.4rem;
      font-style: italic;
    }

    .status .pending {
      color: rgba(0, 0, 0, .6);
    }

    .status .success {
      color: #28bd14;
    }

    .status .failed {
      color: #d43939;
    }

    .hash {
      font-style: normal;
      font-size: 1rem;
    }

  script.
    this.status = null
    this.message = null
    this.hash = null
    this.tx = null

    async submit(e) {
      let promise = this.parent[this.opts.action]
      this.update({message: 'sign transaction with metamask', status: 'approve', hash: null, tx: null})

      try {
        // pass transaction to signer
        this.tx = await promise()
        // user confirmed
        this.update({message: 'transaction pending', status: 'pending', hash: this.tx.hash})
        console.log(this.tx)
      } catch(error) {
        // user rejected
        this.update({message: 'transaction rejected', status: 'failed'})
        console.log('rejected', error)
        return
      }

      try {
        // transaction mined
        let receipt = await this.tx.wait()
        console.log(receipt)
        let status = receipt.status ? 'success' : 'failed'
        this.update({message: `transaction ${status}`, status: status})
        await this.parent.update_balance()
      } catch(error) {
        // transaction reverted
        this.update({message: 'transaction failed', status: 'failed'})
        console.log('reverted', error)
      }
    }

    etherscan(hash) {
      return `https://etherscan.io/tx/${hash}`
    }
