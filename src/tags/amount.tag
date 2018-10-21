//-
  amount

  nicely formats ether and token amounts

  @param amount
  @param symbol
  @param decimals
//

amount
  span {amount()} 
  span.sc {opts.symbol}
  
  script.
    amount() {
      let s = ethers.utils.formatUnits(this.opts.amount, this.opts.decimals)
      return s.startsWith('-') ? `(${s.slice(1)})` : s
    }

  style.
    .sc
      font-variant: all-small-caps
