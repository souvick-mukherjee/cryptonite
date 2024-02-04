require('@nomicfoundation/hardhat-toolbox')

module.exports = {
  defaultNetwork: 'polygon',
  networks: {
    polygon: {
      url: 'https://polygon-mumbai.g.alchemy.com/v2/PUqHFhEWs-w__TSNBAB3o6dZup0mGvmz',
      accounts: ['5d2b873adc1b48f1ba95574083354a80a24b0e7769adab65bb4d7d80a43be333'],
    },
  },
  solidity: {
    version: '0.8.19',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  mocha: {
    timeout: 40000,
  },
}

