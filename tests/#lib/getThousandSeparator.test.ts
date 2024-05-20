import { getThousandSeparator } from "./getThousandSeparator";

test.each`
    locales    | expected
    ${"en-GB"} | ${","}
    ${"en"}    | ${","}
    ${"en-US"} | ${","}
    ${"ja-JP"} | ${","}
    ${"ja"}    | ${","}
    ${"zh-CN"} | ${","}
    ${"zh"}    | ${","}

    ${"fr-FR"} | ${" "}
    ${"fr"}    | ${" "}
    ${"de-DE"} | ${"."}
    ${"de"}    | ${"."}
    ${"it-IT"} | ${"."}
    ${"it"}    | ${"."}
    ${"es-ES"} | ${"."}
    ${"es"}    | ${"."}
    ${"ru-RU"} | ${" "}
    ${"ru"}    | ${" "}

    ${undefined}| ${","}
`('getThousandSeparator($locales) === $expected', ({ locales, expected }) => {
    const actual = getThousandSeparator(locales);
    if(expected === " ") {
        // \u00a0 is non-breaking space(&nbsp;)
        expect(actual).toMatch(/[\s\u00a0]/);
        expect(actual.trim()).toBe("");
        expect(actual.replace(/\s/g, "")).toBe("");
    }
    else {
        expect(actual).toBe(expected);
    }
});