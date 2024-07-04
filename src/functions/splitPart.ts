/**
 * amount + decimals を整数部分の文字列と小数点以下の文字列として返します。
 * @param amount
 * @param decimals
 */
export const splitPart = ( amount: bigint | number, decimals: number ) => {
	const tmp = '0'.repeat( decimals ) + amount.toString();
	let integerPart = decimals === 0 ? tmp : tmp.slice( 0, -decimals ).replace( /^0+/, '' );
	const decimalPart = decimals === 0 ? '' : tmp.slice( -decimals ).replace( /0+$/, '' );
	integerPart = integerPart === '' ? '0' : integerPart; // 整数部分が空の場合は`0`を代入

	return { integerPart, decimalPart };
};
