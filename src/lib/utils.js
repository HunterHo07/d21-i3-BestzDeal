/**
 * Format a price with currency symbol
 * @param {number} price - The price to format
 * @param {string} currency - The currency code (default: USD)
 * @returns {string} Formatted price string
 */
export function formatPrice(price, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price);
}

/**
 * Format a date to a readable string
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Calculate time elapsed since a given date
 * @param {string} dateString - ISO date string
 * @returns {string} Time elapsed string (e.g., "2 days ago")
 */
export function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return interval === 1 ? '1 year ago' : `${interval} years ago`;
  }
  
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval === 1 ? '1 month ago' : `${interval} months ago`;
  }
  
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval === 1 ? '1 day ago' : `${interval} days ago`;
  }
  
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval === 1 ? '1 hour ago' : `${interval} hours ago`;
  }
  
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval === 1 ? '1 minute ago' : `${interval} minutes ago`;
  }
  
  return 'Just now';
}

/**
 * Generate a random ID
 * @param {number} length - Length of the ID (default: 8)
 * @returns {string} Random ID
 */
export function generateId(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Truncate text to a specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length (default: 100)
 * @returns {string} Truncated text
 */
export function truncateText(text, length = 100) {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}

/**
 * Get a random item from an array
 * @param {Array} array - The array to pick from
 * @returns {*} Random item from the array
 */
export function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Delay execution for a specified time
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise} Promise that resolves after the delay
 */
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Save data to localStorage
 * @param {string} key - Storage key
 * @param {*} data - Data to store
 */
export function saveToLocalStorage(key, data) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

/**
 * Load data from localStorage
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {*} Retrieved data or default value
 */
export function loadFromLocalStorage(key, defaultValue = null) {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Error parsing stored data:', error);
        return defaultValue;
      }
    }
  }
  return defaultValue;
}

/**
 * Simulate an API call with a delay
 * @param {*} data - Data to return
 * @param {number} delayMs - Delay in milliseconds (default: 1000)
 * @param {boolean} shouldFail - Whether the call should fail (default: false)
 * @returns {Promise} Promise that resolves with the data or rejects
 */
export function simulateApiCall(data, delayMs = 1000, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('API call failed'));
      } else {
        resolve(data);
      }
    }, delayMs);
  });
}

/**
 * Calculate average rating
 * @param {Array} reviews - Array of review objects with rating property
 * @returns {number} Average rating
 */
export function calculateAverageRating(reviews) {
  if (!reviews || reviews.length === 0) return 0;
  const sum = reviews.reduce((total, review) => total + review.rating, 0);
  return (sum / reviews.length).toFixed(1);
}

/**
 * Generate a random price within a range
 * @param {number} min - Minimum price
 * @param {number} max - Maximum price
 * @returns {number} Random price
 */
export function generateRandomPrice(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Debounce a function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
