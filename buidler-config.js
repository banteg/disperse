module.exports = {
    networks: {
        ganache: {
            host: '127.0.0.1',
            port: 8545,
            network_id: 5777,
        }
    },
    solc: {
        optimizer: {
          enabled: false,
          runs: 200
        }
    }
}
