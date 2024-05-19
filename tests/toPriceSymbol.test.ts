import { toPriceSymbol } from "../src/functions/toPriceSymbol";

test.each`
    symbol    | locales    | expected
    ${"JPY"}  | ${undefined} | ${"¥"}
    ${"JPY"}  | ${"en-US"} | ${"¥"}
    ${"JPY"}  | ${"ja-JP"} | ${"￥"}

    ${"USD"}  | ${undefined} | ${"$"}
    ${"USD"}  | ${"en-US"} | ${"$"}
    ${"USD"}  | ${"ja-JP"} | ${"$"}

    ${"EUR"}  | ${undefined} | ${"€"}
    ${"EUR"}  | ${"en-US"} | ${"€"}
    ${"EUR"}  | ${"ja-JP"} | ${"€"}

    ${"ETH"}  | ${undefined} | ${"ETH"}
    ${"ETH"}  | ${"en-US"} | ${"ETH"}
    ${"ETH"}  | ${"ja-JP"} | ${"ETH"}

    ${"USDC"} | ${undefined} | ${"USDC"}
    ${"USDC"} | ${"en-US"} | ${"USDC"}
    ${"USDC"} | ${"ja-JP"} | ${"USDC"}

`('getDecimalSeparator($locales) === $expected', ({ symbol, locales, expected }) => {
    expect(toPriceSymbol(symbol, locales)).toBe(expected);
});
    