addresses
  ul
    li.accent
      .flex
        div address
        .grow
        div amount
    li(each='{parent.addresses}')
      .flex
        div {address}
        .grow.bar
        div {pretty(value)}
    li.accent
      .flex
        div total
        .grow
        div {pretty(parent.total())}
    li.accent
      .flex
        div your balance
        .grow
        div {pretty(parent.balance())}
    li.accent
      .flex(class='{negative: parent.left() < 0}')
        div remaining
        .grow
        div {pretty(parent.left())}

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
    .negative {
      color: crimson;
    }

  script.
    pretty(wei) {
      return this.parent.pretty(wei)
    }
