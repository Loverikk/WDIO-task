import { HomePage } from "../pages/homePage"

describe('Tesing homepage', async () => {
    const homePage = new HomePage('/')

    beforeEach(async () => {
        await browser.url('/')
    })

    it('Should filter goods in ascending order', async () => {
        const sortDropdown = await $('[data-test="sort"]')
        await sortDropdown.click()
        await sortDropdown.selectByAttribute('value', 'price,asc')

        // Replace somehow
        await browser.pause(500)

        const productsPriceArray = await $$('.col-md-9 a [data-test="product-price"]')

        const isSorted = await homePage.filterPrice(productsPriceArray)
        await expect(isSorted).toBeTruthy()
    })

    it('Should display products under "Power tools" category', async () => {
        const categoriesLink = await $('a[data-test="nav-categories"]')
        await categoriesLink.click()

        const categoriesList = await $('.dropdown-menu.show')
        await categoriesList.waitForDisplayed()

        await categoriesList.$('[data-test="nav-power-tools"]').click()

        // Create a products page
        await $('[data-test="page-title"]').waitForDisplayed()
        const pageTitle = await $('[data-test="page-title"]').getText()
        await expect(pageTitle).toBe('Category: Power Tools')
    })
})