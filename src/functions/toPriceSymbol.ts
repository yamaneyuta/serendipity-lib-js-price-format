/**
 * 価格に変換したときの通貨記号を取得します。
 * 
 * @example
 *  - toPriceSymbol('USD') // => '$'
 *  - toPriceSymbol('JPY', 'ja-JP') // => '￥' (全角)
 *  - toPriceSymbol('JPY', 'en-US') // => '¥'  (半角)
 *  - toPriceSymbol('EUR') // => '€'
 *  - toPriceSymbol('ETH') // => 'ETH'
 *  - toPriceSymbol('USDC') // => 'USDC'
 * 
 * @param symbol 
 * @param locales 
 */
export const toPriceSymbol = (symbol: string, locales?: Intl.LocalesArgument): string => {
    try {
        const parts = Intl.NumberFormat(locales, {style: "currency", currency: symbol}).formatToParts(1);

        const ret = parts.find(part => part.type === "currency")?.value;
        if(ret === undefined) {
            console.error("[06BB0735] Currency symbol not found. parts: ", JSON.stringify(parts));
            // fail safe
            return symbol;
        }
        
        return ret;
    }
    catch(e: any) {
        if(typeof e.message === "string" && e.message.startsWith('Invalid currency code')) {
            return symbol;
        }
        throw e;
    }
}