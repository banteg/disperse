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
  
  style.
    .sc {
      font-variant: all-small-caps;
    }

  script.
    amount() {
      let s = ethers.utils.formatUnits(this.opts.amount, this.opts.decimals)
      return s.startsWith('-') ? `(${s.slice(1)})` : s
    }
