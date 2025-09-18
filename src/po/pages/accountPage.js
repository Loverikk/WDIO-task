import { BasePage } from "./basePage"

export class AccountPage extends BasePage {
    constructor(path) {
        super(path)
    }

    get pageTitle() { return $('h1[data-test="page-title"]') }
    get pageTitleText() { return this.pageTitle.getText() }
}