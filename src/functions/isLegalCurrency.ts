import { ISO_4217_ALPHABETIC_CODES } from '../constants/iso4217';

/**
 * 指定した通貨記号が法定通貨のものかどうかを判定します。
 *
 * @example
 * - isLegalCurrency('USD') // => true
 * - isLegalCurrency('JPY') // => true
 * - isLegalCurrency('ETH') // => false
 *
 * @param symbol
 * @param locales
 */
export const isLegalCurrency = ( symbol: string, locales?: Intl.LocalesArgument ): boolean => {
	return ISO_4217_ALPHABETIC_CODES.includes( symbol );
};
