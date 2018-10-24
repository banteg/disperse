//-
  disperse-amount

  nicely formats ether and token amounts

  @param amount
  @param symbol
  @param decimals
//

disperse-amount
  span {amount()} 
  span.sc {opts.symbol}
  
  script.
    amount() {
      return ethers.utils.formatUnits(this.opts.amount, this.opts.decimals)
    }

  style.
    .sc
      font-variant: all-small-caps
