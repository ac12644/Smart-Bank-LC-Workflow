# Smart Contract Letter of Credit Module

This repository contains a set of smart contracts and a React app that demonstrate how blockchain technology can be used to streamline the letter of credit (LC) process in international trade transactions. The smart contracts include a USD token contract, an LC Manager contract, and an LC contract, which automate the LC workflow, reduce the risk of fraud, and ensure accountability for all parties involved in the transaction. The React app provides a user-friendly interface for interacting with the smart contracts and allows the Bank, Buyer, and Seller to perform their respective roles in the LC process.

## Table of Contents

1. Introduction
2. Smart Contracts
3. React App
4. Getting Started
5. Usage
6. Contributing

## Introduction

The letter of credit (LC) process is a common financial instrument used in international trade transactions. It involves three participants: the Buyer, the Seller, and a bank, which acts as the intermediary. The Buyer needs to purchase goods from the Seller but does not have the funds to do so. The bank extends a line of credit to the Buyer, and an LC is issued to formalize the process.

## Smart Contracts

The smart contracts used in this project include a USD token contract, an LC Manager contract, and an LC contract. These contracts work together to automate the LC process and ensure accountability for all parties involved in the transaction.

- The USD token contract is an ERC20 token that is used to represent the value of the LC. The token is pegged to the US dollar and is used to facilitate payments between the Buyer, Seller, and bank.

- The LC Manager contract is responsible for creating new LCs, managing their lifecycle, and ensuring that all parties involved in the transaction are held accountable.

- The LC contract represents a single LC and contains all the details of the transaction, including the parties involved, the value of the LC, and the terms of the transaction.

## React App

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
