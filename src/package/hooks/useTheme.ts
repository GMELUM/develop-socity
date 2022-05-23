import spanNumber from "package/libs/clamp";

// const updateTheme = () => {
//     const root = document.body;
//     const defaultDark = [25, 25, 25];
//     const defaultLight = [255, 255, 255];

//     const updateTheme = (
//         theme: "light" | "dark",
//         tone: Array<number>,
//         accent: Array<number>
//     ) => Array.from(Array(20)).map((_, index) => {
//         const [r, g, b] = theme === "light" ? defaultLight : defaultDark;
//         const grade = index * 5;
//         const factorCount = index * 10;
//         const countR = r + factorCount;
//         const countG = g + factorCount;
//         const countB = b + factorCount;
//     });

//     const mixedColor = (
//         theme: Array<number>,
//         tone: Array<number>
//     ) => theme.map((themeColor, index) => {
//         const toneColor = tone.at(index);
//         const mixColor = themeColor + (toneColor || 0);
//         return spanNumber(mixColor, 0, 255).toString(16);
//     }).join('');

//     return {
//         updateTheme
//     }
// }

const root = document.body;
const defaultDark = [25, 25, 25];
const defaultLight = [255, 255, 255];

const updateTheme = (
    theme: "light" | "dark",
    tone: Array<number>,
    accent: Array<number>
) => Array.from(Array(20)).map((_, index) => {
    const [r, g, b] = theme === "light" ? defaultLight : defaultDark;
    const grade = index * 5;
    const factorCount = index * 10;
    const countR = r + factorCount;
    const countG = g + factorCount;
    const countB = b + factorCount;
});

export default updateTheme;