import { BasePage } from './basePage'

export class HomePage extends BasePage {
    constructor(path) {
        super(path)
    }

    get sortDropdown() { return $('[data-test="sort"]') }
    get productPriceArray() { return $$('.col-md-9 a [data-test="product-price"]') }
    get sortedGoods() { return $('div[data-test="sorting_completed"]') }
    get productCards() { return $$('a.card') }

    async filterPrice(productsPriceArray) {
        let isSorted = true

        for (let i = 0; i < productsPriceArray.length - 1; i++) {
            const firstValue = await productsPriceArray[i].getText()
            const secondValue = await productsPriceArray[i + 1].getText()

            const firstPrice = parseFloat(firstValue.slice(1))
            const secondPrice = parseFloat(secondValue.slice(1))

            if (firstPrice > secondPrice) {
                isSorted = false
                break
            }
        }

        return isSorted
    }

    sortingOption(value) {
        return this.sortDropdown.$(`option[value="${value}"]`)
    }

    async clickDropdown() {
        await this.sortDropdown.click()
    }

    async chooseSortingOption(option) {
        await this.sortingOption(option).click()
    }

    getSortDropdownValue() {
        return this.sortDropdown.getValue()
    }

    getLastProductCard() {
        return this.productCards.then(cards => cards[cards.length - 1])
    }

    async waitForTheLastProductToRender() {
        const cards = await this.productCards;
        this.waitForElementsToAppear([this.sortedGoods, cards[cards.length - 1]])
    }
}