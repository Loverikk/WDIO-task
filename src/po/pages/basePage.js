import { Navigation } from '../components/navigation'

export class BasePage {
    constructor(path) {
        this.path = path
        this.navigation = new Navigation()
    }
    async open() {
        await browser.url(this.path)
    }
}