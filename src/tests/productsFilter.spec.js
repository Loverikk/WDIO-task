import { HomePage } from "../po/pages/homePage"
import { PowerToolsPage } from "../po/pages/powerToolsPAge"
import { PAGE_PATHS, TITLES, SORTING_OPTIONS } from "../data"

describe('Tesing homepage', async () => {
    let homePage
    let powerToolsPage

    beforeEach(async () => {
        await browser.url('/')
        homePage = new HomePage(PAGE_PATHS.HOME)
        powerToolsPage = new PowerToolsPage(PAGE_PATHS.POWER_TOOLS)
    })

    it('Should filter goods in ascending order', async () => {
        await homePage.sortDropdown.click()
        await homePage.sortingOption(SORTING_OPTIONS.ASCENDING_ORDER).click()
        const selectedValue = await homePage.sortDropdownValue
        await homePage.waitForTheLastProductToRender()

        const productsPriceArray = await homePage.productPriceArray
        const isSorted = await homePage.filterPrice(productsPriceArray)
        expect(selectedValue).to.equal(SORTING_OPTIONS.ASCENDING_ORDER)
        expect(isSorted).to.be.true
    })

    it('Should display products under "Power tools" category', async () => {
        await homePage.navigation.categories.click()
        await homePage.navigation.categoriesDropdown.waitForDisplayed()
        await homePage.navigation.powerToolsCategory.click()
        await powerToolsPage.pageTitle.waitForDisplayed()
        const pageTitle = await powerToolsPage.pageTitleText
        expect(pageTitle).to.equal(TITLES.POWER_TOOLS)
    })
})