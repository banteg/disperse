//-
  addresses

  list of addresses with grand total

  @param addresses  list of {address, value} objects
  @param symbol     token symbol to use
  @param decimals   how far to move the decimal point
  @param balance    available balance
  @param left       left
  @param total      total
//

addresses
  ul
    li.accent
      .flex
        div address
        .expand
        div amount
    li(each='{opts.addresses}')
      .flex
        div {address}
        .expand.bar
        amount(amount='{value}', symbol='{parent.opts.symbol}', decimals='{parent.opts.decimals}')

  ul
    li.accent
      .flex
        div total
        .expand
        amount(amount='{opts.total}', symbol='{opts.symbol}', decimals='{opts.decimals}')
    li.accent
      .flex
        div your balance
        .expand
        amount(amount='{opts.balance}', symbol='{opts.symbol}', decimals='{opts.decimals}')
    li.accent
      .flex.fade(class='{negative: opts.left < 0}')
        div remaining
        .expand
        amount(amount='{opts.left}', symbol='{opts.symbol}', decimals='{opts.decimals}')

  style.
    .accent
      font-style: italic

    .bar
      margin: auto 0.3em
      border-bottom: 1px #111111 solid

    .fade
      transition: color .3s

    .negative
      color: crimson

  script.
