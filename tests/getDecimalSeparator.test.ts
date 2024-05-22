import { getDecimalSeparator } from '../src/functions/getDecimalSeparator';

// https://ja.wikipedia.org/wiki/%E5%B0%8F%E6%95%B0%E7%82%B9
// > 小数点として点（point on the line）を用いるか、コンマ（comma on the line）を用いるかは、国、地域、文化によってまちまちである。
// > ごく大まかには、イギリス、米国、日本、中国、インドでは「点」を用い、
// > フランス、ドイツ、イタリア、スペイン、ロシアでは「コンマ」を用いる。

test.each`
	locales        | expected
	${ 'en-GB' }   | ${ '.' }
	${ 'en' }      | ${ '.' }
	${ 'en-US' }   | ${ '.' }
	${ 'ja-JP' }   | ${ '.' }
	${ 'ja' }      | ${ '.' }
	${ 'zh-CN' }   | ${ '.' }
	${ 'zh' }      | ${ '.' }
	${ 'fr-FR' }   | ${ ',' }
	${ 'fr' }      | ${ ',' }
	${ 'de-DE' }   | ${ ',' }
	${ 'de' }      | ${ ',' }
	${ 'it-IT' }   | ${ ',' }
	${ 'it' }      | ${ ',' }
	${ 'es-ES' }   | ${ ',' }
	${ 'es' }      | ${ ',' }
	${ 'ru-RU' }   | ${ ',' }
	${ 'ru' }      | ${ ',' }
	${ undefined } | ${ '.' }
`( 'getDecimalSeparator($locales) === $expected', ( { locales, expected } ) => {
	expect( getDecimalSeparator( locales ) ).toBe( expected );
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

	// 小数点の文字列が見つからない場合は、デフォルト値として `.` を返す
	expect( getDecimalSeparator() ).toBe( '.' );
} );
