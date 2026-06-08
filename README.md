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
