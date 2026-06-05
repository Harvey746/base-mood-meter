import { Attribution } from "ox/erc8021";
import type { Address, Hex } from "viem";

export const CONTRACT_ADDRESS = "" as Address | "";

export const BUILDER_CODE = "";

export const ATTRIBUTION_DATA_SUFFIX = (
  BUILDER_CODE
    ? Attribution.toDataSuffix({ codes: [BUILDER_CODE] })
    : "0x"
) as Hex;
