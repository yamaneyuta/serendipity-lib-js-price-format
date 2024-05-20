/**
 * 価格と通貨記号の間に入れるスペースの文字を返します。
 * ※ 通常の半角スペースではないことに注意。
 */
export const getLiteral = () => {
    // `locales`が`fr`で1ドルを表した場合、`1,00 $US`となるが、
    // この`1.00`と`$US`の間のスペースを取得して返す。
    return Intl.NumberFormat("fr", {style: "currency", currency: "USD"}).formatToParts(1)
        .find(part=>part.type === "literal")!.value;
};
