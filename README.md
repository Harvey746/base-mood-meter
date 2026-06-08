# BaseMoodMeter

BaseMoodMeter is a mobile-first Base Mini App for selecting and saving an onchain mood.

Users connect a wallet, choose one of four moods, and submit the selection to a smart contract on Base.

Available moods:

- Happy
- Focused
- Bullish
- Chill

The app calls `setMood(uint8)` on Base and displays mood-related reads such as the latest mood, user updates, total updates, and mood counts.

Repository: https://github.com/Harvey746/base-mood-meter.git

## Overview

BaseMoodMeter is designed to be simple, focused, and easy to verify.

It does not include rewards, invites, points, or extra app fees.

Users only pay the required Base network gas for transactions.

The project includes both the frontend Mini App and the Solidity contract source.

## Features

- Mobile-first interface
- Base Mini App metadata support
- Wallet connection through injected wallets
- Four selectable mood options
- Onchain mood updates through `setMood(uint8)`
- Contract reads for mood activity
- ERC-8021 builder attribution data suffix configuration
- TypeScript-based frontend
- Tailwind CSS styling
- Solidity contract source included

## Tech Stack

- Next.js App Router
- TypeScript
- Wagmi native config
- Viem
- Tailwind CSS
- Solidity

## Project Structure

The main application code lives in the `src` directory.

Important files include:

- `src/app/layout.tsx` for app layout and metadata
- `src/lib/config.ts` for contract and attribution configuration
- `contracts/BaseMoodMeter.sol` for the Solidity contract source

## Configuration

Before the final production deployment, update the Base Mini App metadata.
