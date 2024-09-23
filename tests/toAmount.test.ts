import { toAmount } from '../src/functions/toAmount';

test.each`
	value             | expectedAmount | expectedDecimals
	${ '' }           | ${ '0' }       | ${ 0 }
	${ '0.1' }        | ${ '1' }       | ${ 1 }
	${ '0.123' }      | ${ '123' }     | ${ 3 }
	${ '0,123' }      | ${ '123' }     | ${ 3 }
	${ '1' }          | ${ '1' }       | ${ 0 }
	${ '123' }        | ${ '123' }     | ${ 0 }
	${ '123.456' }    | ${ '123456' }  | ${ 3 }
	${ '123,456' }    | ${ '123456' }  | ${ 3 }
	${ '0.1000' }     | ${ '1' }       | ${ 1 }
	${ '0,1000' }     | ${ '1' }       | ${ 1 }
	${ '123.456000' } | ${ '123456' }  | ${ 3 }
	${ '123,456' }    | ${ '123456' }  | ${ 3 }
	${ '.123' }       | ${ '123' }     | ${ 3 }
	${ ',123' }       | ${ '123' }     | ${ 3 }
	${ '.123000' }    | ${ '123' }     | ${ 3 }
	${ ',123000' }    | ${ '123' }     | ${ 3 }
`(
	'toAmount($value) === { amount: $expectedAmount, decimals: $expectedDecimals }',
	( { value, expectedAmount, expectedDecimals } ) => {
		const { amount, decimals } = toAmount( value );

		expect( amount.toString() ).toBe( expectedAmount );
		expect( decimals ).toBe( expectedDecimals );
	}
);

// 不正な文字列の場合
test.each`
	value
	${ '1.2.3' }
	${ '1,2.3' }
	${ '1.2,3' }
	${ '1,2,3' }
`( 'toAmount($value) throws an error', ( { value } ) => {
	expect( () => toAmount( value ) ).toThrow( 'Invalid input value.' );
} );

/*
未テスト
${ 'a' }
${ '1a' }
${ '1.2a' }
*/
