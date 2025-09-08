import { BasePage } from './basePage'

export class HomePage extends BasePage {
    constructor(path) {
        super(path)
    }

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

    get sortDropdown() {
        return $('[data-test="sort"]')
    }

    get productPriceArray() {
        return $$('.col-md-9 a [data-test="product-price"]')
    }

    get lastProductCard() {
        return $('[data-test="product-01K4N4ANR2YFTT5X1KCAM46WJ4"]')
    }

    get lastProductName() {
        return this.lastProductCard.$('h5[data-test="product-name"]')
    }

    get lastProductPrice() {
        return this.lastProductCard.$('span[data-test="product-price"]')
    }

    async waitForTheLastProductToRender() {
        await this.lastProductCard.waitForDisplayed()
        await this.lastProductName.waitForDisplayed()
        await this.lastProductPrice.waitForDisplayed()
    }
}