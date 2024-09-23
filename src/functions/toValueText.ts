import { splitPart } from './splitPart';
import { getDecimalSeparator } from './getDecimalSeparator';

/**
 * テキストボックス(input)用の価格文字列に変換します。
 *
 * 通貨記号は含まれません。
 * @param amount
 * @param decimals
 * @param locales
 */
export const toValueText = ( amount: bigint | number | string, decimals: number, locales?: Intl.LocalesArgument ) => {
	const { integerPart, decimalPart } = splitPart( BigInt( amount ), decimals );

	if ( decimalPart === '' ) {
		return integerPart;
	} else {
		const decimalSeparator = getDecimalSeparator( locales );
		return `${ integerPart }${ decimalSeparator }${ decimalPart }`;
	}
};
