//-
  addresses

  list of addresses with grand total

  @param addresses  list of {address, value} objects
  @param symbol     token symbol to use
  @param decimals   how far to move the decimal point
//

addresses
  ul
    li.accent
      .flex
        div address
        .grow
        div amount
    li(each='{opts.addresses}')
      .flex
        div {address}
        .grow.bar
        amount(amount='{value}', symbol='{parent.opts.symbol}', decimals='{parent.opts.decimals}')

  ul
    li.accent
      .flex
        div total
        .grow
        amount(amount='{parent.total()}', symbol='{opts.symbol}', decimals='{opts.decimals}')
    li.accent
      .flex
        div your balance
        .grow
        amount(amount='{parent.balance()}', symbol='{opts.symbol}', decimals='{opts.decimals}')
    li.accent
      .flex.fade(class='{negative: parent.left() < 0}')
        div remaining
        .grow
        amount(amount='{parent.left()}', symbol='{opts.symbol}', decimals='{opts.decimals}')

  style.
    .accent {
      font-style: italic;
    }
    .grow {
      flex-grow: 1;
    }
    .bar {
      margin: auto 0.3em;
      border-bottom: 1px #111111 solid;
    }
    .fade {
      transition: color .3s;
    }
    .negative {
      color: crimson;
    }

  script.
