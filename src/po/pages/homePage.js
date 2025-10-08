import { BasePage } from './basePage';

export class HomePage extends BasePage {
  constructor(path) {
    super(path);
  }

  get sortDropdown() {
    return $('[data-test="sort"]');
  }
  get productPriceArray() {
    return $$('.col-md-9 a [data-test="product-price"]');
  }
  get sortedGoods() {
    return $('div[data-test="sorting_completed"]');
  }
  get productCards() {
    return $$('a.card');
  }

  async filterPrice(productsPriceArray) {
    let isSorted = true;

    for (let i = 0; i < productsPriceArray.length - 1; i++) {
      const firstValue = await productsPriceArray[i].getText();
      const secondValue = await productsPriceArray[i + 1].getText();

      const firstPrice = parseFloat(firstValue.slice(1));
      const secondPrice = parseFloat(secondValue.slice(1));

      if (firstPrice > secondPrice) {
        isSorted = false;
        break;
      }
    }

    return isSorted;
  }

  sortingOption(value) {
    return this.sortDropdown.$(`option[value="${value}"]`);
  }

  async clickDropdown() {
    await this.sortDropdown.click();
  }

  async chooseSortingOption(option) {
    await this.sortingOption(option).click();
  }

  async getSortDropdownValue() {
    return this.sortDropdown.getValue();
  }

  async getLastProductCard() {
    return this.productCards.then((cards) => cards[cards.length - 1]);
  }

  async waitForTheLastProductToRender() {
    const sortedGoodsElement = await this.sortedGoods;
    await sortedGoodsElement.waitForDisplayed({ timeout: 10000 });

    await browser.waitUntil(async () => {
      const cards = await this.productCards;
      const lastCard = cards[cards.length - 1];
      return lastCard && await lastCard.isDisplayed();
    }, {
      timeout: 10000,
      interval: 300,
      timeoutMsg: 'Last product card did not appear in time',
    });
  }
}
