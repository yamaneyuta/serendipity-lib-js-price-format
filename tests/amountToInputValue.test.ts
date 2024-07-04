import { amountToInputValue } from '../src/functions/amountToInputValue';

test.each`
	amount    | decimals | locales        | expected
	${ 0 }    | ${ 0 }   | ${ undefined } | ${ '0' }
	${ 1 }    | ${ 2 }   | ${ undefined } | ${ '0.01' }
	${ 1 }    | ${ 2 }   | ${ 'en-US' }   | ${ '0.01' }
	${ 1 }    | ${ 2 }   | ${ 'ja-JP' }   | ${ '0.01' }
	${ 1 }    | ${ 2 }   | ${ 'fr-FR' }   | ${ '0,01' }
	${ 1 }    | ${ 2 }   | ${ 'de-DE' }   | ${ '0,01' }
	${ 1234 } | ${ 2 }   | ${ undefined } | ${ '12.34' }
	${ 1234 } | ${ 2 }   | ${ 'en-US' }   | ${ '12.34' }
	${ 1234 } | ${ 2 }   | ${ 'ja-JP' }   | ${ '12.34' }
	${ 1234 } | ${ 2 }   | ${ 'fr-FR' }   | ${ '12,34' }
	${ 1234 } | ${ 2 }   | ${ 'de-DE' }   | ${ '12,34' }
	${ 1234 } | ${ 0 }   | ${ undefined } | ${ '1234' }
	${ 1234 } | ${ 0 }   | ${ 'en-US' }   | ${ '1234' }
	${ 1234 } | ${ 0 }   | ${ 'ja-JP' }   | ${ '1234' }
	${ 1234 } | ${ 0 }   | ${ 'fr-FR' }   | ${ '1234' }
	${ 1234 } | ${ 0 }   | ${ 'de-DE' }   | ${ '1234' }
`(
	'amountToInputValue($amount, $decimals, $symbol, $locales) === $expected',
	( { amount, decimals, locales, expected } ) => {
		expect( amountToInputValue( amount, decimals, locales ) ).toBe( expected );
	}
);
