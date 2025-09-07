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
}