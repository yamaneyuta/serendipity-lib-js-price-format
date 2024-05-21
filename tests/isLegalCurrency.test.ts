import { isLegalCurrency } from '../src/functions/isLegalCurrency';

test.each`
	symbol      | locales        | expected
	${ 'JPY' }  | ${ undefined } | ${ true }
	${ 'JPY' }  | ${ 'en-US' }   | ${ true }
	${ 'JPY' }  | ${ 'ja-JP' }   | ${ true }
	${ 'USD' }  | ${ undefined } | ${ true }
	${ 'USD' }  | ${ 'en-US' }   | ${ true }
	${ 'USD' }  | ${ 'ja-JP' }   | ${ true }
	${ 'EUR' }  | ${ undefined } | ${ true }
	${ 'EUR' }  | ${ 'en-US' }   | ${ true }
	${ 'EUR' }  | ${ 'ja-JP' }   | ${ true }
	${ 'ETH' }  | ${ undefined } | ${ false }
	${ 'ETH' }  | ${ 'en-US' }   | ${ false }
	${ 'ETH' }  | ${ 'ja-JP' }   | ${ false }
	${ 'USDC' } | ${ undefined } | ${ false }
	${ 'USDC' } | ${ 'ja-JP' }   | ${ false }
	${ 'USDC' } | ${ 'en-US' }   | ${ false }
	${ 'FOO' }  | ${ undefined } | ${ false }
	${ 'FOO' }  | ${ 'ja-JP' }   | ${ false }
	${ 'FOO' }  | ${ 'en-US' }   | ${ false }
`( 'isLegalCurrency($symbol, $locales) === $expected', ( { symbol, locales, expected } ) => {
	expect( isLegalCurrency( symbol, locales ) ).toBe( expected );
} );
