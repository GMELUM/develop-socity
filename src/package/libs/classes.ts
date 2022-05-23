const classes = (defaultClass: string, obj?: { [key: string]: boolean } | string) => {
    const initObj = typeof obj === "string" ? { [obj]: true } : obj;
    return Object.entries({ [defaultClass]: true, ...initObj })
        .filter(([_, check]) => check)
        .map(([name]) => name).join(' ').trim();
}
export default classes;