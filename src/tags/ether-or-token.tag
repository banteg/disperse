ether-or-token
  div
    label send
    input(type='radio', value='ether', name='what', id='ether', onchange='{choose}')
    label(for='ether') ether
    label or
    input(type='radio', value='token', name='what', id='token', onchange='{choose}')
    label(for='token') token

  script.
    choose(e) {
      this.parent.choose(e.target.value)
    }

  style.
    ether-or-token 
      display:block
      font-style: italic
      margin-top: 2.1rem
      margin-bottom: 1.4rem

    ether-or-token label
        margin-right: .25rem
        font-size: 2.2rem

    input[type="radio"]
        display: none
        color: #111111

    ether-or-token input[type="radio"] + label
        display: inline-block
        font-size: 2.2rem
        color: rgba(0, 0, 0, .5)
        background: aquamarine

    ether-or-token input[type="radio"]:checked + label
        color: #111111
        box-shadow: 6px 6px crimson
