# Smart Contract Letter of Credit Module

This repository contains a set of smart contracts and a React app that demonstrate how blockchain technology can be used to streamline the letter of credit (LC) process in international trade transactions. The smart contracts include a USD token contract, an LC Manager contract, and an LC contract, which automate the LC workflow, reduce the risk of fraud, and ensure accountability for all parties involved in the transaction. The React app provides a user-friendly interface for interacting with the smart contracts and allows the Bank, Buyer, and Seller to perform their respective roles in the LC process.

## Table of Contents

1. Overview
2. Components
3. Smart Contracts
4. React App
5. Getting Started
6. Usage
7. Contributing

## Overview

The workflow involves the use of smart contracts to automate the LC process, reduce the risk of fraud, and ensure that all parties involved in the transaction are held accountable. The following steps are taken to set up the LC workflow:

1. Develop, compile, and deploy the USD asset contract, which represents USD as a fungible asset using the ERC20 contract standard.
2. Retrieve the address of the USD token and map it to the LC Manager and LetterOfCredit smart contracts. This address enables the invocation of the USD smart contract for transferring funds.
3. Create the LC Manager and LetterOfCredit smart contracts. We deploy the LC Manager contract to the blockchain, and the LetterOfCredit smart contract is only used as an interface by the LC Manager. It is imported as part of the LC Manager code and is not deployed using hardhat. All new LCs are created through this interface.
4. Deploy the LC Manager smart contract.
5. Design a React application for generating, viewing, and settling LCs.
6. Run and test the application.

## Components

This repository contains the following components:

- `contracts/`: Contains the solidity smart contract files for the USD Token, LC Manager, and LetterOfCredit.
- `scripts/`: Contains the deployment script for deploying the contracts to the blockchain.
- `src/`: Contains the React application files.
- `test/`: Contains the tests for the smart contracts.

## Smart Contracts

The smart contracts used in this project include a USD token contract, an LC Manager contract, and an LC contract. These contracts work together to automate the LC process and ensure accountability for all parties involved in the transaction.

- The USD token contract is an ERC20 token that is used to represent the value of the LC. The token is pegged to the US dollar and is used to facilitate payments between the Buyer, Seller, and bank.

- The LC Manager contract is responsible for creating new LCs, managing their lifecycle, and ensuring that all parties involved in the transaction are held accountable.

- The LC contract represents a single LC and contains all the details of the transaction, including the parties involved, the value of the LC, and the terms of the transaction.

## React App

LC Module React App
The React app provides a frontend layer for interacting with the smart contracts, and has the following users and features:

- `Bank`: The bank user who logs in to the app. The user can create and view LCs.
- `Buyer`: The buying merchant who requests an LC from the bank. The Buyer can view all the LCs issued in their name by the bank.
- `Seller`: The selling merchant who will approach the bank for settlement, on the successful delivery of their goods to the buying merchant. The Seller can view the LCs that include them as a beneficiary and submit a settlement request.

The app has the following React components:

- `Address Bar`: Displays the account used to access the app in real-time.
- `Description`: Provides a description of the app.
- `Nav`: Implements a navigation bar, with the bank's name and logo.
- `InputField`: Implements the input fields used for getting inputs from the user.
- `Container`: Links the main App.js file and the rest of the child components. It renders child components based on the current state. It receives all state variables and methods and forwards them to the child components, as and when required.
- `Bank Login`: A login screen for our bank. It allows the Buyer, the Seller, and the bank to log in to the app and use it. It also redirects them to the lower screens, for using the app.
- `BankTabCreate`: Renders the Create LC screen for the bank user.
- `BankTabView`: Renders the View LC screen for the bank user.
- `BuyerTabView`: Renders the View LC screen for the Buyer.
- `SellerTabSettle`: Renders the Settle LC screen for the Seller.
- `SellerTabView`: Renders the View LC screen for the Seller.
- `LCView`: Renders a singular screen, with all the details of a single LC. It can be accessed by the bank user, the Buyer, or the Seller.

The React app provides a basic interface for interacting with the smart contracts. It allows the Bank, Buyer, and Seller to perform their respective roles in the LC process.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository

```
git clone https://github.com/ac12644/Smart-Bank-LC-Workflow.git
```

2. Install the required dependencies

```
npm install
```

3. Deploy the smart contracts on your local blockchain network (e.g., Polygon Mumbai)

For more detailed instructions, check out the [article](https://github.com/ac12644).

## Usage

Once you have started the React app, you can access it at http://localhost:3000. The app has three user types: Bank, Buyer, and Seller. Each user type has specific actions that they can perform, including creating and viewing LCs.

## Contributing

Contributions to the project are welcome. To contribute, follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/new-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add new feature'`)
5. Push to the branch (`git push origin feature/new-feature`)
6. Open a pull request
