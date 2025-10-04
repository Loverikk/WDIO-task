import { HomePage } from '../po/pages/homePage';
import { PowerToolsPage } from '../po/pages/powerToolsPage';
import { PAGE_PATHS, TITLES, SORTING_OPTIONS, TOOLS_CATEGORIES } from '../test-data/data';

describe('Testing homepage', () => {
  let homePage;
  let powerToolsPage;

  beforeEach(async () => {
    homePage = new HomePage(PAGE_PATHS.HOME);
    powerToolsPage = new PowerToolsPage(PAGE_PATHS.POWER_TOOLS);
    await homePage.open(PAGE_PATHS.HOME);
  });

  it('Should filter goods in ascending order', async () => {
    await homePage.clickDropdown();
    await homePage.chooseSortingOption(SORTING_OPTIONS.ASCENDING_ORDER);
    const selectedValue = await homePage.getSortDropdownValue();
    await homePage.waitForTheLastProductToRender();
    const isSorted = await homePage.filterPrice(homePage.productPriceArray);
    expect(selectedValue).to.equal(SORTING_OPTIONS.ASCENDING_ORDER);
    expect(isSorted).to.be.true;
  });

  it('Should display products under "Power tools" category', async () => {
    await homePage.navigation.clickCategories();
    await homePage.waitForElementsToAppear(homePage.navigation.categoriesDropdown);
    await homePage.navigation.chooseCategory(TOOLS_CATEGORIES.POWER_TOOLS);
    await powerToolsPage.waitForElementsToAppear(powerToolsPage.pageTitle);
    const pageTitle = await powerToolsPage.getPageTitleText();
    expect(pageTitle).to.equal(TITLES.POWER_TOOLS);
  });
});
