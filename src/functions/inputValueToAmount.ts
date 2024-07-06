/**
 * HTMLのinput要素の入力テキストを、金額と小数点以下の桁数に変換します。
 * @param value
 */
export const inputValueToAmount = ( value: string ): { amount: bigint; decimals: number } => {
	let { amount, decimals } = _inputValueToAmount( value );

	// 小数点以下の数字が0で終わっている場合は、その0を削除する
	while ( decimals > 0 && amount % 10n === 0n ) {
		amount /= 10n;
		decimals -= 1;
	}

	return { amount, decimals };
};

const _inputValueToAmount = ( value: string ): { amount: bigint; decimals: number } => {
	// 数値が連続する部分を取り出す(1つまたは2つが取得できるはず)
	const numbers = value.match( /\d+/g );

	if ( numbers === null ) {
		return { amount: BigInt( 0 ), decimals: 0 };
	}

	if ( numbers.length === 1 ) {
		if ( value.startsWith( numbers[ 0 ] ) ) {
			// valueが数値で開始する文字列の場合は、整数部分だけ入力されたものとして扱う
			return { amount: BigInt( numbers[ 0 ] ), decimals: 0 };
		} else {
			// 数値で開始しない場合はゼロ以下の値が入力されたものとして扱う
			return { amount: BigInt( numbers[ 0 ] ), decimals: numbers[ 0 ].length };
		}
	} else if ( numbers.length === 2 ) {
		return { amount: BigInt( numbers[ 0 ] + numbers[ 1 ] ), decimals: numbers[ 1 ].length };
	}

	throw new Error( `[0EC6294F] Invalid input value. - value: ${ value }` );
};
