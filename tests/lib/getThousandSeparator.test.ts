import { getThousandSeparator } from './getThousandSeparator';

test.each`
	locales        | expected
	${ 'en-GB' }   | ${ ',' }
	${ 'en' }      | ${ ',' }
	${ 'en-US' }   | ${ ',' }
	${ 'ja-JP' }   | ${ ',' }
	${ 'ja' }      | ${ ',' }
	${ 'zh-CN' }   | ${ ',' }
	${ 'zh' }      | ${ ',' }
	${ 'fr-FR' }   | ${ ' ' }
	${ 'fr' }      | ${ ' ' }
	${ 'de-DE' }   | ${ '.' }
	${ 'de' }      | ${ '.' }
	${ 'it-IT' }   | ${ '.' }
	${ 'it' }      | ${ '.' }
	${ 'es-ES' }   | ${ '.' }
	${ 'es' }      | ${ '.' }
	${ 'ru-RU' }   | ${ ' ' }
	${ 'ru' }      | ${ ' ' }
	${ undefined } | ${ ',' }
`( 'getThousandSeparator($locales) === $expected', ( { locales, expected } ) => {
	const actual = getThousandSeparator( locales );
	if ( expected === ' ' ) {
		// \u00a0 is non-breaking space(&nbsp;)
		expect( actual ).toMatch( /[\s\u00a0]/ );
		expect( actual.trim() ).toBe( '' );
		expect( actual.replace( /\s/g, '' ) ).toBe( '' );
	} else {
		expect( actual ).toBe( expected );
	}
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

	// 小数点の文字列が見つからない場合は、デフォルト値として `,` を返す
	expect( getThousandSeparator() ).toBe( ',' );
} );
