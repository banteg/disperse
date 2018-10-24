disperse-currency
  .chooser
    label send
    input(type='radio', value='ether', name='what', id='ether', onchange='{opts.onSelect}')
    label(for='ether') ether
    label or
    input(type='radio', value='token', name='what', id='token', onchange='{opts.onSelect}')
    label(for='token') token

  script.

  style.
    $color-faded: rgba(0, 0, 0, .5)
    $color-normal: #111111

    .chooser
      display:block
      font-style: italic
      margin-top: 2.1rem
      margin-bottom: 1.4rem

    label
      margin-right: .25rem
      font-size: 2.2rem

    input[type="radio"]
      display: none
      color: $color-normal

      & + label
        display: inline-block
        font-size: 2.2rem
        color: $color-faded
        border-bottom: 2px $color-faded solid

      &:checked + label
        color: $color-normal
        border-bottom: 2px $color-normal solid
        background: aquamarine
