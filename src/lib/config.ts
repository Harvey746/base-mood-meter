import { Attribution } from "ox/erc8021";
import type { Address, Hex } from "viem";

export const CONTRACT_ADDRESS =
  "0xe17c3b59d5ef2b6421d13d0a96fc60658c10bcb3" as Address;

export const BUILDER_CODE = "";

export const ATTRIBUTION_DATA_SUFFIX = (
  BUILDER_CODE
    ? Attribution.toDataSuffix({ codes: [BUILDER_CODE] })
    : "0x"
) as Hex;
