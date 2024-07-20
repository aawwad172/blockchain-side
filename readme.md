# Blockchain

## Overview
This is the blockchain component for the E-voting system. The smart contracts are written in Solidity, and Web3.js is used to interact with the contracts. The backend utilizes Node.js, Express.js, CORS, and dotenv.

## Prerequisites
- Node.js
- npm
- MetaMask
- An Infura project

## Setup
### 1. Install Dependencies
Navigate to the blockchain directory and install the necessary dependencies:
```sh
cd blockchain
npm install
```

### 2. Create a `.env` File
Create a `.env` file in the blockchain directory with the following information:

```plaintext
INFURA_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID
CONTRACT_ADDRESS=0x49Ff66b40F77c78e65aafC07451e218b91EE0f03
YOUR_METAMASK_ADDRESS=YOUR_METAMASK_PUBLIC_ADDRESS
PRIVATE_KEY=YOUR_METAMASK_PRIVATE_KEY
```

#### Notes:
- **INFURA_URL:** Create an Infura project and use the provided URL for the Sepolia test network.
- **CONTRACT_ADDRESS:** The smart contract address on the Sepolia test network.
- **YOUR_METAMASK_ADDRESS:** Your MetaMask public address.
- **PRIVATE_KEY:** The private key of your MetaMask wallet.

### 3. MetaMask Setup
1. Install the MetaMask extension for your browser.
2. Create a new MetaMask wallet.
3. Connect MetaMask to the Sepolia test network.

## Running the Blockchain Service
1. Start the service:
    ```sh
    node start
    ```

2. The blockchain service will run at `http://localhost:5173`

## Interacting with the Smart Contract
The backend service exposes endpoints that allow interaction with the smart contract using Web3.js. Detailed API documentation can be found in the backend's README file or accessed at `http://localhost:4000/api-docs` if available.


## Dependencies
- **Solidity**: For writing smart contracts.
- **Web3.js**: For interacting with the smart contracts.
- **Node.js**: JavaScript runtime.
- **Express.js**: Web framework for Node.js.
- **CORS**: Middleware for enabling Cross-Origin Resource Sharing.
- **dotenv**: Module for loading environment variables from a .env file.

## License
This project is licensed under the MIT License.
```

This README file provides a clear overview of the blockchain component, including setup instructions, MetaMask and Infura integration, running the service, interacting with smart contracts, and testing. It also lists dependencies and licensing information.