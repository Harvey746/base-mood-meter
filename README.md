# Base Mood Meter

Base Mood Meter is a mobile-first Base Mini App for picking an onchain mood.
Users connect a wallet, choose Happy, Focused, Bullish, or Chill, and call
`setMood(uint8)` on Base. The app has no token, no points, no rewards, no
invites, and no fees beyond Base gas.

## Stack

- Next.js App Router
- TypeScript
- Wagmi native config
- Viem
- Tailwind CSS

## Configuration

Before the final production deployment:

1. Replace the hardcoded tag in `src/app/layout.tsx`:

```tsx
<meta name="base:app_id" content="6a229f81ab28df7fd2fc1627" />
```

2. Update `src/lib/config.ts`:

```ts
export const CONTRACT_ADDRESS = "0x..." as Address;
export const BUILDER_CODE = "bc_...";
```

`BUILDER_CODE` is converted into an ERC-8021 data suffix with `ox/erc8021`.
The Wagmi config includes `dataSuffix`, and the `writeContract` call also
passes `dataSuffix` explicitly.

## Local Commands

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Contract

The Solidity source is in `contracts/BaseMoodMeter.sol`.

After deploying it to Base, put the deployed address in `src/lib/config.ts`,
redeploy the app, then verify:

- Page source includes `<meta name="base:app_id" ...>`
- Coinbase Wallet, MetaMask, OKX, and Base App injected wallet can connect
- `Set Mood` sends a Base transaction
- Reads update for latest mood, user updates, total updates, and mood counts
- Basescan input data ends with the ERC-8021 encoded builder-code suffix
- base.dev offchain and onchain attribution dashboards show data
