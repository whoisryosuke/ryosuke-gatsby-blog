/**
 * Checks if user has dark mode set
 * @returns {boolean} True = Dark Mode Enabled
 */
export const isDarkMode = () => typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches