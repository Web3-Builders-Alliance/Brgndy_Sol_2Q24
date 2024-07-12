# Crowdfunding DAO Project

Welcome to the FunderDAO! This project leverages the power of Solana Anchor and Next.js to create a crowdfunding DAO where users can stake tokens and vote for projects to be listed. 

## Overview

This decentralized application (dApp) allows users to:
- Stake tokens to participate in the DAO.
- Vote for projects they believe should be funded.
- Submit project proposals for community consideration.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Token Staking**: Users can stake tokens to gain voting rights.
- **Voting System**: Users can vote for projects to be listed on the platform.
- **Project Proposals**: Submit project ideas for community review.
- **Decentralized Governance**: Decisions are made by the community through voting.

## Technologies Used

- **Solana**: A high-performance blockchain network.
- **Anchor**: A framework for Solana's Sealevel runtime providing several developer tools.
- **Next.js**: A React framework for server-side rendering and generating static websites.

## Getting Started

To get a local copy of the project up and running, follow these steps:

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Rust](https://www.rust-lang.org/)
- [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools)
- [Anchor](https://www.anchor-lang.com/docs/installation)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Web3-Builders-Alliance/Brgndy_Sol_2Q24.git
   cd Brgndy_Sol_2Q24/capstone
   ```

2. Install dependencies for the frontend:
   ```bash
   cd funder-dao-frontend
   yarn install
   ```

3. Build the Solana programs:
   ```bash
   cd funder-dao
   anchor build
   ```

4. Deploy the Solana programs to your local network or devnet:
   ```bash
   anchor deploy
   ```

5. Start the frontend application:
   ```bash
   cd ../funder-dao-frontend
   yarn dev
   ```

## Usage

### Staking Tokens

1. Connect your Solana wallet.
2. Navigate to the staking page.
3. Enter the amount of tokens to stake and confirm the transaction.

### Voting for Projects

1. Connect your Solana wallet.
2. Navigate to the voting page.
3. Select a project and cast your vote.

### Submitting a Project Proposal

1. Connect your Solana wallet.
2. Navigate to the submit proposal page.
3. Fill in the project details and submit the proposal for community review.

## Contributing

We welcome contributions to improve this project! To get started, fork the repository and create a new branch for your feature or bugfix. Once your changes are ready, submit a pull request.
