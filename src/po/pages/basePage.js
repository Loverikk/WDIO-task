export class BasePage {
    constructor(path) {
        this.path = path
    }
    async open() {
        await browser.url(this.path)
    }
}