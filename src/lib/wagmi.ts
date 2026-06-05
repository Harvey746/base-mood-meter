import { createConfig, http } from "wagmi";
import { base } from "wagmi/chains";
import { coinbaseWallet, injected } from "wagmi/connectors";
import type { EIP1193Provider } from "viem";
import { ATTRIBUTION_DATA_SUFFIX } from "./config";

type OkxWindow = Window & {
  okxwallet?: EIP1193Provider;
};

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    injected({
      target: "metaMask",
    }),
    injected({
      target: {
        id: "okx",
        name: "OKX Wallet",
        provider: (window) => (window as OkxWindow | undefined)?.okxwallet,
      },
    }),
    injected(),
    coinbaseWallet({
      appName: "Base Mood Meter",
      preference: "all",
    }),
  ],
  transports: {
    [base.id]: http(),
  },
  dataSuffix: ATTRIBUTION_DATA_SUFFIX,
  ssr: true,
});
