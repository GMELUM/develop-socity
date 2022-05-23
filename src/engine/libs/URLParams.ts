class URLParams {
    params: { [key: string]: string | number } = {}
    private regular = /([\w-]+)=([^&]*)/g;
    constructor(value: string) {
        let match = null;
        while ((match = this.regular.exec(value)) !== null) {
            if (match[1].startsWith('vk_') && match[1] === "sign") {
                this.params[match[1]] = match[2]
            }
        }
    }
}

export default URLParams;