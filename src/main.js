import './css/normalize.css'
import './css/tufte.css'
import './css/disperse.sass'

import riot from 'riot'
import ethers from 'ethers/dist/ethers.min.js'
import './tags/disperse.tag'
import './tags/logo.tag'
import './tags/chooser.tag'
import './tags/addresses.tag'
import './tags/amount.tag'
import './tags/transaction.tag'
import './tags/token-loader.tag'

window.ethers = ethers
riot.mount('*')
