import { HomePage } from "../po/pages/homePage"
import { PowerToolsPage } from "../po/pages/powerToolsPAge"
import { PAGE_PATHS, TITLES, SORTING_OPTIONS } from "../data"

describe('Tesing homepage', async () => {
    const homePage = new HomePage(PAGE_PATHS.HOME)
    const powerToolsPage = new PowerToolsPage(PAGE_PATHS.POWER_TOOLS)

    beforeEach(async () => {
        await browser.url('/')
    })

    it('Should filter goods in ascending order', async () => {
        await homePage.sortDropdown.click()
        await homePage.sortingOption(SORTING_OPTIONS.ASCENDING_ORDER).click()
        const selectedValue = await homePage.sortDropdownValue
        await homePage.waitForTheLastProductToRender()

        const productsPriceArray = await homePage.productPriceArray
        const isSorted = await homePage.filterPrice(productsPriceArray)
        await expect(selectedValue).toBe(SORTING_OPTIONS.ASCENDING_ORDER)
        await expect(isSorted).toBeTruthy()
    })

    it('Should display products under "Power tools" category', async () => {
        await homePage.navigation.categories.click()
        await homePage.navigation.categoriesDropdown.waitForDisplayed()
        await homePage.navigation.powerToolsCategory.click()
        await powerToolsPage.pageTitle.waitForDisplayed()
        const pageTitle = await powerToolsPage.pageTitleText
        await expect(pageTitle).toBe(TITLES.POWER_TOOLS)
    })
})