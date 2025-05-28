// Network Configuration
export const CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID);
export const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;

// Commission Settings
export const COMMISSION_AMOUNT = process.env.NEXT_PUBLIC_COMMISSION_AMOUNT;
export const COMMISSION_RECIPIENT =
  process.env.NEXT_PUBLIC_COMMISSION_RECIPIENT;

// Uniswap V3 Contract Addresses
export const UNISWAP_V3_FACTORY = process.env.NEXT_PUBLIC_UNISWAP_V3_FACTORY;
export const UNISWAP_V3_POSITION_MANAGER =
  process.env.NEXT_PUBLIC_UNISWAP_V3_POSITION_MANAGER;
export const UNISWAP_V3_ROUTER = process.env.NEXT_PUBLIC_UNISWAP_V3_ROUTER;

// Popular Token Addresses
export const POPULAR_TOKENS = {
  WPOL: {
    address: process.env.NEXT_PUBLIC_WMATIC_ADDRESS,
    symbol: "WPOL",
    name: "Wrapped POL",
    decimals: 18,
    logoURI: "/Wrapped-POL.png",
  },
  LTUM: {
    address: process.env.NEXT_PUBLIC_LTUM_ADDRESS,
    symbol: "LTUM",
    name: "LINKTUM",
    decimals: 18,
    logoURI: "/LINKTUM.png",
  },
};

// Fee Tiers for Uniswap V3
export const FEE_TIERS = [
  { value: 500, label: "0.05%", description: "Best for very stable pairs" },
  { value: 3000, label: "0.3%", description: "Best for most pairs" },
  { value: 10000, label: "1%", description: "Best for exotic pairs" },
];

// ERC20 ABI (minimal)
export const ERC20_ABI = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "_owner", type: "address" },
      { name: "_spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", type: "uint256" }],
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_from", type: "address" },
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", type: "bool" }],
    type: "function",
  },
];

// Uniswap V3 Position Manager ABI (minimal)
export const POSITION_MANAGER_ABI = [
  {
    inputs: [
      { internalType: "address", name: "token0", type: "address" },
      { internalType: "address", name: "token1", type: "address" },
      { internalType: "uint24", name: "fee", type: "uint24" },
      { internalType: "uint160", name: "sqrtPriceX96", type: "uint160" },
    ],
    name: "createAndInitializePoolIfNecessary",
    outputs: [{ internalType: "address", name: "pool", type: "address" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "token0", type: "address" },
          { internalType: "address", name: "token1", type: "address" },
          { internalType: "uint24", name: "fee", type: "uint24" },
          { internalType: "int24", name: "tickLower", type: "int24" },
          { internalType: "int24", name: "tickUpper", type: "int24" },
          { internalType: "uint256", name: "amount0Desired", type: "uint256" },
          { internalType: "uint256", name: "amount1Desired", type: "uint256" },
          { internalType: "uint256", name: "amount0Min", type: "uint256" },
          { internalType: "uint256", name: "amount1Min", type: "uint256" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
        ],
        internalType: "struct INonfungiblePositionManager.MintParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "mint",
    outputs: [
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "uint128", name: "liquidity", type: "uint128" },
      { internalType: "uint256", name: "amount0", type: "uint256" },
      { internalType: "uint256", name: "amount1", type: "uint256" },
    ],
    stateMutability: "payable",
    type: "function",
  },
];
