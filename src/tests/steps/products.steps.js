import { Given, When, Then, Before, After } from '@wdio/cucumber-framework';

import { HomePage } from '../../po/pages/homePage';
import { PowerToolsPage } from '../../po/pages/powerToolsPage';
import { PAGE_PATHS, TITLES, SORTING_OPTIONS, TOOLS_CATEGORIES } from '../../test-data/data';

let homePage;
let powerToolsPage;

Before({ tags: '@products' }, async () => {
    homePage = new HomePage(PAGE_PATHS.HOME);
    powerToolsPage = new PowerToolsPage(PAGE_PATHS.POWER_TOOLS);
    await homePage.open();
})

After({ tags: '@products' }, () => {
    homePage = null;
    powerToolsPage = null;
})

Given('Given I am on the product page', async () => {
    const currentUrl = await homePage.getUrl();
    expect(currentUrl).to.equal(PAGE_PATHS.PRODUCT_PAGE_FULL);
})

When('I click "Categories" dropdown', async () => {
    await homePage.navigation.clickCategories();
})

When('I select "Power tools" from the list', async () => {
    await homePage.waitForElementsToAppear(homePage.navigation.categoriesDropdown);
    await homePage.navigation.chooseCategory(TOOLS_CATEGORIES.POWER_TOOLS);
})

Then('I should see a list of power tools displayed', async () => {
    await powerToolsPage.waitForElementsToAppear(powerToolsPage.pageTitle);
})

Then('the header should be "Category: Power Tools"', async () => {
    const pageTitle = await powerToolsPage.getPageTitleText();
    expect(pageTitle).to.equal(TITLES.POWER_TOOLS);
})

When('I click "Sort by" dropdown', async () => {
    await homePage.sortDropdown.waitForDisplayed();
    await homePage.clickDropdown();
})

When('I select the category', async () => {
    await homePage.chooseSortingOption(SORTING_OPTIONS.ASCENDING_ORDER);
})

Then('I should see the product list', async () => {
    await homePage.waitForTheLastProductToRender();
    const isSorted = await homePage.filterPrice(homePage.productPriceArray);
    expect(isSorted).to.be.true;
})

Then('I should see the category displayed in the field', async () => {
    const selectedValue = await homePage.getSortDropdownValue();
    expect(selectedValue).to.equal(SORTING_OPTIONS.ASCENDING_ORDER);
})