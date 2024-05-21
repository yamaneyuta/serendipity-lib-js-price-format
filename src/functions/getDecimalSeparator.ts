/**
 * ロケールに応じた小数点の文字列を返します。
 *
 * @param locales
 * @return 小数点の文字列(例: `.` or `,` or ...)
 */
export const getDecimalSeparator = ( locales?: Intl.LocalesArgument ): string => {
	const parts = Intl.NumberFormat( locales ).formatToParts( 1.1 );

	const ret = parts.find( ( part ) => part.type === 'decimal' )?.value;
	if ( ret === undefined ) {
		console.error( '[D17C8EFE] Decimal separator not found. parts: ', JSON.stringify( parts ) );
		// fail safe
		return '.';
	}

	return ret;
};
