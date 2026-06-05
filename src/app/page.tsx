"use client";

import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Loader2,
  Plug,
  Power,
  RefreshCw,
  Sparkles,
  Wallet,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Address } from "viem";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useReadContracts,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
  type UseReadContractsParameters,
} from "wagmi";
import { base } from "wagmi/chains";
import { baseMoodMeterAbi } from "@/lib/abi";
import {
  ATTRIBUTION_DATA_SUFFIX,
  BUILDER_CODE,
  CONTRACT_ADDRESS,
} from "@/lib/config";

type Mood = {
  id: 0 | 1 | 2 | 3;
  label: string;
  icon: string;
  tone: string;
  shadow: string;
};

const moods: Mood[] = [
  {
    id: 0,
    label: "Happy",
    icon: ":)",
    tone: "bg-[#ff6fb1] text-white border-[#2b7fff]",
    shadow: "shadow-[0_8px_0_#2b7fff]",
  },
  {
    id: 1,
    label: "Focused",
    icon: ">>",
    tone: "bg-[#5eead4] text-[#062b34] border-[#ffce4f]",
    shadow: "shadow-[0_8px_0_#ffce4f]",
  },
  {
    id: 2,
    label: "Bullish",
    icon: "^",
    tone: "bg-[#ffdd55] text-[#31210b] border-[#ff6fb1]",
    shadow: "shadow-[0_8px_0_#ff6fb1]",
  },
  {
    id: 3,
    label: "Chill",
    icon: "~",
    tone: "bg-[#8cff8a] text-[#073415] border-[#2b7fff]",
    shadow: "shadow-[0_8px_0_#2b7fff]",
  },
];

const emptyAddress = "0x0000000000000000000000000000000000000000" as Address;
const readAddress = () => (CONTRACT_ADDRESS || emptyAddress) as Address;

