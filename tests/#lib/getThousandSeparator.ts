/**
 * ロケールに応じた桁区切りの文字列を返します。
 * 
 * @param locales 
 * @returns 
 */
export const getThousandSeparator = (locales?: Intl.LocalesArgument): string => {
    const parts = Intl.NumberFormat(locales).formatToParts(100000); // 1,000で問題ないはずだが、念のため2桁多い100,000を指定

    const ret = parts.find(part => part.type === "group")?.value;
    if(ret === undefined) {
        console.error("[6052DECD] Thousand separator not found. parts: ", JSON.stringify(parts));
        // fail safe
        return ",";
    }
    
    return ret;
}
