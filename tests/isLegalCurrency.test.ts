import { isLegalCurrency } from "../src/functions/isLegalCurrency";

test.each`
    symbol    | locales    | expected
    ${"JPY"}  | ${undefined} | ${true}
    ${"USD"}  | ${undefined} | ${true}
    ${"EUR"}  | ${undefined} | ${true}
    ${"ETH"}  | ${undefined} | ${false}
    ${"USDC"} | ${undefined} | ${false}
    
    ${"JPY"}  | ${"ja-JP"} | ${true}
    ${"USD"}  | ${"ja-JP"} | ${true}
    ${"EUR"}  | ${"ja-JP"} | ${true}
    ${"ETH"}  | ${"ja-JP"} | ${false}
    ${"USDC"} | ${"ja-JP"} | ${false}

    ${"JPY"}  | ${"en-US"} | ${true}
    ${"USD"}  | ${"en-US"} | ${true}
    ${"EUR"}  | ${"en-US"} | ${true}
    ${"ETH"}  | ${"en-US"} | ${false}
    ${"USDC"} | ${"en-US"} | ${false}

    ${"FOO"} | ${undefined} | ${false}

`('isLegalCurrency($symbol, $locales) === $expected', ({ symbol, locales, expected }) => {
    expect(isLegalCurrency(symbol, locales)).toBe(expected);
});