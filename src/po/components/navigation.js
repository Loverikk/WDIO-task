export class Navigation {
    get categories() { return $('a[data-test="nav-categories"]') }
    get categoriesDropdown() { return $('.dropdown-menu.show') }
    get handToolsCategory() { return $('[data-test="nav-hand-tools"]') }
    get powerToolsCategory() { return $('[data-test="nav-power-tools"]') }
    get otherCategory() { return $('[data-test="nav-other"]') }
    get specialToolsCategory() { return $('[data-test="nav-special-tools"]') }
    get rentalsCategory() { return $('[data-test="nav-rentals"]') }

    async clickCategories() {
        await this.categories.click()
    }

    async chooseCategory(option) {
        const categoriesList = {
            'Hand tools': this.handToolsCategory,
            'Power tools': this.powerToolsCategory,
            'Other': this.otherCategory,
            'Special tools': this.specialToolsCategory,
            'Rentals': this.rentalsCategory
        }

        for (const category in categoriesList) {
            if (option === category) { await categoriesList[category].click() }
        }
    }
}
