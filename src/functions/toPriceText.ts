import { isLegalCurrency } from './isLegalCurrency';
import { convertToPriceSymbol } from './convertPriceSymbol';
import { getDecimalSeparator } from './getDecimalSeparator';
import { getLiteral } from './getLiteral';
import { splitPart } from './splitPart';

/**
 * 価格(文字列)を返します。
 * @param amount
 * @param decimals
 * @param symbol
 * @param locales
 */
export const toPriceText = (
	amount: bigint | number | string,
	decimals: number,
	symbol: string | undefined,
	locales?: Intl.LocalesArgument
) => {
	amount = BigInt( amount );
	// 引数チェック
	if ( amount < 0 ) {
		throw new RangeError( "'amount' must be a non-negative integer" );
	}
	if ( decimals < 0 ) {
		throw new RangeError( "'decimals' must be a non-negative integer" );
	}

	// 法定通貨の場合は、Intlオブジェクトを使って価格の文字列を作成
	if ( symbol && isLegalCurrency( symbol, locales ) ) {
		// `narrow`オプションは現時点で不使用
		// https://stackoverflow.com/questions/52410407/intl-numberformat-currency-us-currency-symbol
		return Intl.NumberFormat( locales, { style: 'currency', currency: symbol } ).format(
			Number( amount ) / 10 ** decimals
		);
	}

	// 以下、法定通貨以外(暗号資産等)の場合の処理

	// 整数部分と小数点以下を数値だけの文字列で取得
	const { integerPart, decimalPart } = splitPart( amount, decimals );

	// 整数部分にカンマ区切り等を入れる(例: `1,234,567,890`)
	const integerPartWithThousandSeparator = Intl.NumberFormat( locales, { style: 'currency', currency: 'USD' } )
		.format( BigInt( integerPart ) )
		.replace( convertToPriceSymbol( 'USD', locales ), '' )
		.trim()
		.split( getDecimalSeparator( locales ) )[ 0 ]; // 1USD => $1.00となるため、小数点以下は削除

	// 小数点を含む、通貨記号無しの価格文字列を取得(例: `1,234,567,890.12345`)
	const rawPrice = ( () => {
		if ( decimalPart === '' ) {
			return integerPartWithThousandSeparator;
		}
		const decimalSeparator = getDecimalSeparator( locales ); // 小数点の区切り文字
		return `${ integerPartWithThousandSeparator }${ decimalSeparator }${ decimalPart }`;
	} )();

	// 通貨記号が指定されている場合は付与して返す
	return !! symbol ? `${ rawPrice }${ getLiteral() }${ symbol }` : rawPrice;
};
