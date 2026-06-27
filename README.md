# BaseMoodMeter

BaseMoodMeter is a mobile-first Base Mini App for choosing an onchain mood.

Users connect a wallet, select one of four moods, and submit the choice to the Base network by calling `setMood(uint8)`.

The available moods are:

- Happy
- Focused
- Bullish
- Chill

The app is intentionally simple. It has no points, no rewards, no invites, and no fees beyond Base network gas.

## Repository

GitHub: https://github.com/Harvey746/base-mood-meter.git

## Overview

BaseMoodMeter provides a lightweight interface for writing a mood selection onchain.

The application reads and displays mood-related contract data, including the latest mood, user updates, total updates, and mood counts.

It is designed as a Base Mini App and includes the required metadata and configuration hooks for deployment.

## Features

- Mobile-first interface
- Base Mini App metadata support
- Wallet connection through injected wallet providers
- Onchain mood selection using `setMood(uint8)`
- Read support for latest mood data
- Read support for user update counts
- Read support for total update counts
- Read support for mood counts
- ERC-8021 encoded builder-code suffix configuration
- TypeScript-based application code
- Tailwind CSS styling

## Tech Stack

- Next.js App Router
- TypeScript
- Wagmi native config
- Viem
- Tailwind CSS
- Solidity

## Project Structure

The main application code lives under `src/`.

The Solidity contract source is located at:

```text
contracts/BaseMoodMeter.sol
```

Configuration values for the deployed contract and builder code are located in:

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

Then open the local development URL shown in your terminal.

## Useful Commands

Install dependencies:

```bash
npm install
