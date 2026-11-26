import { locales, type SupportedLanguage } from './locales';
import { logger } from '@/utils/logger';

export { normalizeChromeLanguage, resolveBackendLanguage, resolveChromeLanguage } from './language';
export { resolveEntityLabel, resolveErrorLabel, resolveStatusLabel } from './integrationTranslations';

// Type for nested translation objects
type TranslationValue = string | { [key: string]: TranslationValue };

/**
 * Simple template replacement function
 * Replaces {{key}} patterns with values from params object
 */
function interpolate(template: string, params?: Record<string, string | number>): string {
  if (!params) return template;

  return Object.entries(params).reduce((result, [key, value]) => {
    return result.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
  }, template);
}

/**
 * Gets a nested value from an object using dot notation
 */
function getNestedValue(obj: TranslationValue, path: string): TranslationValue | undefined {
  return path.split('.').reduce<TranslationValue | undefined>((current, key) => {
    if (current && typeof current === 'object' && key in current) {
      return current[key];
    }
    return undefined;
  }, obj);
}

/**
 * Translation function creator
 */
export function createTranslator(language: SupportedLanguage = 'en') {
  const translations = locales[language] || locales.en;
  const fallback = locales.en as TranslationValue;

  /**
   * Translate a key with optional interpolation parameters
   * @param key - Translation key in dot notation (e.g., 'room_selector.title')
   * @param params - Optional parameters for interpolation
   */
  return function t(key: string, params?: Record<string, string | number>): string {
    let value = getNestedValue(translations as TranslationValue, key);

    // Per-key fallback: locale files are allowed to only translate a subset of keys,
    // so an untranslated string shows the English text instead of the raw key name.
    if (typeof value !== 'string') {
      value = getNestedValue(fallback, key);
    }

    if (typeof value !== 'string') {
      logger.warn(`Translation key not found: ${key}`);
      return key;
    }

    return interpolate(value, params);
  };
}

/**
 * Get the plural form for a count (the shipped locales share the same rule)
 */
export function getPluralKey(baseKey: string, count: number): string {
  // Both EN and TR use the plural form when count !== 1
  return count === 1 ? baseKey : `${baseKey}_plural`;
}

/**
 * Helper to get room count translation
 */
export function getRoomCountTranslation(t: ReturnType<typeof createTranslator>, count: number): string {
  if (count === 0) {
    return t('actions.select_rooms');
  }

  const key = count === 1 ? 'actions.clean_rooms' : 'actions.clean_rooms_plural';
  return t(key, { count: String(count) });
}

/**
 * Languages that use Right-to-Left text direction
 */
export const RTL_LANGUAGES: SupportedLanguage[] = [];

/**
 * Check if a language uses Right-to-Left text direction
 */
export function isRtlLanguage(lang: SupportedLanguage): boolean {
  return RTL_LANGUAGES.includes(lang);
}
