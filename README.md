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
