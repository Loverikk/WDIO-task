import { BasePage } from './basePage'

export class PowerToolsPage extends BasePage {
    constructor(path) {
        super(path)
    }

    get pageTitle() { return $('[data-test="page-title"]') }
    async getPageTitleText() { return await this.pageTitle.getText() }
}