import { Navigation } from '../components/navigation'

export class BasePage {
    constructor(path) {
        this.path = path
        this.navigation = new Navigation()
    }
    async open() {
        await browser.url(this.path)
    }

    async getUrl() {
        return await browser.getUrl()
    }

    async waitForElementsToAppear(...elementsArray) {
        for (const element of elementsArray) {
            await element.waitForDisplayed()
        }
    }

    async getErrorText(element) {
        return await element.getText()
    }
}