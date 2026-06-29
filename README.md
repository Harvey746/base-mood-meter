# BaseMoodMeter

BaseMoodMeter is a mobile-first Base Mini App for choosing an onchain mood.

It lets a visitor connect a wallet, choose one of four moods, and submit that choice to the Base network by calling `setMood(uint8)`.

The app is intentionally simple: no points, no rewards, no invites, and no fees beyond Base network gas.

## Repository

GitHub: https://github.com/Harvey746/base-mood-meter.git

## Overview

BaseMoodMeter provides a lightweight interface for writing a mood selection onchain.

The app reads and displays mood-related contract data, including the latest mood, user update counts, total updates, and counts for each mood.

It is designed as a Base Mini App and includes metadata and configuration hooks needed for deployment.

## Available Moods

The supported moods are:

- Happy
- Focused
- Bullish
- Chill

## Features

- Mobile-first interface
- Base Mini App metadata support
- Wallet connection through injected wallet providers
- Onchain mood selection using `setMood(uint8)`
- Display of the latest mood data
- Display of user update counts
- Display of total update counts
- Display of mood counts
- ERC-8021 encoded builder-code suffix configuration
- TypeScript application code
- Tailwind CSS styling

## Tech Stack

- Next.js App Router
- TypeScript
- Wagmi native config
- Viem
- Tailwind CSS
- Solidity

## Project Structure

The main application code is located in:

```text
src/
```

The Solidity contract source is located in:

```text
contracts/BaseMoodMeter.sol
```

Contract and builder-code configuration values are located in:

```text
src/lib/config.ts
```

The Base Mini App metadata tag is located in:

```text
src/app/layout.tsx
```

## Prerequisites

Before running the project locally, make sure you have:

- Node.js installed
- npm installed
- A wallet available for testing
- Access to the Base network

## Installation

Clone the repository:

```bash
git clone https://github.com/Harvey746/base-mood-meter.git
cd base-mood-meter
```

Install dependencies:

```bash
npm install
```

## Local Development

Start the development server:

```bash
npm run dev
```

Open the local development URL shown in your terminal.

## Usage

1. Open the app.
2. Connect a wallet.
3. Choose one of the available moods.
4. Select **Set Mood**.
5. Confirm the Base transaction in the wallet.
6. Wait for the transaction to complete.
7. Review the updated mood data in the app.

## Useful Commands

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Run linting:

```bash
npm run lint
```

Build the application:

```bash
npm run build
```

## Configuration

Before the final production deployment, update the Base Mini App metadata and contract configuration.

In `src/app/layout.tsx`, replace the hardcoded Base app ID value:

```tsx
<meta name="base:app_id" content="6a229fadab28df7fd2fc1628" />
```

In `src/lib/config.ts`, update the deployed contract address and builder code:

```ts
export const CONTRACT_ADDRESS = "0x..." as Address;
export const BUILDER_CODE = "bc_...";
```

The `BUILDER_CODE` value and the ERC-8021 encoded data suffix are configured in `src/lib/config.ts`.

The Wagmi configuration includes `dataSuffix`.

The `writeContract` call also passes `dataSuffix` explicitly.

## Contract

The Solidity source is available at:

```text
contracts/BaseMoodMeter.sol
```

After deploying the contract to Base, add the deployed contract address to `src/lib/config.ts`.

Then redeploy the app so the frontend points to the correct contract.

## Deployment Checklist

After deploying the contract and the app, verify the following:

- The page source includes the `<meta name="base:app_id" ...>` tag.
- Coinbase Wallet can connect.
- MetaMask can connect.
- OKX Wallet can connect.
- The Base App injected wallet can connect.
- **Set Mood** sends a transaction on Base.
- The latest mood value updates after a successful transaction.
- User update counts are displayed correctly.
- Total update counts are displayed correctly.
- Mood counts are displayed correctly.
- Basescan input data ends with the ERC-8021 encoded builder-code suffix.
- The base.dev offchain attribution dashboard shows data.
- The base.dev onchain attribution dashboard shows data.
