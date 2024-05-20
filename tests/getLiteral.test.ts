import { getLiteral } from "../src/functions/getLiteral";

const LITERAL = getLiteral();

/*
- en: '$1.00'
- ja: '$1.00'
- zh: 'US$1.00'
- fr: '1,00 $US'
- de: '1,00 $'
- it: '1,00 USD'
- es: '1,00 US$'
- ru: '1,00 $'
*/
test.each`
    locales | expected
    ${"en"} | ${false}
    ${"ja"} | ${false}
    ${"zh"} | ${false}

    ${"fr"} | ${true}
    ${"de"} | ${true}
    ${"it"} | ${true}
    ${"es"} | ${true}
    ${"ru"} | ${true}
`('Intl.NumberFormat("$locales", ... ).format( ... ) includes LITERAL === $expected', ({ locales, expected }) => {
    const priceText = Intl.NumberFormat(locales, { style: "currency", currency: "USD" }).format(123456.78);
    // 数値と記号の間にスペースが入る場合、すべて同じリテラル文字列であることを確認している
    expect(priceText.includes(LITERAL)).toBe(expected);
});