function shortAddress(address?: Address) {
  if (!address) return "Not connected";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function formatCount(value: unknown) {
  return typeof value === "bigint" ? value.toLocaleString("en-US") : "0";
}

function moodLabel(value: unknown, updates: unknown) {
  if (typeof updates === "bigint" && updates === 0n) return "Not set";
  if (typeof value !== "number") return "Not set";
  return moods[value]?.label ?? "Not set";
}

export default function Home() {
  const [selectedMood, setSelectedMood] = useState<Mood["id"]>(0);
  const [connectOpen, setConnectOpen] = useState(false);

  const { address, chainId, isConnected } = useAccount();
  const { connectors, connect, isPending: isConnecting } = useConnect({
    mutation: {
      onSuccess: () => setConnectOpen(false),
    },
  });
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const {
    writeContract,
    data: writeHash,
    error: writeError,
    isPending: isWritePending,
    reset: resetWrite,
  } = useWriteContract();

  const contractReady = Boolean(CONTRACT_ADDRESS);
  const activeAddress = address ?? emptyAddress;

  const contracts = useMemo(
    () => {
      const shared = {
        address: readAddress(),
        abi: baseMoodMeterAbi,
        chainId: base.id,
      };

      return [
        {
          ...shared,
          functionName: "latestMood",
          args: [activeAddress],
        },
        {
          ...shared,
          functionName: "moodUpdates",
          args: [activeAddress],
        },
        {
          ...shared,
          functionName: "totalUpdates",
        },
        ...moods.map((mood) => ({
          ...shared,
          functionName: "moodCounts" as const,
          args: [mood.id],
        })),
      ];
    },
    [activeAddress],
  );

  const { data, refetch, isFetching } = useReadContracts({
    contracts: contracts as UseReadContractsParameters["contracts"],
    query: {
      enabled: contractReady,
      refetchInterval: 12_000,
    },
  });

  const latestMood = data?.[0]?.result;
  const myUpdates = data?.[1]?.result;
  const totalUpdates = data?.[2]?.result;
  const moodCounts = data?.slice(3).map((item) => item.result) ?? [];

  const {
    isLoading: isConfirming,
    isSuccess,
    isError: isReceiptError,
  } = useWaitForTransactionReceipt({
    hash: writeHash,
    chainId: base.id,
    query: {
      enabled: Boolean(writeHash),
    },
  });

  useEffect(() => {
    if (!isSuccess || !writeHash) return;
    void refetch();
  }, [isSuccess, refetch, writeHash]);

  const wrongNetwork = isConnected && chainId !== base.id;
  const selected = moods.find((mood) => mood.id === selectedMood) ?? moods[0];

  function handleSetMood() {
    resetWrite();

    if (!isConnected) {
      setConnectOpen(true);
      return;
    }

    if (wrongNetwork) {
      switchChain({ chainId: base.id });
      return;
    }

    if (!CONTRACT_ADDRESS) return;

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: baseMoodMeterAbi,
      functionName: "setMood",
      args: [selectedMood],
      chainId: base.id,
      dataSuffix: ATTRIBUTION_DATA_SUFFIX,
    });
  }

  const txState = isWritePending
    ? "Awaiting wallet approval"
    : isConfirming
      ? "Transaction pending"
      : isSuccess
        ? "Mood saved onchain"
        : writeError || isReceiptError
          ? "Transaction failed"
          : "Ready";

  return (
    <main className="min-h-dvh overflow-hidden bg-[#f8fbff] text-[#12192b]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,111,177,0.22),transparent_30%),radial-gradient(circle_at_82%_4%,rgba(255,221,85,0.28),transparent_28%),linear-gradient(180deg,#e9f4ff_0%,#fff7fc_54%,#f7fff5_100%)]" />
      <section className="relative mx-auto flex min-h-dvh w-full max-w-5xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between gap-3">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border-2 border-[#2b7fff] bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#2b7fff] shadow-[0_4px_0_#b8d6ff]">
              <Sparkles size={14} />
              Base Mini App
            </p>
            <h1 className="mt-3 text-4xl font-black leading-none text-[#111827] sm:text-5xl">
              Base Mood Meter
            </h1>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setConnectOpen((open) => !open)}
              className="inline-flex h-12 items-center gap-2 rounded-2xl border-2 border-[#111827] bg-white px-4 text-sm font-black shadow-[0_5px_0_#111827] transition active:translate-y-1 active:shadow-none"
            >
              <Wallet size={18} />
              <span className="hidden sm:inline">
                {isConnected ? shortAddress(address) : "Connect"}
              </span>
              <ChevronDown size={16} />
            </button>

            {connectOpen ? (
              <div className="absolute right-0 z-20 mt-3 w-72 rounded-[24px] border-2 border-[#111827] bg-white p-3 shadow-[0_10px_0_#111827]">
                <div className="flex items-center justify-between px-1 pb-2">
                  <p className="text-sm font-black">Wallet Status</p>
                  <button
                    type="button"
                    aria-label="Close wallet menu"
                    onClick={() => setConnectOpen(false)}
                    className="rounded-full bg-[#f3f7ff] p-1"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="grid gap-2">
                  {connectors.map((connector) => (
                    <button
                      key={connector.uid}
                      type="button"
                      onClick={() => connect({ connector, chainId: base.id })}
                      disabled={isConnecting}
                      className="flex items-center justify-between rounded-2xl border-2 border-[#d8e6ff] bg-[#f8fbff] px-3 py-3 text-left text-sm font-black transition hover:border-[#2b7fff]"
                    >
                      <span>{connector.name}</span>
                      <Plug size={16} />
                    </button>
                  ))}
                  {isConnected ? (
                    <button
                      type="button"
                      onClick={() => {
                        disconnect();
                        setConnectOpen(false);
                      }}
                      className="mt-1 flex items-center justify-between rounded-2xl border-2 border-[#ffc1d9] bg-[#fff0f7] px-3 py-3 text-sm font-black text-[#b0155a]"
                    >
                      <span>Disconnect</span>
                      <Power size={16} />
                    </button>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </header>

        <div className="grid flex-1 items-center gap-5 py-6 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[32px] border-2 border-[#111827] bg-white/92 p-4 shadow-[0_12px_0_#111827] sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-black uppercase text-[#2b7fff]">
                  Pick your mood
                </p>
                <h2 className="text-2xl font-black sm:text-3xl">
                  Make it onchain.
                </h2>
              </div>
              <button
                type="button"
                onClick={() => void refetch()}
                disabled={!contractReady || isFetching}
                aria-label="Refresh mood data"
                className="grid h-11 w-11 place-items-center rounded-2xl border-2 border-[#111827] bg-[#ffdd55] shadow-[0_4px_0_#111827] transition active:translate-y-1 active:shadow-none disabled:opacity-50"
              >
                <RefreshCw
                  size={18}
                  className={isFetching ? "animate-spin" : ""}
                />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {moods.map((mood) => {
                const active = mood.id === selectedMood;
                return (
                  <button
                    key={mood.id}
                    type="button"
                    onClick={() => setSelectedMood(mood.id)}
                    className={`${mood.tone} ${mood.shadow} min-h-32 rounded-[28px] border-2 p-4 text-left transition active:translate-y-1 active:shadow-none ${
                      active ? "scale-[1.02] ring-4 ring-white" : ""
                    }`}
                  >
                    <span className="flex items-center justify-between">
                      <span className="font-mono text-3xl font-black">
                        {mood.icon}
                      </span>
                      {active ? (
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#2b7fff]">
                          <Check size={18} strokeWidth={4} />
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-7 block text-2xl font-black leading-none">
                      {mood.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleSetMood}
              disabled={
                isWritePending ||
                isConfirming ||
                isSwitching ||
                (!contractReady && isConnected)
              }
              className="mt-6 flex h-16 w-full items-center justify-center gap-3 rounded-[24px] border-2 border-[#111827] bg-[#2b7fff] px-5 text-xl font-black text-white shadow-[0_8px_0_#111827] transition active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:bg-[#b8d6ff]"
            >
              {isWritePending || isConfirming || isSwitching ? (
                <Loader2 size={22} className="animate-spin" />
              ) : (
                <Sparkles size={22} />
              )}
              {wrongNetwork
                ? "Switch to Base"
                : isConnected
                  ? "Set Mood"
                  : "Connect to Set Mood"}
            </button>

            {!contractReady ? (
              <p className="mt-4 rounded-2xl border-2 border-[#ffdd55] bg-[#fff8cf] px-4 py-3 text-sm font-bold text-[#6b4a00]">
                Contract address is not configured yet.
              </p>
            ) : null}
          </section>

          <section className="grid gap-3">
            <div className="rounded-[28px] border-2 border-[#111827] bg-white p-4 shadow-[0_8px_0_#111827]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-black uppercase text-[#2b7fff]">
                    My Mood
                  </p>
                  <p className="text-3xl font-black">
                    {moodLabel(latestMood, myUpdates)}
                  </p>
                </div>
                <div
                  className={`${selected.tone} grid h-16 w-16 place-items-center rounded-3xl border-2 text-2xl font-black`}
                >
                  {selected.icon}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <StatCard label="My Updates" value={formatCount(myUpdates)} />
              <StatCard
                label="Total Updates"
                value={formatCount(totalUpdates)}
                accent="bg-[#ffdd55]"
              />
            </div>

            <div className="rounded-[28px] border-2 border-[#111827] bg-white p-4 shadow-[0_8px_0_#111827]">
              <p className="mb-3 text-sm font-black uppercase text-[#2b7fff]">
                Mood Breakdown
              </p>
              <div className="grid gap-3">
                {moods.map((mood, index) => {
                  const raw = moodCounts[index];
                  const count = typeof raw === "bigint" ? raw : 0n;
                  const total =
                    typeof totalUpdates === "bigint" && totalUpdates > 0n
                      ? totalUpdates
                      : 0n;
                  const width =
                    total > 0n ? Number((count * 100n) / total) : 0;

                  return (
                    <div key={mood.id}>
                      <div className="mb-1 flex items-center justify-between text-sm font-black">
                        <span>{mood.label}</span>
                        <span>{count.toLocaleString("en-US")}</span>
                      </div>
                      <div className="h-4 overflow-hidden rounded-full border-2 border-[#111827] bg-[#eef5ff]">
                        <div
                          className={`h-full ${mood.tone.split(" ")[0]}`}
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <InfoTile label="Wallet Status" value={shortAddress(address)} />
              <InfoTile
                label="Network"
                value={chainId === base.id ? "Base" : "Needs Base"}
              />
              <InfoTile label="Transaction" value={txState} />
              <InfoTile
                label="Attribution"
                value={BUILDER_CODE ? "Enabled" : "Waiting for builder code"}
              />
            </div>

            {writeHash ? (
              <a
                href={`https://basescan.org/tx/${writeHash}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-[24px] border-2 border-[#111827] bg-[#f0fff0] px-4 py-3 text-sm font-black shadow-[0_5px_0_#111827]"
              >
                <span>Last Transaction</span>
                <span className="inline-flex items-center gap-1 text-[#2b7fff]">
                  View <ArrowUpRight size={16} />
                </span>
              </a>
            ) : (
              <div className="rounded-[24px] border-2 border-dashed border-[#b8d6ff] bg-white/70 px-4 py-3 text-sm font-black text-[#58708f]">
                Last Transaction: None yet
              </div>
            )}

            {writeError ? (
              <p className="rounded-2xl border-2 border-[#ffc1d9] bg-[#fff0f7] px-4 py-3 text-sm font-bold text-[#b0155a]">
                {writeError.message}
              </p>
            ) : null}
          </section>
        </div>

        <footer className="pb-2 text-center text-xs font-bold text-[#58708f]">
          No token, no points, no rewards. Only Base gas for onchain updates.
        </footer>
      </section>
    </main>
  );
}

function StatCard({
  label,
  value,
  accent = "bg-[#ff6fb1]",
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="rounded-[28px] border-2 border-[#111827] bg-white p-4 shadow-[0_8px_0_#111827]">
      <div className={`mb-4 h-3 w-16 rounded-full ${accent}`} />
      <p className="text-sm font-black uppercase text-[#2b7fff]">{label}</p>
      <p className="text-3xl font-black">{value}</p>
    </div>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[22px] border-2 border-[#d8e6ff] bg-white/85 px-4 py-3">
      <p className="text-xs font-black uppercase text-[#2b7fff]">{label}</p>
      <p className="truncate text-sm font-black">{value}</p>
    </div>
  );
}
