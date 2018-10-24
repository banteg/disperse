//- 
  dispere-logo

  displays a logo and some links

  @param state      current app state
  @param disperse   object with contract, address etc.
//

disperse-logo
  header
    .eth(class='{logo_class()}')
      <svg id="svg" version="1.1" width="50" height="50" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: block;"><g id="svgg"><path id="path0" d="M196.423 21.530 C 195.612 23.471,171.105 64.622,141.963 112.977 C 112.821 161.331,88.735 201.528,88.437 202.304 C 88.050 203.313,103.882 213.162,143.951 236.838 L 200.008 269.960 256.049 236.820 C 296.310 213.011,311.937 203.279,311.546 202.259 C 309.521 196.981,200.545 18.000,199.356 18.000 C 198.554 18.000,197.234 19.588,196.423 21.530 M88.570 226.125 C 90.730 229.818,199.545 382.920,200.000 382.906 C 200.752 382.883,312.004 225.671,311.574 225.240 C 311.168 224.835,207.179 286.081,202.841 289.280 L 200.182 291.242 146.341 259.454 C 116.728 241.971,91.406 226.961,90.070 226.100 C 87.855 224.673,87.722 224.675,88.570 226.125 " stroke="none" fill="#cccccc" fill-rule="evenodd"></path></g></svg>
    h1 disperse
      sup {network_name()}
    .expand
    div
      a(href='{explorer_addr(opts.disperse.address)}', target='_blank') {explorer_name()}
      //- a(href='https://github.com/banteg/disperse', target='_blank') github
      a(href='https://t.me/disperse', target='_blank') telegram
  p
    em verb
    span(style="font-style: normal")  distribute ether or tokens to multiple addresses

  script.
    import {states} from '../js/state.js'
    import {network_name, explorer_addr, explorer_name} from '../js/networks.js'

    this.network_name = network_name
    this.explorer_name = explorer_name
    this.explorer_addr = explorer_addr
    this.states = states

    logo_class() {
      return this.opts.state >= this.states.CONNECTED_TO_WALLET ? 'active' : 'inactive'
    }

  style.
    header
      display: flex
      align-items: baseline
    
    sup
      font-size: 1.4rem
      margin-left: .7rem
      top: -1.4rem

    a
      font-size: 1.4rem
      margin-right: 1.4rem

    .eth svg path
      transition: fill .3s !important

    .active svg path
      fill: aquamarine !important

    .inactive svg path
      fill: crimson !important
