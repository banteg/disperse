import './css/normalize.css'
import './css/tufte.css'
import './css/disperse.sass'

import riot from 'riot'
import ethers from 'ethers/dist/ethers.min.js'
import './tags/disperse-app.tag'
import './tags/disperse-logo.tag'
import './tags/disperse-currency.tag'
import './tags/disperse-addresses.tag'
import './tags/disperse-amount.tag'
import './tags/disperse-transaction.tag'
import './tags/token-loader/disperse-token-loader.tag'

window.chain_id = null
window.ethers = ethers
riot.mount('*')
