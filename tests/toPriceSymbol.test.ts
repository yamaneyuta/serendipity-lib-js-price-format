import { toPriceSymbol } from "../src/functions/toPriceSymbol";

test.each`
    symbol    | locales    | expected
    ${"JPY"}  | ${undefined} | ${"¥"}
    ${"USD"}  | ${undefined} | ${"$"}
    ${"EUR"}  | ${undefined} | ${"€"}
    ${"ETH"}  | ${undefined} | ${"ETH"}
    ${"USDC"} | ${undefined} | ${"USDC"}
    
    ${"JPY"}  | ${"ja-JP"} | ${"￥"}
    ${"USD"}  | ${"ja-JP"} | ${"$"}
    ${"EUR"}  | ${"ja-JP"} | ${"€"}
    ${"ETH"}  | ${"ja-JP"} | ${"ETH"}
    ${"USDC"} | ${"ja-JP"} | ${"USDC"}

    ${"JPY"}  | ${"en-US"} | ${"¥"}
    ${"USD"}  | ${"en-US"} | ${"$"}
    ${"EUR"}  | ${"en-US"} | ${"€"}
    ${"ETH"}  | ${"en-US"} | ${"ETH"}
    ${"USDC"} | ${"en-US"} | ${"USDC"}
`('getDecimalSeparator($locales) === $expected', ({ symbol, locales, expected }) => {
    expect(toPriceSymbol(symbol, locales)).toBe(expected);
});
    