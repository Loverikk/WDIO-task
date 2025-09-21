import { BasePage } from './basePage'

export class PowerToolsPage extends BasePage {
    constructor(path) {
        super(path)
    }

    get pageTitle() { return $('[data-test="page-title"]') }

    getPageTitleText() {
        return this.pageTitle.getText()
    }
}