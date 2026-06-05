export const baseMoodMeterAbi = [
  {
    type: "function",
    name: "latestMood",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "uint8" }],
  },
  {
    type: "function",
    name: "moodUpdates",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "moodCounts",
    stateMutability: "view",
    inputs: [{ name: "", type: "uint8" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "totalUpdates",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "setMood",
    stateMutability: "nonpayable",
    inputs: [{ name: "mood", type: "uint8" }],
    outputs: [],
  },
  {
    type: "event",
    name: "MoodSet",
    inputs: [
      { name: "user", type: "address", indexed: true },
      { name: "mood", type: "uint8", indexed: false },
      { name: "userUpdates", type: "uint256", indexed: false },
      { name: "totalUpdates", type: "uint256", indexed: false },
    ],
    anonymous: false,
  },
] as const;
