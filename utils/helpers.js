import { ethers } from "ethers";

/**
 * Format token amount for display
 * @param {string|number} amount - Token amount
 * @param {number} decimals - Token decimals
 * @param {number} displayDecimals - Number of decimals to display
 * @returns {string} Formatted amount
 */
export const formatTokenAmount = (
  amount,
  decimals = 18,
  displayDecimals = 4
) => {
  if (!amount || amount === "0") return "0";

  try {
    const formattedAmount = ethers.utils.formatUnits(amount, decimals);
    const numAmount = parseFloat(formattedAmount);

    if (numAmount === 0) return "0";
    if (numAmount < 0.0001) return "< 0.0001";

    return numAmount.toFixed(displayDecimals);
  } catch (error) {
    console.error("Error formatting token amount:", error);
    return "0";
  }
};

/**
 * Parse token amount from user input
 * @param {string} amount - User input amount
 * @param {number} decimals - Token decimals
 * @returns {ethers.BigNumber} Parsed amount
 */
export const parseTokenAmount = (amount, decimals = 18) => {
  if (!amount || amount === "") return ethers.BigNumber.from(0);

  try {
    return ethers.utils.parseUnits(amount, decimals);
  } catch (error) {
    console.error("Error parsing token amount:", error);
    return ethers.BigNumber.from(0);
  }
};

/**
 * Truncate address for display
 * @param {string} address - Ethereum address
 * @param {number} startChars - Number of characters at start
 * @param {number} endChars - Number of characters at end
 * @returns {string} Truncated address
 */
export const truncateAddress = (address, startChars = 6, endChars = 4) => {
  if (!address) return "";
  if (address.length <= startChars + endChars) return address;

  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
};

/**
 * Validate Ethereum address
 * @param {string} address - Address to validate
 * @returns {boolean} Is valid address
 */
export const isValidAddress = (address) => {
  try {
    return ethers.utils.isAddress(address);
  } catch (error) {
    return false;
  }
};

/**
 * Format price for display
 * @param {number} price - Price value
 * @param {number} decimals - Number of decimals to show
 * @returns {string} Formatted price
 */
export const formatPrice = (price, decimals = 6) => {
  if (!price || price === 0) return "0";

  if (price < 0.000001) return "< 0.000001";
  if (price >= 1000000) return `${(price / 1000000).toFixed(2)}M`;
  if (price >= 1000) return `${(price / 1000).toFixed(2)}K`;

  return price.toFixed(decimals);
};

/**
 * Calculate slippage amount
 * @param {string} amount - Original amount
 * @param {number} slippagePercent - Slippage percentage (e.g., 0.5 for 0.5%)
 * @param {number} decimals - Token decimals
 * @returns {ethers.BigNumber} Amount with slippage applied
 */
export const calculateSlippage = (amount, slippagePercent, decimals = 18) => {
  try {
    const parsedAmount = parseTokenAmount(amount, decimals);
    const slippageMultiplier = (100 - slippagePercent) / 100;
    const slippageAmount = parsedAmount
      .mul(Math.floor(slippageMultiplier * 100))
      .div(100);

    return slippageAmount;
  } catch (error) {
    console.error("Error calculating slippage:", error);
    return ethers.BigNumber.from(0);
  }
};

/**
 * Get token symbol from popular tokens or return default
 * @param {string} address - Token address
 * @param {object} popularTokens - Popular tokens object
 * @returns {string} Token symbol
 */
export const getTokenSymbol = (address, popularTokens = {}) => {
  const token = Object.values(popularTokens).find(
    (token) => token.address.toLowerCase() === address.toLowerCase()
  );

  return token ? token.symbol : "TOKEN";
};

/**
 * Format transaction hash for display
 * @param {string} hash - Transaction hash
 * @returns {string} Formatted hash
 */
export const formatTxHash = (hash) => {
  if (!hash) return "";
  return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
};

/**
 * Get explorer URL for transaction
 * @param {string} hash - Transaction hash
 * @param {string} network - Network name (default: polygon)
 * @returns {string} Explorer URL
 */
export const getExplorerUrl = (hash, network = "polygon") => {
  const explorers = {
    polygon: "https://polygonscan.com/tx/",
    ethereum: "https://etherscan.io/tx/",
    bsc: "https://bscscan.com/tx/",
  };

  return `${explorers[network] || explorers.polygon}${hash}`;
};

/**
 * Wait for specified time
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise} Promise that resolves after delay
 */
export const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Retry function with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} baseDelay - Base delay in milliseconds
 * @returns {Promise} Promise that resolves with function result
 */
export const retryWithBackoff = async (
  fn,
  maxRetries = 3,
  baseDelay = 1000
) => {
  let lastError;

  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (i === maxRetries) {
        throw lastError;
      }

      const delayTime = baseDelay * Math.pow(2, i);
      await delay(delayTime);
    }
  }
};

/**
 * Check if amount has sufficient balance
 * @param {string} amount - Amount to check
 * @param {string} balance - Available balance
 * @param {number} decimals - Token decimals
 * @returns {boolean} Has sufficient balance
 */
export const hasSufficientBalance = (amount, balance, decimals = 18) => {
  try {
    if (!amount || !balance) return false;

    const parsedAmount = parseTokenAmount(amount, decimals);
    const parsedBalance = parseTokenAmount(balance, decimals);

    return parsedBalance.gte(parsedAmount);
  } catch (error) {
    console.error("Error checking balance:", error);
    return false;
  }
};

/**
 * Format large numbers with proper suffixes
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export const formatLargeNumber = (num) => {
  if (!num || num === 0) return "0";

  const absNum = Math.abs(num);

  if (absNum >= 1e12) return `${(num / 1e12).toFixed(2)}T`;
  if (absNum >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
  if (absNum >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
  if (absNum >= 1e3) return `${(num / 1e3).toFixed(2)}K`;

  return num.toFixed(2);
};

/**
 * Get relative time string
 * @param {Date|number} date - Date to compare
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date) => {
  const now = Date.now();
  const diffMs = now - (date instanceof Date ? date.getTime() : date);
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;

  return new Date(date).toLocaleDateString();
};

/**
 * Calculate percentage change
 * @param {number} oldValue - Old value
 * @param {number} newValue - New value
 * @returns {number} Percentage change
 */
export const calculatePercentageChange = (oldValue, newValue) => {
  if (!oldValue || oldValue === 0) return 0;
  return ((newValue - oldValue) / oldValue) * 100;
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
