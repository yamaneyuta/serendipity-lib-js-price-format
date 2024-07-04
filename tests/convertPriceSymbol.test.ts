import { convertToPriceSymbol } from '../src/functions/convertPriceSymbol';

test.each`
	symbol      | locales        | expected
	${ 'JPY' }  | ${ undefined } | ${ '¥' }
	${ 'JPY' }  | ${ 'en-US' }   | ${ '¥' }
	${ 'JPY' }  | ${ 'ja-JP' }   | ${ '￥' }
	${ 'USD' }  | ${ undefined } | ${ '$' }
	${ 'USD' }  | ${ 'en-US' }   | ${ '$' }
	${ 'USD' }  | ${ 'ja-JP' }   | ${ '$' }
	${ 'EUR' }  | ${ undefined } | ${ '€' }
	${ 'EUR' }  | ${ 'en-US' }   | ${ '€' }
	${ 'EUR' }  | ${ 'ja-JP' }   | ${ '€' }
	${ 'ETH' }  | ${ undefined } | ${ 'ETH' }
	${ 'ETH' }  | ${ 'en-US' }   | ${ 'ETH' }
	${ 'ETH' }  | ${ 'ja-JP' }   | ${ 'ETH' }
	${ 'USDC' } | ${ undefined } | ${ 'USDC' }
	${ 'USDC' } | ${ 'en-US' }   | ${ 'USDC' }
	${ 'USDC' } | ${ 'ja-JP' }   | ${ 'USDC' }
`( 'getDecimalSeparator($locales) === $expected', ( { symbol, locales, expected } ) => {
	expect( convertToPriceSymbol( symbol, locales ) ).toBe( expected );
} );

// Intl.NumberFormat::formatToParts関数の戻り値が想定外の場合のテスト
test( 'fail safe', () => {
	jest.spyOn( Intl, 'NumberFormat' ).mockImplementation( ( locales?: any, options?: any ) => {
		return {
			formatToParts: () => [],
		} as any;
	} );

	// コンソールエラーで何も出力しない設定
	jest.spyOn( console, 'error' ).mockImplementation();

	// formatToPartsの戻り値が不正な場合は、引数として指定した通貨記号を返す
	expect( convertToPriceSymbol( 'SAMPLE' ) ).toBe( 'SAMPLE' );
} );

// Intl.NumberFormat::formatToParts関数で不明な例外が発生した場合のテスト
test( 'fail safe2', () => {
	jest.spyOn( Intl, 'NumberFormat' ).mockImplementation( ( locales?: any, options?: any ) => {
		return {
			formatToParts: () => {
				throw new Error( 'Unknown error' );
			},
		} as any;
	} );

	// コンソールエラーで何も出力しない設定
	jest.spyOn( console, 'error' ).mockImplementation();

	// formatToPartsで例外が発生する場合はそのまま例外がスローされる
	expect( () => convertToPriceSymbol( 'SAMPLE' ) ).toThrow( 'Unknown error' );
} );
